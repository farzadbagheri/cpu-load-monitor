<h2 align="center">CPU Load Monitor</h2>

This is a POC for a web app that monitors CPU load and alert + log high CPU load occurrences and recoveries. It is built using React with a local Node.js backend. 

Currently, it only monitors data throghout the session, but if this design were extended to production capacity,ongoing performance history would be a useful feature. Along with that, more extensions to the design of the application can include: more in depth analysis of performance (i.e. percentage changes) as well as customizable windows of data (i.e. one hour, one week) and their respective CPU load averages + high load history + recovery history, customizable granularity (i.e. 1sec. updates) as well as more forms of data relay (i.e. CSV view/export).

## Available Scripts

Clone this project and in the project directory, you can run:

### `npm install`

Run this command first to install all dependencies.

### `node server.js`

Run this command in its own terminal window to start up the server code for reading CPU load from using 
OS in Node

### `npm start`

Runs the app in the development mode. (Run this after running `node server.js`)<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode. Tests written using Jest<br />
(code can be found at App.test.js)
