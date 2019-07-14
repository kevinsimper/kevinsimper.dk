# How to disconnect from a SMB network drive on Windows

I had used Apple's File Sharing where you can expose a folder on your Mac and then on your Windows computer see those files. That can be really easy, the issue is a bit about security, because you have to put in your user password to access that share on the other computer and if that user is a administrator, the whole computer is exposed as a network share! Not so good!

If you pressed "Remember my credentials" on Windows, you have to go into "Control Panel", then "Credential Manager" and then "Windows Credentials". There you can find it at the top as it is recently used. Delete it here.

If you didn't say remember, then it will only last as long as the current Windows user is logged in. If you want to force the credentials to be forgotten, then search "cmd", open that program and run "net use". This will show all current active remote connections. Then you can do "net use * /DELETE" which will ask you to confirm to close all remote connections. Last step, credentials are still cached on the machine, so you will be able to open up the network share still! To delete any temporary cache, in "cmd.exe" run "klist purge".

So note: do enable Mac File Sharing for any administrators! Create a new user with a new password and share a specific folder, anything else is crazy! Don't type your computer password anywhere else than your computer!