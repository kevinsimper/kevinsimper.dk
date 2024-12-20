# Learning async in Python

Coming from Node.js async code is the norm, and when async/await was introduced a big shift happened since it was competing with the callback approach where you could archive the same.

In Python it is not the same, Python is by default sync and webservers relies on WSGI (Web Server Gateway Interface) like [gunicorn](https://docs.gunicorn.org/en/stable/) to handle multiple connections on a server.

So python tutorials does not normally talk or show async code examples, so learning it in python is defenitely harder.

## The asyncio package

This package includes a lot of the functionality on how to control flow in your now async code. This blog shows really well the different methods like `async.create_task`, ` asyncio.wait`, `asyncio.gather` and how to use them.

[https://jacobpadilla.com/articles/handling-asyncio-tasks](https://jacobpadilla.com/articles/handling-asyncio-tasks)

## Different froms of concurrency

With Python being sync by default you also have to consider which kind of concurrency you need. Node.js concurrency is not the solution to all your problems either, since it still will run on a single core.

This blogpost really explains it well, but the conclusion sums up pretty well
[http://masnun.rocks/2016/10/06/async-python-the-different-forms-of-concurrency/](http://masnun.rocks/2016/10/06/async-python-the-different-forms-of-concurrency/)

```python
if io_bound:
    if io_very_slow:
        print("Use Asyncio")
    else:
       print("Use Threads")
else:
    print("Multi Processing")
```

