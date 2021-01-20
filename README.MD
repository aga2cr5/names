# Names
A simple web based application for retrieving and showing names from PostgreSQL database. Users can list names from the database, sort them in different orders and get the amount of people with certain name. This app is built upon [Deno runtime](https://deno.land/). Application can be viewed from [Heroku](https://top20names.herokuapp.com/) where is deployed at the moment.

## Installation
In order to run the program on your own computer first you must install Deno runtime version 1.5.1 since the app is built upon it. This is rather easy no matter if you're running Windows, Linux or Mac but we recommend Linux or WSL.

Installation for different operating systems is done one of the following ways:

### Windows
PowerShell: `$v="1.5.1"; iwr https://deno.land/x/install/install.ps1 -useb | iex`

### Linux
Shell: `curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.5.1`

### Mac
Shell: `curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.5.1`

### After Installation
After installation you can check if the installation worked by running `deno --version` in terminal. It should return:
`deno 1.5.1 v8 8.7.220.3 typescript 4.0.3`

Further instructions on the installation of Deno can be found [here](https://github.com/denoland/deno_install).

### Deploying app into Heroku
In case you don't want to run the app locally you can deploy it into a cloud platform. I have choosen to use [Heroku](https://www.heroku.com) since it's rather simple to use.

1. Create an account and log in

2. When logging in you get directed to you dashboard
    - Here crete a new app from the right upper corner of the screen where it has a dropdown menu called __New__
    - Enter __App name__ and __Choose a region__ closest to you
    - After this just press __Create app__

3. Now the app has been created but you still have to set up a Deno buildpack and push the files to Heroku.
    - Go to the settings which can be found at the following address (and of course replace the "app_name" with your apps name) `https://dashboard.heroku.com/apps/"app_name"/settings`
    - Now scroll down until you see section labeled __Buildpacks__
    - Click __Add buildpack__ and enter `https://github.com/chibat/heroku-buildpack-deno.git` into the Buildpack URL
    - Then just press _Save Changes_

4. Install The Heroku 
    - Heroku CLI requires Git to work so you need to install that first from [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
    - Different ways of installation the command line interface can be found [here](https://devcenter.heroku.com/articles/heroku-cli)
    - Now you can enter `heroku login` to the terminal so you can use the Heroku CLI

4. Get the app to your computer
    - Run in your terminal `git clone https://github.com/aga2cr5/names.git` or alternatively just download the .zip file from the repository and extract the file. Then navigate to the apps root folder.

6. In the folder if you __didn't__ use `git clone` but instead just downloaded the .zip file this step is for you
    - In the root of the folder run `git init`

7. In the terminal enter `heroku git:remote -a app_name` and replace *app_name* with what you named your Heroku app in the earlier step

8. Now just run the rest of the commands
    - `git add .`
    - `git commit -am "make the app go wrooom"`
    - `git push heroku master`

9. That should to the job and the terminal should squirt some text out. First time starting the app it's going to take a bit longer time since it has to download all the dependencies
    - Access your app at `https://app_name.herokuapp.com/`. Remember to replace app_name with your own apps name.

## Database
To run the app on your own server you must use PostgreSQL. If you __DON'T__ want to create you own database for this then there is already one existing for testing this application. The database credentials are already in the config file so you don't have to do anything. Just skip the instructions on setting up the database and go straight to the [Getting started](https://github.com/aga2cr5/names#getting-started) part.

If you want to run the app with your own database I recommend you use an online service providers such as ElephantSQL since they are quite easy to use and fast to se up. It is done the following way:

1. Go to the following [link](https://www.elephantsql.com/docs/index.html)
    - It explains how to setup a free instance (Tiny Turtle) of ElephantSQL

2. Log in to the ElephantSQL and go to your instance (or create a new one)

3. From the left side of the window you can...
    - Get you database credentials from __DETAILS__
    - Run the commands for creating the database at __BROWSER__

### Create database tables 
Database is configured for the application by running the following commands in the PostgreSQL console:

`DROP TABLE IF EXISTS names;`

`CREATE TABLE names ( id SERIAL PRIMARY KEY, name TEXT NOT NULL, amount INT NOT NULL);`

First commant makes sure to delete existing table _names_ if such were to exist. Second command creates the actual table with columns for _id_, _name_ and _amount_.

To be able to use your own database you will need to set your own database credentials to the `config.js` file which can be found from `/config/config.js`.

## Getting started
Open terminal and navigate to the apps root folder (it's the one that has app.js in it). After that just run `deno run --allow-all app.js`. In case you don't want to allow deno all permissions you can set different flags for that.

### Configuration
The app runs on port 7777 on _default_. The port can be changed from `/config/config.js`. There is a variable called `PORT` which you just change the value to math the port you want the app to run.

Also depending on your database you can maybe change the `CONCURRENT_CONNECTIONS` variable from the same `config.js` file but I don't recommend it if you don't know how many concurrent connections your database can handle. At the moment concurrent connections are set to 3.
