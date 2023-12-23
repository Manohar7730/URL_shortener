URL Shortener Project
This project is a simple URL shortener that allows users to shorten long URLs into concise and shareable links. It includes user authentication features for personalized short URLs.

Table of Contents
Features
Technologies Used
Installation
Usage
API Documentation
Project Structure
Contributing
License
Features
User registration and authentication
URL shortening with personalized user accounts
View and manage shortened URLs in user profiles
Responsive and user-friendly interface
Technologies Used
Node.js
Express.js
MongoDB (Mongoose)
Passport.js (Local Authentication)
EJS (Embedded JavaScript)
Bootstrap (Front-end framework)
Nanoid (Unique ID generation)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/url_shortener.git
cd url_shortener
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root directory and add the following variables:

env
Copy code
MONGODB_ATLAS_URI=your_mongodb_uri
SESSION_SECRET=your_session_secret
PORT=8000
Replace your_mongodb_uri with your MongoDB Atlas connection string and set a unique SESSION_SECRET.

Run the application:

bash
Copy code
npm start
The application will be available at http://localhost:8000.

Usage
Register a new account or log in if you already have an account.
On the home page, enter the original URL you want to shorten and click "Shrink."
View your shortened URLs in your user profile.
Click on the shortened URLs to redirect to the original links.
Log out when finished.
API Documentation
Shorten a URL
Endpoint: /shorten
Method: POST
Request Body:
originalUrl (String): The original URL to be shortened.
Retrieve Original URL
Endpoint: /:shortId
Method: GET
Request Parameters:
shortId (String): The short ID of the URL.
Delete Shortened URL
Endpoint: /delete/:id
Method: POST
Request Parameters:
id (String): The ID of the shortened URL.
Project Structure
lua
Copy code
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
|-- public/
|   |-- styles/
|       |-- style.css
|-- routes/
|   |-- userRouter.js
|-- views/
|   |-- layouts/
|       |-- layout.ejs
|   |-- home.ejs
|   |-- login.ejs
|   |-- register.ejs
|   |-- profile.ejs
|-- .env
|-- .gitignore
|-- index.js
|-- package.json
|-- README.md
|-- ...
Contributing
Contributions are welcome! Feel free to open issues or pull requests.
