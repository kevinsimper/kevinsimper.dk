# The best tool for slow and unreliable internet

It can be the most frustrating thing when the internet is unreliable and slow.
You think you are online but in reality, you aren't. If you are a developer then
there are a few tools that can help with the pain.

## MOSH for SSH

If you are using SSH on slow internet it is a terrible experience because
SSH wants to confirm every keypress with the server first before you are allowed
to type the next character.
The tool MOSH helps with that, it allows you to type ahead and will underline
the words that have yet not been confirmed so you will know.
The way it works is that it sets up MOSH server at the remote and then simulates
the SSH connection. It also allows connections to be broken which is not allowed
with SSH!

https://mosh.org/

## Elinks

Websites have gotten increasingly larger even though some places internet has not
gotten faster, solutions like the AMP Project (https://ampproject.org/) has
helped on the problem, but it is still not uncommon to download 1 MB for a
single page. That can take forever on a 3G connection!

The solution is a CLI browser called Elinks, it is a text browser that you can
run on a remote server and then use MOSH to ssh into, it will transfer the
minimal information for you to browse a page and it is fantastic!

http://elinks.or.cz/

## Bitbar with Ping plugin

Bitbar is a Mac menu tool that allows you to run and show the output of bash
programs. This is useful because even if you are connected to WIFI it does not
mean that you have a reliable connection and there is no way to detect
connection loss. Bitbar is fantastic because if you notice your connection is
slow you can look at the menu bar to see whether you lost connection or the
connection is just slow big difference!

https://getbitbar.com/

https://getbitbar.com/plugins/Network/ping.10s.sh

## Brow.sh and html.brow.sh

If elinks gives you problems or you want a little more familiar browser
experience then brow.sh is a really awesome solution, it basicly renders
a webpage and sends you a screenshot based on text characters.

https://brow.sh/

https://html.brow.sh/

## Transfering files - IPFS or Webtorrent or RSYNC

It can be super annoying download and uploading files on unreliable internet
because the connection is dropped and you have to start over up/downloading the
same data again.

You can use tools like IPFS that are built to retry and break large files into
small pieces that can easily be transfered.

IPFS is better than webtorrent because it is able to share pieces across files
where torrent will always encode a file again and share it even if it is the
same in another torrent.

RSYNC is good but is a active program that runs in the foreground, where IPFS
and Webtorrent is made to work in daemon mode which means in run in the
background.

https://ipfs.io/

https://webtorrent.io/

https://en.wikipedia.org/wiki/Rsync
