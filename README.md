# User Guide

See: [Admin Guide](https://github.com/handshou/todolist/blob/main/README%20ADMIN.md)

Live demo link: [Here @ https://todolist-hansel.web.app](https://todolist-hansel.web.app)

### Quick video guide (No audio)

https://github.com/handshou/todolist/assets/12982599/24213dc6-dce6-4f43-a787-efd1554690b4

## Table of contents

1. [Overview](#overview)
    - [Changes](#latest-changes)
    - [Interface](#interface)
    - [Main features](#main-features)
    - [Account management](#account-management)
1. [Getting started](#getting-started)
   - [Online](#online)
   - [Offline, local](#offline-local)
1. [How to](#how-to)
   - [Register](#register)
   - [Login, logout](#login-logout)
   - [Create, delete task](#create-delete-task)
   - [Attach, view, download file](#attach-view-download-file)
1. [Troubleshooting](#troubleshooting)
   - [Register troubleshooting](#register-troubleshooting)
   - [Login troubleshooting](#login-troubleshooting)
1. [Support](#support)

## Overview

[Back to table of contents](#table-of-contents)

You can find this document online.

### Latest changes

Technical Interview (26 Jul, 2023) : Create-react-app, React-router, Chakra UI

Post Interview

26 Jul : Style UI, Todolist, Login, Logout, Navbar, Footer

27 Jul : Auth, Add Modal, "Add item", Validation Pop ups (Toasts), Protected routes

28 Jul : Add Storage, Use Firebase Emulator (offline development database)

29 Jul : Hosting live site, Add file upload and download, Use React Context API, .env.example, Dropzone

31 Jul: Complete file upload and download

1 Aug : Add Doc Renderer, Update CORS, Add Badges for filename and filesize

2 Aug : Add Documentation

### Interface

![Login screen](/public/preview1.png)
![Checklist](/public/preview2.png)
![](/public/preview3.png)
![](/public/preview4.png)
![](/public/preview5.png)
![](/public/preview6.png)
![](/public/preview7.png)
![](/public/preview8.png)

### Account management

Account data is stored on a Firebase Auth account. 

A login token is received after exchanging email and password on Firebase Auth servers. The token is stored in your browser session, Local Storage. 

This token is cleared on logout.

## Getting started

[Back to table of contents](#table-of-contents)

### Online

It is recommended to try out the live demo @ https://todolist-hansel.web.app

### Offline, local

Download zipped codes

Run npm install

Setup Environment configuration (.env)

Run npm run start

## How to

[Back to table of contents](#table-of-contents)

### Register

### Login, logout

### Create, delete task

### Attach, view, download file

## Troubleshooting

[Back to table of contents](#table-of-contents)

### Register troubleshooting

Toast messages

### Login troubleshooting

Toast messages

### Page not found

## Support

[Back to table of contents](#table-of-contents)

Contact me on Github or open an issue [here](https://github.com/handshou/todolist/issues).
