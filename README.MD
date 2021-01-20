# Names
A simple web based application for retrieving and showing names from PostgreSQL database. Users can list names from the database, sort them in different orders and get the amount of people with certain name. This app is built upon [Deno runtime](https://deno.land/).

## Installation
In order to run the program on your own computer first you must install Deno runtime version 1.5.1 since the app is built upon it. This is rather easy no matter if you're running Windows, Linux or Mac.

Installation for different operating systems is done one of the following ways:

### Windows
PowerShell: `$v="1.5.1"; iwr https://deno.land/x/install/install.ps1 -useb | iex`

### Linux
Shell: `curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.5.1`

### Mac
Shell: `curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.5.1`

### After Installation
After installation you can check if the installation worked by running `deno --version` in terminal. It should return:
    deno 1.5.1
    v8 8.7.220.3
    typescript 4.0.3

Further instructions on the installation of Deno can be found [here](https://github.com/denoland/deno_install).

### Deploying app into a cloud platform
In case you don't want to run the app locally you can deploy it into a cloud platform. I have choosen to use [Heroku](https://www.heroku.com) since it's rather simple to use.

1. Create an account and log in

2. When logging in you get directed to you dashboard
    - Here crete a new app from the right upper corner of the screen where it has a dropdown menu called _New_
    - Insert _App name_ and _Choose a region_ closest to you
    - After this just press _Create app_

3. Now the app has been created but you still have to set up a Deno buildpack and link Heroku to this GitHub repository.
    - Go to the settings which can be found at the following address (and of course replace the "app_name" with your apps name) `https://dashboard.heroku.com/apps/"app_name"/settings`
    - Now scroll down untill you see section labeled _Buildpacks_
    - Click _Add buildpack_ and enter `https://github.com/chibat/heroku-buildpack-deno.git` into the Buildpack URL
    - Then just press _Save Changes_
    
## Database
To run the app on your own server you must use PostgreSQL. If you __DON'T__ want to create you own database for this then there is already one existing for testing this application. The database credentials are already in the config file so you don't have to do anything. Just skip the instructions on setting up the database and go straight to the [Getting started](https://github.com/aga2cr5/names#getting-started) part.

If you want to run the app with your own database I recommend you use an online service providers such as ElephantSQL since they are quite easy to use and fast to se up. It is done the following way:

1. Go to the following [link](https://www.elephantsql.com/docs/index.html)
    - It explains how to setup a free instance (Tiny Turtle) of ElephantSQL

2. Log in to the ElephantSQL and go to your instance (or create a new one)

3. From the left side of the window you can...
    - Get you database credentials from _DETAILS_
    - Run the commands for creating the database at _BROWSER_

### Create database tables 
Database is configured for the application by running the following commands in the PostgreSQL console:

`DROP TABLE IF EXISTS names;`

`CREATE TABLE names ( id SERIAL PRIMARY KEY, name TEXT NOT NULL, amount INT NOT NULL);`

First commant makes sure to delete existing table "names" if such were to exist. Second command creates the actual table with columns for id, name and amount.

To be able to use your own database you will need to set your own database credentials to the `config.js` file which can be found from `/config/config.js`.

## Getting started
Open terminal and navigate to the apps root folder (it's the one that has app.js in it). After that just run `deno run --allow-all app.js`. In case you don't want to allow deno all permissions you can set different flags for that.

The app runs on port 7777 on default. The port can be changed from `/config/config.js`. There is a variable called `PORT` which you just change the value to math the port you want the app to run.

Also depending on your database you can maybe change the `CONCURRENT_CONNECTIONS` variable from the same `config.js` file but I don't recommend it if you don't know how many concurrent connections your database can handle.
