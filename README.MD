# Names
A simple web based application for retrieving and showing names from PostgreSQL database. Users can list names from the database, sort them in different orders and get the amount of people with certain name.

## Installation
In order to run the program on your own computer first you must install Deno runtime since the app is built upon it. This is rather easy no matter if you're running Linux, Windows or Mac(?).

Installation for different operation systems is done one of the following ways:
(After installation you can check if it worked by running `deno --version` in terminal)

### Windows
PowerShell: `iwr https://deno.land/x/install/install.ps1 -useb | iex`

### Linux
Shell: `curl -fsSL https://deno.land/x/install/install.sh | sh`

### Mac
Shell: `curl -fsSL https://deno.land/x/install/install.sh | sh`
or
Homebrew:  `brew install deno`

## Database
To run the app on your own server you must use PostgreSQL. If you __DON'T__ want to create you own database for this then there is already one existing for testing this application. The database credentials are already in the config file so you don't have to do anything. Just skip the instructions on setting up the database and go straight to the Getting started part.

If you want to run the app with your own database I recommend you use an online service providers such as ElephantSQL since they are quite easy to use and fast to se up. It is done the following way:

1. Go to the following [link](https://www.elephantsql.com/docs/index.html)
    - It explains how to setup a free instance (Tiny Turtle) of ElephantSQL

2. Log in to the ElephantSQL and go to your instance (or create a new one)

3. From the left side of the window you can...
    - Get you database credentials from "DETAILS"
    - Run the commands for creating the database at "BROWSER"

### Create database tables 
Database is configured for the application by running the following commands in the PostgreSQL console:

`DROP TABLE IF EXISTS names;`

`CREATE TABLE names ( id SERIAL PRIMARY KEY, name TEXT NOT NULL, amount INT NOT NULL);`

First commant makes sure to delete existing table "names" if such were to exist. Second command creates the actual table with columns for id, name and amount.

To be able to use your own database you will need to set your own database credentials to the config.js file which can be found from "/config/config.js".

## Getting started
Open terminal and navigate to the apps root folder (it's the one that has app.js in it). After that just run `deno run --allow-all app.js`. In case you don't want to allow deno all permissions you can set different flags for that.
The app runs on port 7777 on default. The port can be changed from "/config/config.js". There is a constant variable called "PORT" which you just change the value to math the port you want the app to run.
