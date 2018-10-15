# Avermedia LGP 2 Plus - How to setup Mac and my experience

I brought the Avermedia LGP 2 Plus recently from Amazon because from what I read
it was the easiest way to record the screen and that it supported 4k passthrough
sounded like a great way to have something a bit futureproof, 4k screens and
projectors are beginning to be more common and the idea device would not change
anything.

I opened it up and connected it to power and connected the HDMI cable to the
computer and tried to press the record button. You couldn't or nothing happened
because it was just showing red.

### Tried updating

I tried to update the firmware to see it that would work, but that did not and
it didn't work like the website said.

All the software was basicly for Windows and I only have a Mac, so couldn't use
any of the configuration software. The updater for Mac basically told that I had
to plug in the device. Major disappointment and of course not manual and no way
to know what the blinking LED on the device meant.

### Discovery

I bought the Avermedia LGP 2 Plus primary for the PC-FREE mode, but I wanted to
see if the device was broken or was working, just not the pc-free mode.

I had OBS installed, which is a streaming software, and that has built in
functionality to get a output from a capture device and the device showed up
there! So far so good! Now I saw the problem, it said "Copyright protected". It
wouldn't let me record because the Mac is outputting a signal that is HDCP
encrypted, that is to not allow you to record Netflix videos and like that on
unauthorized hardware.

### Disable HDCP on Mac

It is not possible to disable HDCP on Mac, I had the thought, but I was in doubt
because a lot of tutorials minded for games talks about how to disable it on PS4
and XBOX. So that was not the solution.

## Solution

The solution was that even pc-free mode requires a pc, not a mac or anything
else, you can't get started without a PC! That is maybe the most frustating
device with a pc-free mode you can make, and not a single FAQ or manual says a
thing about this.

If you have a PC around, simply boot it up and install the RECentral software,
go to settings on your device and disable HDCP Proctection.

If you don't have a PC that is still a solution. You can use a virtualized
desktop to solve the same problem. Go to https://modern.ie and download a
VirtualBox Windows 10 Machine. Activate the USB connections in VirtualBox
settings, install the VirtualBox USB Extension, start the Windows Machine,
reboot if error, plug the USB into your Mac, click on the USB icon on the bottom
corner on the outer frame of the Windows machine, and now do the same
instruction as above if you had a Windows machine.
