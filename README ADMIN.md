# Admin guide

See also: [user guide](https://github.com/handshou/todolist/blob/main/README.md)

![Admin overview](/public/plan-admin-overview.png)

## Table of contents

1. [Overview](#overview)
   - [File structure](#file-structure)
   - [System architecture](#system-architecture)
   - [Getting started](#getting-started)
1. [Requirements](#requirements)
1. [Installation](#installation)
   - [Environment configuration](#environment-configuration)
   - [Setting up firebase](#setting-up-firebase)
   - [Running locally](#running-locally)
1. [Deployment](#deployment)
   - [Firebase hosting](#firebase-hosting)
1. [Tips and best practices](#tips-and-best-practices)
   - [Security](#security)
   - [Backup and recovery](#backup-and-recovery)
   - [Monitoring](#monitoring)
   - [User access management](#user-access-management)
   - [Storage access management](#storage-access-management)
   - [Database management](#database-management)
1. [Bugs](#bugs)
1. [Suggestions](#suggestions)
1. [Release notes](#release-notes)
1. [Glossary](#glossary)
1. [Support](#support)

## Overview

You can find this document online.

- [File structure](#file-structure)
- [System architecture](#system-architecture)
- [Getting started](#getting-started)

### File structure

```
Todolist
├── README ADMIN.md              // Admin guide
├── README.md                    // User guide
├── build                        // Generated files (npm run build)
│   └── ...
├── cors.json
├── firebase.json
├── package-lock.json
├── package.json
├── public                       // Serve static content in this folder
│   ├── 404.html
│   ├── favicon.ico
│   └── index.html
└── src
    ├── components
    │   ├── CredentialsForm.jsx
    │   ├── Dropzone.jsx
    │   ├── EditInputField.jsx
    │   ├── FileModal.jsx
    │   ├── LogoutFooter.jsx
    │   ├── Navbar.jsx
    │   └── TodoModal.jsx
    ├── context
    │   └── MyProviders.jsx
    ├── index.css
    ├── index.js
    ├── routes
    │   ├── app.jsx
    │   ├── login.jsx
    │   ├── protected.jsx
    │   ├── register.jsx
    │   └── todolist.jsx
    ├── setupTests.js            // Leftover test init from create-react-app
    └── utils
        └── auth
            ├── createUser.js
            └── signIn.js
```

### System architecture

#### Single page application

Created using create-react-app. Routing done with React Router v6.14 (createBrowserRouter).

#### Authentication & Authorization

Firebase-Auth (email and password over HTTPS). All authenticated and registered users have full access/authorization to the app.

#### Database

Firestore, snapshot listener hooked up to React Context (works well with Firebase-Auth, read and write permissions).

#### Designed components

[Chakra-ui](https://chakra-ui.com), using some UX principles on good table design practices for the checklist. [React-icons](https://react-icons.github.io/react-icons/search?q=external) for icons.

#### Storage

Firebase storage (interacts nicely with Firebase-Auth, read and write permissions).

### Getting started

`Commands to start`

## Requirements

VSCode

Terminal

gsutils & python3 installed

## Installation

### Environment configuration

### Setting up firebase

### Running locally

`Firebase emulator`

## Deployment

`Firebase hosting`

## Tips and best practices

### Security

Saving information to local storage

Suggestion to use `Iron session`

### Backup and recovery

`How to make a copy of json data`

`How to make a copy of storage`

### Monitoring

`Firebase dashboard`

### User access management

`Auth`

### Storage access management

`Firestore / Storage`

### Database management

## Bugs

## Suggestions

## Release notes

## Glossary

### Notes on Create React App

```
## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
```

## Support

Contact me on Github or open an issue [here](https://github.com/handshou/todolist/issues).

[To top](#table-of-contents)