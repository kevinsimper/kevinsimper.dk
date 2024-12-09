# How to manage multiple ssh keys with Github

If you have to have multiple GitHub accounts, you end up with the problem of you having multiple SSH keys.

The problem when arises that you can't have multiple keys tried when doing `git clone`, so that command will fail.

If you google on the internet you will find solutions like changing your git config file ~/.ssh/config
But that is not a great solution, because they suggest changing the hostname, so now you can not do a git clone without remembering the fake domain you said in your git config.

## Specify which key to use per repository

Better solution is simply specify which key to use per repository.

```bash
git config core.sshCommand 'ssh -i ~/.ssh/id_rsa_corp'
```

That however requires you to be able to clone the repository first, but that you can do with

```bash
GIT_SSH_COMMAND="ssh -i /path/to/your/private/key -o IdentitiesOnly=yes" git clone git@github.com:user/repository.git
```

So this way you can easily control which key get used for which repository.