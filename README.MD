# Names
A simple web based application for retrieving and showing names from PostgreSQL database. Users can list names from the database, srt them in different orders and get the amount of people with certain name.

## Installation
In order to run the program on your own computer first you must install Deno runtime since the app is built upon it. This is rather easy no matter if you're running Linux, Windows or Mac(?).

Installation for different operation systems is done one of the following ways:
( After installation you can check if it worked by running ( deno --version ) in terminal)

### Windows
PowerShell ( iwr https://deno.land/x/install/install.ps1 -useb | iex )

### Linux
Shell ( curl -fsSL https://deno.land/x/install/install.sh | sh )

### Mac
Shell ( curl -fsSL https://deno.land/x/install/install.sh | sh )
or
Homebrew ( brew install deno )



## Getting started
Open terminal and navigate to the apps root folder (it's the one that has app.js in it). After that just run ( deno run --allow-all app.js ). In case you don't want to allow deno all permissions you can set different flags for that.

## Database
To run the app on your own server you must use PostgreSQL. We recomment online service providers such as ElephantSQL since they are quite easy and fast to se up.

-do this
-and this
-and this

Database is configured by running following commands in the postgresql console:

DROP TABLE IF EXISTS names;

CREATE TABLE names (
id SERIAL PRIMARY KEY,
name TEXT NOT NULL,
amount INT NOT NULL);

First commant makes sure to delete existing table "names" if such were to exist. Second command creates the actual table with columns for id, name and amount.

To be able to use your own database you will need to set your own database credentials to the config.js file which can be found from "/config/config.js".