# EFLDashboard

## Configuration needed

Before running the application, create a folder named config under src/app.  In this folder, create a file named config.ts.  Set up the config file with your firebase config, using the below as a template:

```
export const config = {
  firebaseConfig: {
    apiKey: <YOUR_DATA_HERE>,
    authDomain: <YOUR_DATA_HERE>,
    databaseURL: <YOUR_DATA_HERE>,
    projectId: <YOUR_DATA_HERE>,
    storageBucket: <YOUR_DATA_HERE>,
    messagingSenderId: <YOUR_DATA_HERE>,
    appId: <YOUR_DATA_HERE>,
    measurementId: <YOUR_DATA_HERE>
  },
  encryptionSecret: <ALPHANUMERIC_SEQUENCE_HERE>
};
```
Explanation of config properties:

`firebaseConfig` - The data that firebase provides when you create an application.

`encryptionSecret` - A PBKDF2 encryption key to be used by secure-ls.

## Notes

This project replaces [soccer-dashboard](https://github.com/mattybojo/soccer-dashboard).

This project was built using [ngx-admin](https://github.com/akveo/ngx-admin).