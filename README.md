# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Deployment on AWS Amplify
Steps:

1. Create AWS Amplify App in the Amplify Console, define the settings and regions, similar to most AWS Configuration.

2. Set up build, configuration settings, modify as needed. Due to the usage of AWS Cognito and Backend services, we need to add the following additional code to build the backend for the deployment. Configure the build to a github repo.

```
backend:
  phases:
    build:
      commands:
        - '# Execute Amplify CLI with the helper script'
        - amplifyPush --simple
```

3. User authentication with Cognito: Under Authentication tab, pick AWS Cognito. Follow the prompts to set up Cognito as your authentication provider, as well as authentication flow, and data to save for users.

4. Install Amplify-CLI and amplify auth libraries into the React Project. Configure secret key accordingly.
