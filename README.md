# Exam project --MovieVault--
## This is my examProject making a fullstack moviedatabase app with authentication, RESTful API and a mysql backend.
- The app boots up pretty slowly when you initially run it, due to a large script being executed, so give it a few seconds on startup.

- The script queries external API's for movieTitles, and then an api with the titles to retrieve various data about each movie. It then creates nessecary tables and populates tables with data and keys. This could easily be avoided with just storing data as json, but i chose to stick with this method to display the use of external data and data handling.


# Application Installation and Usage Instructions

1. To use this application you first need to set up a database:

- STEP 1: Create the database in MySQL Workbench:

Use the following SQL script to create the “MovieDb" MySQL Database:

    create schema MovieDb;


- STEP 2: Create the database user in MySQL Workbench:

Use the following SQL script to create an “admin” Database User with all database privileges:


CREATE USER 'ProjectAdmin'@'localhost' IDENTIFIED WITH mysql_native_password BY "P4ssword12";
ALTER USER 'ProjectAdmin'@'localhost' IDENTIFIED WITH mysql_native_password BY "P4ssword12";
GRANT ALL PRIVILEGES ON MovieDb.* TO 'ProjectAdmin'@'localhost';



2. Next is getting the enviroment ready for running the app:

- Open this repository in your code editor

- Navigate to "Terminal" and open a new terminal

- Make sure your terminal is at the correct cd, and input "npm install".

- Create a file at the root directory named ".env" and paste in the variables you can find under     "Environment Variables".

- After installing the dependencies type in "npm start" in the terminal.

- When you start up the application, it will take some time initially, this is cause the server is writing the data to the database. After thats done it runs much faster

- Now the database will be correctly created with tables and relationships, and the app is running.

- You can access the app at "http://localhost:3000/" (Sometimes you will need to reload the page if it fails)

- To run the test open a new terminal while the app is running, and input "npm test"

- To have access to certain user actions you will need to signup with Auth0, this is easy, just find "Sign in" on the navbar and follow instructions.


# Environment Variables

DATABASE_NAME="MovieDb"
ADMIN_USERNAME="ProjectAdmin"
ADMIN_PASSWORD="P4ssword12"
DIALECT="mysql"
DIALECTMODEL="mysql2"
HOST="localhost"
PORT="3000"
MOVIEAPIKEY="dda73268"

CLIENT_ID=eHY4UngXY1ZLgV1DAR8d6voRz6IKJWjq
SECRET=FOJMjWx4pXMPmfRCggyoNerAHec79po5NND9VS3ndP3t50sKFn5ag1xFK7qJYtBy


# Additional Libraries/Packages
- express
- dotenv
- ejs
- mysql
- mysql2
- sequelize         - ORM tool to handle crud and communication with backend and server.
- jest              - Testing framework
- supertest         - Testing framework
- cheerio           - Testing framework
- supertest-sesion  - Testing framework
# NodeJS Version Used
v18.15.0

# POSTMAN Documentation link
https://documenter.getpostman.com/view/25206042/2s93saZXvf
