# How to give Gemini AI API multiple files

## The Problem

I am working with Google Gemini AI API on [Herkules.dk](https://herkules.dk/) and when you upload multiple files to Google's Gemini API using the Files API, there's no built-in way to reference which file is which in your conversation. The API doesn't preserve the original filename in a way that's accessible to the model, it only gets the file URI and MIME type. I think that is a bit weird.

Here's what happens when you upload files:

```typescript
const file = new File([buffer], "report-2025.pdf", { type: "application/pdf" });
const response = await ai.files.upload({ file });

// response.name is something like "files/abc123xyz"
// The original filename "report-2025.pdf" is lost
```

When you fetch the file metadata, you'll see there's no `displayName` or original filename:

```json
{
  "name": "files/n9qrdcqnktso",
  "mimeType": "text/plain",
  "sizeBytes": "12",
  "createTime": "2025-09-19T12:38:18.837261Z",
  "expirationTime": "2025-09-21T12:38:18.162999413Z",
  "uri": "https://generativelanguage.googleapis.com/v1beta/files/n9qrdcqnktso",
  "state": "ACTIVE"
}
```

## Setting Up Gemini with TypeScript

First, install the Google Generative AI SDK:

```bash
npm install @google/genai
```

Basic setup:

```typescript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
```

## Uploading a Single File

Here's how to upload and use a single file:

```typescript
import { GoogleGenAI, createPartFromUri, createUserContent } from "@google/genai";

async function uploadSingleFile() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  // Create and upload file
  const content = "Q4 Revenue: $1.2M, up 45% from Q3";
  const file = new File([Buffer.from(content)], "sales.txt", { type: "text/plain" });
  const uploadResponse = await ai.files.upload({ file });

  // Wait for processing
  let fileInfo = await ai.files.get({ name: uploadResponse.name });
  while (fileInfo.state === "PROCESSING") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    fileInfo = await ai.files.get({ name: uploadResponse.name });
  }

  // Use the file
  const contents = createUserContent([
    createPartFromUri(fileInfo.uri, fileInfo.mimeType),
    "What's the revenue growth percentage?",
  ]);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
  });

  console.log(response.text); // "The revenue growth percentage is 45%"
}
```

## The Problem with Multiple Files

When you upload multiple files without labels, Gemini can't distinguish between them:

```typescript
async function uploadMultipleFilesWrong() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const files = [
    { name: "sales.txt", content: "Q4 sales: $1.2M, up 45%" },
    { name: "tasks.txt", content: "1) Review budget 2) Update docs" },
  ];

  // Upload both files
  const uploaded = await Promise.all(
    files.map(async (f) => {
      const file = new File([Buffer.from(f.content)], f.name, { type: "text/plain" });
      const resp = await ai.files.upload({ file });

      let info = await ai.files.get({ name: resp.name });
      while (info.state === "PROCESSING") {
        await new Promise((r) => setTimeout(r, 1000));
        info = await ai.files.get({ name: resp.name });
      }

      return { uri: info.uri, mimeType: info.mimeType };
    }),
  );

  // WITHOUT LABELS - Gemini doesn't know which file is which
  const contents = createUserContent([
    createPartFromUri(uploaded[0].uri, uploaded[0].mimeType),
    createPartFromUri(uploaded[1].uri, uploaded[1].mimeType),
    "What's in the sales file? What's in the tasks file?",
  ]);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
  });

  // Gemini can't tell which file is "sales" or "tasks"
  // It only sees the content, not the original filenames
}
```

## The Solution: Label Your Files

The solution is to add text labels between file parts:

```typescript
async function uploadMultipleFilesCorrect() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const files = [
    { name: "sales.txt", content: "Q4 sales: $1.2M, up 45%" },
    { name: "tasks.txt", content: "1) Review budget 2) Update docs" },
  ];

  // Upload and process files
  const uploaded = await Promise.all(
    files.map(async (f) => {
      const file = new File([Buffer.from(f.content)], f.name, { type: "text/plain" });
      const resp = await ai.files.upload({ file });

      let info = await ai.files.get({ name: resp.name });
      while (info.state === "PROCESSING") {
        await new Promise((r) => setTimeout(r, 1000));
        info = await ai.files.get({ name: resp.name });
      }

      return {
        name: f.name,
        uri: info.uri,
        mimeType: info.mimeType,
        uploadId: resp.name,
      };
    }),
  );

  // Gemini knows which file is which
  const contents = createUserContent([
    "File 1 - sales.txt:",
    createPartFromUri(uploaded[0].uri, uploaded[0].mimeType),
    "File 2 - tasks.txt:",
    createPartFromUri(uploaded[1].uri, uploaded[1].mimeType),
    "What's the revenue in the sales file? How many tasks are in the tasks file?",
  ]);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
  });

  console.log(response.text);
  // "The revenue in the sales file is $1.2M. There are 2 tasks in the tasks file."

  // Cleanup
  await Promise.all(uploaded.map((f) => ai.files.delete({ name: f.uploadId })));
}
```

## Multiple Conversation Turns

You can also structure it as multiple conversation turns:

```typescript
const contents = [
  createUserContent([
    createPartFromUri(uploaded[0].uri, uploaded[0].mimeType),
    "This is the sales report",
  ]),
  createUserContent([
    createPartFromUri(uploaded[1].uri, uploaded[1].mimeType),
    "This is the task list",
  ]),
  createUserContent(["Compare the sales growth with the number of tasks"]),
];
```

This creates three separate user messages, which can be useful for longer conversations.

## Key Findings

1. **The Files API doesn't preserve filenames**: When you upload a file, the original filename is lost. The API returns an ID like `files/abc123xyz`.

2. **Gemini only sees URI and MIME type**: The model receives `fileData` with just `fileUri` and `mimeType` - no filename.

3. **You must add labels manually**: Add descriptive text before each file part to identify them.

4. **The pattern is simple**: Alternate between text descriptions and file parts in your content array.