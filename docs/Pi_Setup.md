# Step 1. Set up your raspberry pi as a Wireless Access Point (maybe should be last step)

These options are offered in case your particular setup requires something particular, but we strongly recommend using _Option 1_.

## Option 1 (highly recommended):

If you want to choose with a flag if you connnect the Pi to the Wlan, or if the Pi works as a Wireless Access Point.
[Follow these instructions](https://github.com/Autodrop3d/raspiApWlanScripts)

These would allow you to connnect to the raspberry Pi directly via wifi with a preset IP and also to download

## Option 2:

If you want to set your connection to connect to the raspberry Pi as Wireless Access Point only when there is no Wifi connection available. [Follow these instructions](https://www.raspberryconnect.com/projects/65-raspberrypi-hotspot-accesspoints/157-raspberry-pi-auto-wifi-hotspot-switch-internet)

## Option 3 (least recommended option):

_Important! Make sure to do all this once you have downloaded all the packages (npm install, updates, etc) you need from internet, you won't be able to access the internet once you set up your Pi as a Wireless Access Point._

To set up your raspberry pi zero W as a wireless access point, [follow these instructions](https://www.raspberrypi.org/documentation/configuration/wireless/access-point.md). Will disable your current wifi configuration, you will only be able to connect via SSH.

# Step 2. Install Node on the raspberry pi

So first of all type this in your terminal on raspberry pi to detect the version that you need:

`uname -m`

If the response starts with armv6 than that's the version that you will need. For example for raspberry pi zero W you will need ARMv6

The latest version that supports armv6 is v.10.x, go to [Node's official website](https://nodejs.org/en/download/releases/) and download the tar.gz file that you need.

In my case it was: [node-v10.17.0-linux-armv6l.tar.gz](https://nodejs.org/download/release/v10.17.0/node-v10.17.0-linux-armv6l.tar.gz)

You can download the file either by doing (if your pi is connected to the internet):

`wget https://nodejs.org/download/release/v10.17.0/node-v10.17.0-linux-armv6l.tar.gz`

or

`curl -o node-v10.17.0-linux-armv6l.tar.gz https://nodejs.org/dist/latest-v10.x/node-v10.17.0-linux-armv6l.tar.gz`

or if you are offline on the Pi, by doing ssh into the pi and copying the files to the pi from the terminal of your computer:

`"C:\Program Files\PuTTY\pscp.exe" node-v10.17.0-linux-armv6l.tar.gz pi@192.168.4.1:/home/pi`

Then extract the file:

`tar -xzf node-v10.17.0-linux-armv6l.tar.gz`

Finally copy node to its final location and expose it as a global command:

```
cd node-v6.11.1-linux-armv6l/
sudo cp -R * /usr/local/
```

Now run: `node -v` to verify that node was installed correctly.

# Step 3. Install socket.io

## Pi is online

If you haven't set up the wireless port yet, the connectivity of your Raspberry Pi W should work, in that case, type:
`npm install socket.io --save` and npm should install the package for you.

or

### Pi is offline

If you didn't follow the steps in order, and you set up the Wireless Access Point before, you won't have access to internet, so you'll need to download the package on your computer, pass it through SSH to the Raspberry Pi and then install it from there.

The steps for that unfortunate case are:

1. Download [the zip file of socket.io from github.com](https://github.com/socketio/socket.io/)
2. Extract the zip file and go inside the folder in your terminal: `cd socket.io-master`
3. Run `npm install` inside socket.io-master so you download all dependencies and generate the node_modules folder.
4. In the _package.json_ file add a `"bundledDependencies"` array with the names of all the packages listed in the `"dependencies"` property
   In my case it ended up like this:

```
"bundledDependencies": [
    "debug", "engine.io", "has-binary2", "socket.io-adapter", "socket.io-client", "socket.io-parser"
  ],
```

This will put all the dependencies also inside of the tarball, because you won't have internet to download them in the offline pi.

5.  Run `npm pack` in your terminal. This will generate a tarball (.tgz or tar.gz) file.
6.  Transfer the tarball file to the pi via SSH from the terminal from the folder where the file is stored, I did `"C:\Program Files\PuTTY\pscp.exe" socket.io-2.3.0.tgz pi@192.168.4.1:/home/pi`
7.  SSH into the PI with Putty and do `ls`. Your tarball file should be listed there.
8.  Run `npm install ./socket.io-2.3.0.tgz --save` to install the library in offline mode.

# Step 4. Install node-osc

Now we need to install a node osc package (there are plenty online) to be able to send OSC messages between the different parts of the app. We have chosen node-osc.

## Pi online

If your Pi has connection to Internet do simply `npm install node-osc --save` in the root of the project.

## Pi offline

If your Raspberry Pi is offline we need, again, to take the long road:

1. [Download the node-osc zip](https://github.com/MylesBorins/node-osc).
2. Extract the file and go into the folder `cd node-osc-current`
3. Run `npm install`
4. Open the packages.json file and copy the names of the dependencies into an array in bundledDependencies like this: `"bundledDependencies":["jspack", "osc-min"],` (this may change for future versions, this is valid for version 4.1.4.
5. Run `npm pack` to get your tarball file.
6. Copy the file over SSH from the computer terminal to the Pi with the command `"C:\Program Files\PuTTY\pscp.exe" node-osc-4.1.4.tgz pi@192.168.4.1:/home/pi`
7. Inside the Raspberry Pi do: `npm install ./node-osc-4.1.4.tgz --save`. Phew!!

# Step 5. Install python-osc

Now we need to install the python library that will communicate with the Python project (in this case, r_e_c_u_r).

## Pi online

This has to be done also on the Pi, if the Raspberry Pi is connected to the internet, do `pip3 install python-osc` in the folder project. Also copy the `py-osc-server.py` file to the folder project.

## Pi offline

If your rasppi is offline, you need to:

1. Download the [python-osc's zip file](https://pypi.org/project/python-osc/#files) on your computer
2. Transfer the file to the Raspberry pi with our accustomed `"C:\Program Files\PuTTY\pscp.exe" etc...`.
3. Type `tar -xvf python-osc-1.7.3.tar.gz` to uncompress the tar to a folder.
4. Type `pip3 install python-osc-1.7.3` and you should be good to go.

Now run `python3 py-osc-server.py` to have the OSC server listening for messages and do `npm start` (will run `webserver.js`) to start up the node server.

# And Finally!!!

When you connect to the address `http://192.168.4.1:8080` (or whatever port you have configured in webserver), you will be able to send messages to the node app, and from the node app to any application with OSC activated on port 5233 (defined in `py-osc-server.py` and in `webserver.js`)

# Notes:

## SCP

As a final note I would like to add, that when working on an offline raspberry Pi, you can transfer files files from the Raspberry Pi to the Computer by typing from the terminal of the computer: `scp pi@192.168.4.1:myFolder/myFile.tar.gz .` myFolder would be the path from `/pi/home/`. This command will copy the file to the current director in the Terminal.

You can read [more about SCP
here](https://www.raspberrypi.org/documentation/remote-access/ssh/scp.md).

## Bash script

I created a bash file so you don't have to start all the processes manually.

Inside the terminal of the pi run: `./start.sh`, it will run the node server and the python osc server for you.

In the terminal you will only see the output of the python-osc server, because the node server is running on the background (for now we care only about the last part of the chain).

\*\* If you want to go through this process yourself don't forget to change the permissions of the bash file, otherwise you won't be able to run it. You can do so by running `chmod +x start.sh`
