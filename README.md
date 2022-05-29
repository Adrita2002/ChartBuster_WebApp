# ChartBuster - Get Movie Recommendations
## Microsoft Engage 2022 Project - Track 3 (Algorithms)
 ChartBuster is a web application built to provide movie recommendations to a user on the basis of their likes and tastes.

## Features
 Recommendation of the most globally trending movies of the day along with display of their ratings.
 Users can filter movies on the basis of their favourite genres.
 Users can search for movies and provide star ratings and get movie recommendations on the basis of the ratings.

## Recommendation Engine
## Collaborative Filtering: 
The primary recommendation technique that is used in the website is Collaborative Filtering. This technique uses similarities between users and items simultaneously to provide recommendations. The recommendation system is based on explicit feedback from the user, i.e the user specifies how much they like the movie by providing star ratings.

## Pearson Coefficient Correlation
Pearson Coefficient correlation is used to calculate the similarity between the users and the items, i.e the movies. The Pearson correlation measures the strength of the linear relationship between two variables. It has a value between -1 to 1, with a value of -1 meaning a total negative linear correlation, 0 being no correlation, and + 1 meaning a total positive correlation.

## How to Run
1. Clone the repository - `git clone https://github.com/Adrita2002/ChartBuster_WebApp.git`
2. Open the repository directory in your terminal.
3. Move to client directory by - `cd client`
4. Run the command - `npm install`
5. API Key:
  For using the api of TMDB, we need an API. The API key can be generated from here. 
  Documentation to generate  TMDB API Key: https://developers.themoviedb.org/3/getting-started/introduction
  Once generated, a .env file is to be created inside the client folder and add an environment variable with the name. REACT_APP_API_KEY and use the api key there     (The API key is required in the Components/Pages/Movies/Movies.js and Components/Pages/Trending/Trending.js in the ‘src’ folder)
6. Start the client - `npm start`
7. Move to server directory by - `cd server`
8. Run the command - `npm install`
9. Start the server - `node server.js`

## Tech Stack
Frontend - ReactJS
Backend - NodeJS
ML Model - Python
API - TMDb API

## Demo Video
https://drive.google.com/file/d/1y87xc7Io8HUuMK9gq551HwQW2qgwLptp/view?usp=sharing





 
