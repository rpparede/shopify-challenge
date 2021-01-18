# Shopify Summer 2020 Internship Challenge

LocalStock is a web application I have developed as part of my application to the Summer 2020 Internship Program.

LocalStock is a web-based application that connects developers with photographers around the world. We always have been in the postion where you find a great photo for your application but it's trademarked. With LocalStock you can find thousands of images and directly purchase the image that fits your needs.

VIDEO DEMO: 

This code base required the following prerequisites to build:

- [Node.js](https://nodejs.org/en/)
- [React.js](https://reactjs.org/)
- A [Cloudinary](https://cloudinary.com) developer account
- A [Postgresql](https://www.postgresql.org/) database

To run the code, follow these steps:

1. `git clone https://github.com/rpparede/shopify-challenge` to clone this repository on your machine
2. The code has been divided into two folders, one for the client and another for the server. You will need 2 different terminals to run the client and server
TERMINAL 1
1. `cd client/` on terminal 1 to go to into the directory where the client is stored
2. `npm i` will install all required dependencies
3. `npm start` will start the client locally and open a new browser tab at localhost:3000
TERMINAL 2
2. `cd server/` on terminal one to go to into the directory where the server is stored
3. `npm i` will install all required dependencies
4. `node index.js` will start the server locally

On the root folder create a .env file which will contain the keys for Cloudinary and configure the server port
Create a file `src/.env` with the following contents:

```
PORT=3080
CLOUDINARY_NAME=XXXXXXXXXXX
CLOUDINARY_API_KEY=XXXXXXXXX
CLOUDINARY_API_SECRET=XXXXXXXXXX
EXXPRESS_SESSION_KEY=some_random_key
```

This will start the server on `http://localhost:3080/`. 
I used Postman to test my endpoints [Postman](https://www.getpostman.com).


To access documentation, perform steps 1 through 4 and visit `http://localhost:3080/api-docs` which was generated through `express-swagger-generator`.

Project Scope:

## Scope

- This is an image repository platform where users can share multiple photos
- In  order to make a post users need to signup and loging
- Users can create one post at a time
- Users can edit or delete their photos on the "My Photos" section
- Users can see all their posts under "My Photos" section
- All posts are available to everyone but only the owner of the post can edit or delete a post (access-control)

This project has two resources: User and Post

1. User

```
username: String
email: String
password: String
createdAt: Date
```

- the password is salted and hashed using `bcrypt`
- the createdAt is auto-generated upon account recreation

2. Post

```
title: User
url: String
price: Integer
userId: Integer
```

- the title is the post title
- url is the URL from where the photo can be accessed
- price is the price the photographer is asking for the full version of the photo

## User Flow

- Users can register sign up using the client, this will make a request to `POST /api/auth/signup` endpoint, which will return a User Succesfully Registered or an error message
- Users can then then navigate to the login tab and fill in their details, this will make a request to the `POST /api/auth/signin` endpoint, which will return a `JWT`, which will be user as a key to access the restricted parts of the application
- The `JWT` will be passsed as a header with key `Authorization` to access all private endpoints; this ensures that users can access any private information on their account
- Users can create posts using the New Post tab, this will call `POST /posts/store` with the title, price and photo required to create a post. The respose will include the url where the image is stored
- Users can delete any photo by hitting `DELETE /posts/:postId` passing in the photo ID; they will recieve a success message with a 200 code if the photo is successfully deleted
- Users can list all their images by hitting `GET /api/posts/user`, the response of this endpoint is paginated and extra query parameters can be passed to specify the pageNumber or size


## Remainign work, Improvements and Future work

  - I would use Docker to containerize the application to speed up the development process 
  - I would integrate the Stripe API to allow payments to be done in the app 
  - I would add Tags to each post, so users can filter images by tags 
