# How to convert privatekey into singleline

Sometimes you need to convert a file with newlines into a singleline,
essentially turning newline characters into newline "\n", but that can be pretty
difficult as most programs turns that into a actual newline, which is difficult
to copy.

But using `awk` we can turn a file into a single line of text, perfect for a
environment variable. However, remember that privatekeys shouldn't be stored in
the environment for security reasons, it should live as a file.

```
$ awk -v ORS='\\n' '1' karnov-review.2019-01-21.private-key.pem | pbcopy
```

So this command uses awk, which is a really powerful tool to search files and
execute commands on those.

The `-v` defines that you want to configure a value, `ORS` is stands for "output
record separator", and that is because `awk` works on a per line, and we now
tell it to join with a string.

And the last part `'1'` is to awk, because it needs a equation to run on each
line, and 1 is always true.

Last we give it a filename to load and we finally pipe it into `pbcopy` that is
a nice tool to put it into the clipboard.

https://www.gnu.org/software/gawk/manual/html_node/Options.html#Options

https://www.gnu.org/software/gawk/manual/html_node/Output-Separators.html
