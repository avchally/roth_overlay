## Realms of the Haunting Info Overlay
A simple command-line tool to display basic in-game information from the 1997 DOS game, Realms of the Haunting.  

I am a speedrunner and glitch-hunter for this game, and wanted a way to view realtime positional data of the character. The goal was to test different glitches and strategies and to see how they impacted movement. This is by no means a polished app and was purely created for personal use. I might clean it up more in the future and display other pieces of information, but feel free to contribute if you like.  

## Setup
Being a Node.js project, you need Node.js installed on your system.  

After cloning the repository simply do a ```npm install``` or ```yarn install``` from the root folder.  

Run the start.bat file or simply ```npm start``` to start the script.

## Important Notes
The script relies on reading memory from the game, so the current memory addresses are configured only for Realms of the Haunting (UK Version 1.4) being run on DOSBox Version 0.74. This is the standard setup if you download the game from GoG or Steam.

Here is a sample screenshot of the script. I would chroma key the background and use it as an overlay in OBS when recording videos.  
*Also, I was not able to find the ingame values for speed, so all of the speed values are manually calculated and quite clunky, so this is an area for improvement.  

![image](https://user-images.githubusercontent.com/65693071/213622154-bf6bef61-99aa-428c-9628-7e9c30dab374.png)

## Shameless Plug
Also, since you're here, check out my youtube channel for ROTH speedrunning 😄 https://www.youtube.com/@ChallexSM64
