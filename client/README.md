This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Client

The client configuration is using the socket.io library to communicate with the socket.io on the nodeserver.
The Front-End is a React app bootstrapped with [Create React App](https://github.com/facebook/create-react-app)..

## Making a new build

In case you modify anything from the existing client src files, run `yarn build` or `npm build` to remake the build and see your changes.

The files that are being sent by the server are in `client/public/build`.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
