# Switch to your AirPods from the command line

Wouldn't it be cool if you could just write a command in your terminal and switch to your AirPods instead of having to use the Menubar Bluetooth menu or the Sound Icon.

We can install a cli that can control Bluetooth with brew.sh

```
$ brew install bluetoothconnector
```

Then we can connect to your Airpods by using:

```
$ BluetoothConnector -c MAC-ADDRESS --notify
```

We can find our airpods mac address by running:

```
$ system_profiler SPBluetoothDataType
```

Look for your AirPods name and copy the address:

Mine is as example: `8C-04-D0-96-55-CC`

Then now we can do

```
$ BluetoothConnector -c 8C-04-D0-96-55-CC --notify
```

And you should see your Airpods connected, and if you run it again it will say `Already connected`.

### Quick bash function

The mac address will never change, so we can make a small bash function and place it inside our bash config:

Here when the function is static we can use a alias

```bash
alias airpods="BluetoothConnector -c 7C-04-D0-96-55-BB --notify"
```

or if function look like this

```bash
airpods() {
  BluetoothConnector -c 7C-04-D0-96-55-BB --notify
}	
```

and then you can simply reload your bash terminal and run

```
$ airpods
```

Success! No more fiddling with any gui!