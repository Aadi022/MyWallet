# MERN Fund Transfer Wallet Project

## Project Overview
This is a full-stack project that showcases money transfer functionality from one user to another. It includes several features such as user signup, user signin, topping-up wallet, transferring money to other accounts, and updating the profile.

## Frontend

The frontend is built using Vite React. The `frontend` folder in this repository contains the `src` folder, which encapsulates all the logic and rendering parts. Axios is used to fetch APIs from the backend.

### Relevant Routes
1. **/signup**: User signup.
2. **/signin**: User signin.
3. **/paydashboard**: Main dashboard, which routes to payment, updating profile, and topping-up wallet routes.
4. **/payment**: Transfer money to another user.
5. **/topup**: Top-up user wallet.
6. **/updateprofile**: Update user profile.

## Backend

The backend is scripted in Node.js. Other frameworks and libraries used are Express.js, jsonwebtoken, bcryptjs, zod, Mongoose, and body-parser.

### User Related Routes
1. **/signup**: User signup.
2. **/signin**: User signin.
3. **/update**: Update user profile.
4. **/bulk**: Auto-search in payment dashboard.
5. **/mybalance**: Retrieve balance of the signed-in user.
6. **/getid**: Retrieve document ID given the username.

### Account Related Routes
1. **/balance**: Retrieve user balance.
2. **/transfer**: Transfer funds from one user to another.
3. **/topup**: Top-up money in the wallet.

## Database

MongoDB is used as the database. There are two collections: `users` and `accounts`. Whenever a user signs up, an instance is created in both the `user` and `account` collections. An instance from the `account` collection consists of a field `userID` which references the document ID of the user.

