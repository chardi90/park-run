# Parkrun Challenge
A webapp with a map and a list of parkruns in Greater Manchester where runners can track their progress as they complete each run on the challenge. 
Built in ReactJS using a weather API. Made responsive with TailwindCSS and deployed on Netlify.

## Features  
- Data for all current Parkruns in Greater Manchester (JSON)
- Map displaying markers for each run with additional info on click
- Tick off each completed parkrun and input time and date completed
- Dropdown to select parklist for each borough
- Sort parkruns A-Z, by number of laps, by elevation gain or by the runners time
- Progress bar with motivational phrases ideal for Strava screenshots
- Local storage on device to keep track of your progress

## Installation  
Clone the repository and install the required packages:  

```bash  
git clone https://github.com/chardi90/park-run.git  
cd tasktracker  
pip install -r requirements.txt 
``` 

## Usage  

You will need to install [TailwindCSS3](https://v3.tailwindcss.com/) to apply the CSS.

The map and parklist sections both use [Leaflet](https://github.com/Leaflet/Leaflet).

## Development Ideas

If I were to develop this project further I would:
1. Make the map respond to the dropdown select for location (i.e. only show pins for "Manchester", or "Bury" when that borough is selected).
2. Add a search bar to allow users to search for the name of a specific Parkrun.
3. Switch from local storage to a backend with a database (Node.js + Express + MongoDB/Postgres) to create user accounts.
4. Create versions for other major cities or metropolitan areas (e.g. London).

## Contributing  

Found a bug or have an idea? Fork the repo, make changes, and submit a pull request.  

## Contact  

Created by [Chardi](https://www.chardi.co.uk/)  
Feel free to reach out with questions or suggestions.
N.B. This was an independent project that did not involve Parkrun Limited.
