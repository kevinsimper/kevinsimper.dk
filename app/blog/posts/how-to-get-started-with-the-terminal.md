# How to get started with the terminal

When I started out programming I first had no idea what a terminal was, and when I figure out what it was it seemed like magic to me! "A place where you write in text where there is no buttons? No way!", but after long time I began to see benefit of using a terminal. The main benefit is that everything has a predictable interface, text going in and text going out, you don't have to learn another GUI for your most used commands.

So here is my tips on how to get started getting familiar with the terminal:

## Using it navigate folders

This seems weird at first as this is super easy on all platforms, Mac and Windows alike, but "jumping" around folders is the best way to practicing using the terminal. You need to know three commands to get started in Bash, it is `ls` (list), `cd` (change directory) and `pwd` (current folder).

This will get you started and you should use that for some days to get confortable.

`ls` will give you a list of all files and folders.

`cd` will change the current directory to what command you give it.

`pwd` will write out what your current directory is.

It is easy to change directories down, and if you want to move up a folder to the parent, you `cd` to two dots like this `cd ..` and you move up to the parent folder.

## Opening files and folders

When you know how to navigate folders, the natural next step is that you want to open files and folders from the terminal when you know how to navigate them.

You do that by writing `open` and then the file that you want to open.

You can also open up a folder and it will show you the directory in the normal UI way that you know.

You can open all kinds of files and the program that will open the file is determined by the OS default file handler. That means if you installed a program that has installed a handler for `.docx` then that program will open, otherwise your OS will ask you.

If you try to open a `.html` your browser will show the file.

You can also override that behaviour on Mac by providing the name of the app you want to use like this, eg. `open -a "Google Chrome" index.html`

## Know how to lookup help

A typical commandline tool like `ls` can often take different options as argument like `ls -l` which will show it as a list instead of showing files and folders as a column. But how would you know this? You can find this information two ways, either by doing a generic `—help` or `-h` to the program like `ls -h` to ask the program for the help menu.

Or you can ask for the manual by using the program `man` which is a tool to load stored manuals on your computer about essentials on your computer, try it like `man ls`

## Stay curios

You know the essentials and enough to become dangerous with the command line, the key is to keep pracicing and becoming more and more familiar with the terminal. Try to think when you do something that you do often if you can replace that action with a command in the terminal and often that is the case, you will save time and mouse clicks which in the end will make you more productive, but at the start it feels like a very steep learning curve!

If you combine this with git, you should read my next blogpost about effective git workflow! https://www.kevinsimper.dk/posts/effective-git-workflow-how-i-use-git
