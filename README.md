## Nimbus Cloud

Fullstack application that leverages AWS services, and the Spotify API to send a user a brand new song of the day based on the seed genres they selected upon registration.

Note- Due to the provision service charges on AWS, the application is non-functional when running it locally. Instructions to run it locally will be provided nonetheless.

## Table of Contents

1. [Steps for Local Deployment](#local_deployment)
2. [Architecture](#architecture)
3. [What it Does](#purpose)
4. [Built With](#built_with)
5. [Screenshots](#screenshots)


<a name="local_deployment">
  
## Steps for Local Deployment
- `git clone https://github.com/Liam-So/nimbus-cloud.git`
- In terminal 1
  - `cd backend`
  - `npm install`
  - `npm start`
- In terminal 2
  - `cd frontend`
  - `npm install`
  - `npm start`
- The application is now accessible at `http://localhost:3000` 

<a name="#architecture">
 
## Architecture
![image](https://user-images.githubusercontent.com/60020795/189743028-4da929a3-06a3-4cb1-9fbc-45c6edbd1015.png)



<a name="built_with">

## How it was built and provisioned on AWS

Nimbus Cloud was built using Docker, React, Express, Node.js, DynamoDB, Amazon Cognito, AWS Lambda, Elastic Beanstalk, Amazon SNS, Cloudfront, and API Gateway. 

The architecture uses Cloudfront to route user requests to our frontend and provides an extra layer of security in doing so. Our frontend is a React application hosted on S3 which uses Amazon Cognito for user authentication and serves requests to our backend. These requests go through API Gateway for security, which acts as a proxy for our Elastic Beanstalk application. 

The Nodejs and Expressjs backend is deployed on Elastic Beanstalk where it interacts with our DynamoDB database. This is also where our Lambda function is called to generate the daily song recommendations from Spotify, and uses SNS to send the generated song to the user’s mobile device. 
Our data is stored through the use of two AWS cloud services. Passwords are not directly stored, but our application uses Amazon Cognito to provide user pools of scalable storage used for user authentication during registration and login. The rest of our data is stored in a DynamoDB database.

Our frontend user interface required programming to create our various pages: register, genres, confirmation, login, and home. Our backend also required programming to create and connect our endpoints to spotify and our AWS services: SNS and DynamoDB. It also allowed our users to see their previous songs of the day for their convenience.

Our deployment uses Docker to containerize and push our application’s backend as an image to DockerHub. Our “aws run” file is then uploaded to Elastic Beanstalk providing instructions to pull the image from DockerHub and deploy it. Our frontend is hosted as static files on S3 where it is able to make requests to our backend.



<a name="screenshots">

## Screenshots
