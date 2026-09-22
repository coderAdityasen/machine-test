# wallet transaction REST API 

- this is a restapi project setup for wallet trnsaction api's

## how to setup

- copy the .env.example to .env and update the values of the mysql databse
- then copy and run the database/schema/init.sql file into your mysql database to create the required database and tables
- then run the demo.sql to insert one user in the the user table

`npm install` - to install all the dependencies
`nodemon server.js` - to start the server

## API endpoints

- i have created 3 api's
- post /wallet/ - create wallet
- post /wallet/deposit - deposit money into wallet
- Get /wallet/balance - get the balance of the wallet
