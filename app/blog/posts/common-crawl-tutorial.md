# How to use Common Crawl to find your website

Common Crawl archives billions of web pages and makes them freely available. Here's how to check if your site is indexed and extract the content.

## Check if your site is indexed

```bash
curl -s "http://index.commoncrawl.org/CC-MAIN-2024-42-index?url=kevinsimper.dk&output=json" | head -1
```

This returns JSON with your page details. Count how many pages are indexed:

```bash
curl -s "http://index.commoncrawl.org/CC-MAIN-2024-42-index?url=kevinsimper.dk/*&output=json" | wc -l
# 82 pages from my site
```

## Two ways to get content

### Method 1: WARC files (precise access)

WARC files contain full HTML. The index tells you exactly where your content is:

```bash
# Get location info
curl -s "http://index.commoncrawl.org/CC-MAIN-2024-42-index?url=kevinsimper.dk&output=json" | \
  jq -r 'select(.status=="200") | "offset: \(.offset), length: \(.length), file: \(.filename)"'
# offset: 287741401, length: 16652, file: crawl-data/.../warc/CC-MAIN-...warc.gz

# Fetch exact bytes
curl -H "Range: bytes=287741401-287758052" \
  "https://data.commoncrawl.org/crawl-data/CC-MAIN-2024-42/segments/1727944253525.17/warc/CC-MAIN-20241008044807-20241008074807-00461.warc.gz" | \
  gunzip
```

### Method 2: WET files (text only, but no index)

WET files contain plain text from ALL websites in that segment. There's no index for WET files, so you download the entire 82MB file:

```bash
# Convert WARC path to WET path (warc→wet, .warc.gz→.warc.wet.gz)
WET_FILE="crawl-data/CC-MAIN-2024-42/segments/1727944253525.17/wet/CC-MAIN-20241008044807-20241008074807-00461.warc.wet.gz"

# Download entire file and search
curl -s "https://data.commoncrawl.org/$WET_FILE" | \
  gunzip | grep -A50 "WARC-Target-URI: https://kevinsimper.dk"
```

## The key difference

- **WARC**: Has an index with byte offsets → download only what you need (17KB)
- **WET**: No index → download entire segment file containing 27,000+ sites (82MB)

Use WARC when you need specific pages. Use WET when you're analyzing many sites at once.

## Finding the latest crawl

New crawls monthly at https://data.commoncrawl.org/
- CC-MAIN-2025-38 (September 2025)
- CC-MAIN-2025-33 (August 2025)

My site had 82 pages in the October crawl. Pretty good coverage!