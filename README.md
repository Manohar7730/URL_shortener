
# [URL Shortener Project](https://url-shortener-aey6.onrender.com) <-- Explore

[Hoisting Link]

This project is a simple URL shortener that allows users to shorten long URLs into concise and shareable links. It includes user authentication features for personalized short URLs.


## Demo
![preview](https://github.com/Manohar7730/URL_shortener/assets/120391462/46417787-9974-4837-a7e6-aff054a3c5fa)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [API Documentation](#api-doc)
- [Contributing](#contributing)
- [Author](#author)
- [Feedback](#feedback)

## Features
<a name="features"></a>

- User registration and authentication
- URL shortening with personalized user accounts
- Submit long URLs and generate a short alias
- Access short URL and get redirected to original URL
- View and manage shortened URLs in user profiles
- Display all generated short URLs for a user
- Delete existing short URLs


## Technologies Used
<a name="technologies-used"></a>

- Node.js
- Express.js
- MongoDB (Mongoose)
- Passport.js (Local Authentication)
- EJS (Embedded JavaScript)
- Bootstrap (Front-end framework)
- Nanoid (Unique ID generation)
- BcryptJS (Password hasing)
- Joi (Input validation)


## Installation
<a name="installation"></a>

1) Clone the repository:

```bash
    git clone https://github.com/your-username/url_shortener.git
    cd url_shortener
```

2) Install dependencies:

```bash
    npm install
```

3) Set up environment variables:

Create a .env file in the root directory and add the following variables:

```bash
    MONGODB_ATLAS_URI=your_mongodb_uri
    SESSION_SECRET=your_session_secret
```
Replace your_mongodb_uri with your MongoDB Atlas connection string and set a unique SESSION_SECRET.

4) Run the application:

```bash
    npm start
```
## Project Struture
<a name="project-structure"></a>

```bash
url_shortener/
|-- config/
|   |-- mongoose.js
|   |-- passportLocal.js
|-- controllers/
|   |-- shortUrlController.js
|   |-- userController.js
|-- models/
|   |-- urlShortener.js
|   |-- user.js
|-- routes/
|   |-- userRouter.js
|-- views/
|   |-- layout.ejs
|   |-- home.ejs
|   |-- login.ejs
|   |-- register.ejs
|   |-- profile.ejs
|-- .env
|-- .gitignore
|-- index.js
|-- package.json
|-- README.md
```

## Usage
<a name="usage"></a>

1) Register a new account or log in if you already have an account.
2) On the home page, enter the original URL you want to shorten and click "Shrink."
3) View your shortened URLs in your user profile.
4) Click on the shortened URLs to redirect to the original links.
5) Log out when finished.


## Screenshots
<a name="screenshots"></a>

![Screenshot 2023-12-23 145028](https://github.com/Manohar7730/URL_shortener/assets/120391462/8b2c2995-a74f-4fd5-86d3-f35be1c4881c)

![Screenshot 2023-12-23 145114](https://github.com/Manohar7730/URL_shortener/assets/120391462/34c2074c-1f7c-474d-a553-ddecc16deb3b)


## API Documentation
<a name="api-doc"></a>

Before using the API endpoints that require authentication, such as shortening a URL or deleting a shortened URL, users need to log in and obtain a session cookie. Follow the steps below to authenticate and use the API:

### 1. Log In to Obtain Session Cookie

#### Endpoint: `/signIn`
#### Method: POST

Use this endpoint to simulate a user logging in. Provide valid credentials for an existing user in your database. If you don't have a user registered, you can use the registration route (`/signUp`) first.

**Request:**

- **Method:** POST
- **URL:** `http://localhost:8000/signIn`
- **Body (form-data or x-www-form-urlencoded):**
  - `username: (user's username)`
  - `password: (user's password)`

**Response:**

If the login is successful, you should receive a response that includes a session cookie. Copy the session cookie from the response headers. You can find this in the "Cookies" section of the response headers.

### 2. Use Session Cookie in API Requests

Now that you have obtained the session cookie, use it in your subsequent requests, including the ones below:

### Shorten a URL

#### Endpoint: `/shorten`
#### Method: POST

**Request:**

- **Method:** POST
- **URL:** `http://localhost:8000/shorten`
- **Headers:**
  - `Cookie: (Paste the session cookie here)`
- **Body (JSON):**
  ```json
  {
      "originalUrl": "https://www.youtube.com/watch?v=Z1QuBXVrUHU&ab_channel=HombaleFilms"
  }

### Retrieve Original URL

#### Endpoint: /:shortId
#### Method: GET

**Request:**

- **Method:** GET
- **URL:** http://localhost:8000/:shortId
- **Headers:**
    - `Cookie: (Paste the session cookie here)`

### Delete Shortened URL
#### Endpoint: /delete/:id
#### Method: POST

**Request:**

- **Method:** POST
- **URL:** http://localhost:8000/delete/:id
- **Headers:**
    - `Cookie: (Paste the session cookie here)`
- **Request Parameters:**
    `id (String): The ID of the shortened URL`


## Contributing
<a name="contributing"></a>

Contributions are always welcome!Feel free to open issues or pull requests.


## Authors
<a name="author"></a>

- [@Manohar7730](https://github.com/Manohar7730)

## Feedback
<a name="feedback"></a>

If you have any feedback, please reach out to us at manohar20century@gmail.com


