# Project - SoftUni Angular course

## Overview

This project comprises a backend and a frontend developed for a web application. The backend is built using Express.js with MongoDB, consisting of three main collections: Users, Posts, and Comments, interconnected with relationships. It supports authentication, wherein upon successful login, it sends a JWT token to the client. The client must send this JWT token for subsequent requests to authenticate.

The frontend is implemented with Angular and includes various pages such as Home, User Profile, Post Details, All Users, Edit Post, and Edit Profile. Each of these pages communicates with the backend via HTTP requests. The application utilizes all four CRUD (Create, Read, Update, Delete) operations.

## Backend

### Technologies Used
- Express.js
- MongoDB
- JSON Web Tokens (JWT) and bcrypt for authentication
- cors

### Collections
1. Users
2. Posts
3. Comments

### Authentication
- Upon successful login, the backend issues a JWT token to the client.
- Clients must include this JWT token in subsequent requests for authentication.

## Frontend

### Technologies Used
- Angular
- fontawesome icons via cdn

### Pages
1. Home
2. UserProfile
3. PostDetails
4. AllUsers
5. EditPost
6. EditProfile

### Communication with Backend
- Each page communicates with the backend via HTTP requests.

## Functionality
- All CRUD operations are implemented in the application.
- The behavior and state of the application changes dynamically based on the logged in user.

## Usage
- To use the application, ensure both backend and frontend servers are running.
- Access the frontend via a web browser and interact with the provided pages.

## Installation and Setup
1. Clone the repository.
2. Install dependencies for both backend and frontend.
3. Set up MongoDB and configure the backend accordingly.
4. Run both backend and frontend servers.
5. Access the application through a web browser.