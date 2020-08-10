# Your Places

Find all your favourite places on one map, grouped into categories!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running the project

Before your first start of the app, run:

### `npm i`

You will have to get your own Google Api Key to run this application.<br /> 
Read how to do it here: https://developers.google.com/maps/documentation/javascript/get-api-key

Once you get it, in the main folder, create .env file and paste this line there:

### `REACT_APP_GOOGLE_API_KEY = your_google_api_key`

Finally, in the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

Folder 'files for tests' contains 6 example CSV Files that you can use to test the application. 3 of them should return actual places on the map and the rest of them should show an alert about wrong data.<br />
You may or may not get an information 'One or more of your addresses were invalid.' while testing more than 10 addresses. It's because of the Google API which allows to make only 10 calls in a short amount of time, so everything depends on how fast you'll get each of the addresses.

The application is automatically deployed to heroku after every commit on master.
