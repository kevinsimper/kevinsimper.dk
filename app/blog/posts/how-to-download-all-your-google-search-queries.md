# How to download all your Google Search queries and analyze them

So I wanted to try to see what Google knew about me because of all the talks about moving away from Google and keeping privacy. So Google has this page MyActivity where you easily can see your latest activities, but it is nearly useless in going back in history for many years. After googling how to export my google history I found you have to click the three dots in the corner and click "Other activities" and then find the paragraph about "Download your data .." and then finally you get to an app called "TakeOut". You can also go directly to the service if you know about, which apparently not even Google search know about.

- https://myactivity.google.com/myactivity
- https://takeout.google.com/settings/takeout

On the Takeout page, you can select all the products you want to export the data from, Google has a lot of products, the one that contains your search queries is "My Activity". Press "Select None" and then select only "My Activities".

Click on that and click the "Select specific activity data", click "Toggle all" to deselect all and then select only "Search".

Now you can choose how you want to format you want the data, choose "JSON" to easier work with it.

Now you can choose either zip or tgz, choose tgz as it is better for size and pretty easy to work with from the command line.

Select where you want to download it, either link or Google Drive. Exporting is normally pretty quick as search query data is pretty small compared to pictures.

### Got the data

Now you can unpack the .tgz by either double-clicking on it or using "tar -xfz FILE".

Inside the Takeout folder, you can find the JSON here: `Takeout/My Activity/SearchMy/Activity.json` Now there is a file that contains all your search queries and also what links you clicked on. The format is terrible as your search query is not a single string but combined with: "Searched for" + the actual search query.

Let us list all the search queries, first, we need this command line tool called jq for manipulating JSON documents.

You can install that from brew by doing, `brew install jq`.

So to read the activity file you do first `cat` to read the file into the terminal, and then `jq` reads from the other command and executes a small program define afters. This programs just spew out all the individual objects in the array, so combine it with `less` to control the output in your terminal.

```
cat MyActivity.json | jq '.[]' | less
```

To navigate `less` use the space bar to jump pages or use the arrow keys, and press `q` or `ctrl+c` to exit.

That works great but we want only the search query we had, not JSON objects. We can change the input to `jq` to only output the `.title` which contains our query.

```
cat MyActivity.json | jq '.[].title' | less
```

You can see in the output we have some of the results start with "Visited", which is apparently sometimes that Google tracks that you clicked on a link, I have them much more seldom than actual results I clicked on, tell me if you know why!

So we only want the ones that starts with "Searched for", we can use `grep` to only filter those out.

```
cat MyActivity.json | jq '.[].title' | grep "Searched for" | less
```

Okay, let us remove the "Searched for", but let us first remove the quotes. We can either add the arguments to `jq` to give `--raw` but we can also just for the practice remove them with `sed` which is a streaming editor, that means it can manipulate data coming in and output it again on the fly.

```
cat MyActivity.json | jq '.[].title' | grep "Searched for" |  sed 's/"//g' | less
```

Now the quotes are removed, now you can probably guess how we can easily remove the "Searched for" string.

```
cat MyActivity.json | jq '.[].title' | grep "Searched for" |  sed 's/"//g' | sed 's/Searched for//g' | less
```

Now you can easily look for interesting queries you have searched for, try to search for maybe "javascript" and search which queries you have made, but be careful, you can easily be brought down memory lane. I found a lot of searches for jQuery and javascript queries related to Internet Explorer ;)

```
cat MyActivity.json | jq '.[].title' | grep "Searched for" |  sed 's/"//g' | sed 's/Searched for//g' | grep javascript | less
```

Let us try to count our search queries to see what is our most popular query. The first thing we need to is to sort it, that is pretty typical when you want to count something, much easier when it has been sorted. Luckily for us, there is a command called `sort`.

```
cat MyActivity.json | jq '.[].title' | grep "Searched for" |  sed 's/"//g' | sed 's/Searched for//g' | sort | less
```

Now we want to count all occurrences, there is another bash program called `uniq` that combined with `-c` will count all the occurrences if they appear grouped, therefore it is important they were sorted first, otherwise, it would count individual words as 1.

```
cat MyActivity.json | jq '.[].title' | grep "Searched for" |  sed 's/"//g' | sed 's/Searched for//g' | sort | uniq -c | less
```

And finally we can sort the words again with `sort` but this time combine it with `-n` so that it sort by number instead of by string, normally would 9 be bigger than 11 for example. The search results would output the highest number last so we should show the result in reverse, we can do that by `-r` to sort

```
cat MyActivity.json | jq '.[].title' | grep "Searched for" |  sed 's/"//g' | sed 's/Searched for//g' | sort | uniq -c | sort -n -r | less
```

Now we have our google search queries ranked by the most popular and you will probably find them very generic, mine is often something I didn't even bother typing the full url even though I know it.

We can also count how many queries we have with a tool called `wc`, and no it just stands for "word count". It has a couple of arguments you can give it, it can count lines by giving it `-l`.

```
cat MyActivity.json | jq '.[].title' | grep "Searched for" |  wc -l
```

### Summary

I hope you learned a little bit on how to do data manipulating on the command line and that it is easy to get started with and you can do one step of the time. The Unix philosophy is having small tools that do one thing well and that you can combine in the way we just did! Were there some queries you very surprised by? I was surprised that there weren't more search queries and I actually think that Google has left out or "forgotten" some of them, there must be more so much that I google stuff!
