## Realms of the Haunting Info Overlay
A simple command-line tool to display basic in-game information from the 1997 DOS game, Realms of the Haunting.  

I am a speedrunner and glitch-hunter for this game, and wanted a way to view realtime positional data of the character. The goal was to test different glitches and strategies and to see how they impacted movement. This is by no means a polished app and was purely created for personal use. I might clean it up more in the future and display other pieces of information, but feel free to contribute if you like.  

## Setup
Being a Node.js project, you need Node.js installed on your system.  

After cloning the repository simply do a ```npm install``` or ```yarn install``` from the root folder.  

Run the start.bat file or simply ```npm start``` to start the script.

## Important Notes
The script relies on reading memory from the game, so the current memory addresses are configured only for Realms of the Haunting (UK Version 1.4) being run on DOSBox Version 0.74. This is the standard setup if you download the game from GoG or Steam.
