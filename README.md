<p align="center">
   <h3 align="center">Japan Exchange Internship/Student Database</h3>
   <p align="center">
   Server and Frontend Dashboard
   </p>
</p>

## View Demo


## Overview

>This is a personal project imported from BitBucket and is on hold status.

**The problem** : Brazilian Association of Ex-Internship from Japan(ASEBEX) suggested to create a Social Network for current and ex-internship students, so that people can help each other with internship challenges.

**This Project** : Made with NextJS, NextAuth and a MySQL database, it is a dashboard where internship students and ex-internship members can subscribe information about their exchange programs.

**What Is Done** :
1. Auth System with Email(Passwordless) and Gmail Login using NextAuth
2. First Database Model and SQL files in ```/model``` folder
![Alt text](/model/v0.1%20-%20Conceptual%20Model.png "Optional Title")
3. User Interface - CRUD Forms for:
- Personal Info
- Japan Descendent Info
- Academic History
- Professional Info
- Internship Programs

## Running the project

### 1. Clone the repository and install dependancies

```
git clone https://github.com/gtoshinakano/asebase-next.git
cd asebase-next
npm install
```

### 2. Configure your local environment

Copy the .env.local.example file in this directory to .env.local (which will be ignored by Git):

```
cp .env.local.example .env.local
```

Add details for providers, smtp credentials for sending email (SendGrid), MySQL database access info, your Google Firebase APP API Key.

You need to fill all info pre-filled in ```.env.local.example``` 

#### Database

MySQL schema file and dump files are on ```/model```. You must import it into your server, the schema and the japan provinces data.

### 3. Start the application

With everything configured, run the app locally:

```
npm run dev
```

To run it it production mode, use:

```
npm build
npm start
```

Then Access: http://localhost:3000/auth/signin create your account by filling your email or by choosing Google SignIn.

### 4. Accessing the dashboard

Go to http://localhost:3000/member/dashboard

You can register your info and test the fields.

