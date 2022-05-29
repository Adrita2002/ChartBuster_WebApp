from matplotlib.style import use
import pandas as pd
import sys
import os
import json

sys.path.append(os.path.join(os.path.dirname(__file__), '../'))
f = open('movies.json')  
data = json.load(f)
# print(data)
movieRating = pd.read_csv('ML_Model/ratings.csv')
movieNames = pd.read_csv('ML_Model/movies.csv')
movieRating = pd.merge(movieRating,movieNames)
# print(movieRating.head())

user_ratings = movieRating.pivot_table(index=['userId'],columns = ['title'],values='rating')

# print(user_ratings.head())

#Remove Movies that have less than 10 users who rated it and fill remaining NaN with 0
user_ratings = user_ratings.dropna(thresh=10,axis=1).fillna(0)
# print(user_ratings.head())

#Pearson Correlation
item_similarity_df = user_ratings.corr(method='pearson')
# print(item_similarity_df.head(50))

def get_similarMovies(movieName, userRating):
    similarity_score = item_similarity_df[movieName]*(userRating-2.5)
    similarity_score = similarity_score.sort_values(ascending = False)
    return similarity_score

# user = [("20,000 Leagues Under the Sea (1954)",4),("2012 (2009)",3),("50 First Dates (2004)",1)]
user = data['movies']

similarMovies = pd.DataFrame()

for x in user:
  y = x[1:-1]
  print(y)
  splittedArray = y.split(',')
  splittedArrayLength = len(splittedArray)
  rating = int(y.split(',')[splittedArrayLength-1])
  movie = splittedArray[0]
  for i in range(1,splittedArrayLength-1):
    movie = movie + "," + splittedArray[i]
  similarMovies = similarMovies.append(get_similarMovies(movie, rating), ignore_index=True)
  similarMovies.head()
  print(similarMovies.sum().sort_values(ascending=False))
