# Spoof you mac address and get wifi

You want to spoof you mac address if you want to make your computer look like
a new computer to the wifi access point. It could be because the wifi gives out
free data, but limits it to a certain amount.

## Generate a new mac address

Run this command and generate a new valid mac address.

```
$ openssl rand -hex 6 | sed 's/\(..\)/\1:/g; s/.$//'
26:27:ad:8c:d0:9e
```

## Update your mac address

Pass your new mac address to ifconfig and run it with root.

```
$ sudo ifconfig en0 ether 26:27:ad:8c:d0:9e
```

## Test that it worked

```
$ ifconfig en0 |grep ether
	ether 26:27:ad:8c:d0:9e
```
