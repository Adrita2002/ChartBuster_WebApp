from matplotlib.style import use
import pandas as pd

movieRating = pd.read_csv('./ratings.csv')
movieNames = pd.read_csv('./movies.csv')
movieRating = pd.merge(movieRating,movieNames)
# print(movieRating.head())

user_ratings = movieRating.pivot_table(index=['userId'],columns = ['title'],values='rating')

# print(user_ratings.head())

#Remove Movies that have less than 10 users who rated it and fill remaining NaN with 0
user_ratings = user_ratings.dropna(thresh=10,axis=1).fillna(0)
print(user_ratings.head())

#Pearson Correlation
item_similarity_df = user_ratings.corr(method='pearson')
print(item_similarity_df.head(50))

def get_similarMovies(movieName, userRating):
    similarity_score = item_similarity_df[movieName]*(userRating-2.5)
    similarity_score = similarity_score.sort_values(ascending = False)
    return similarity_score

user = [("20,000 Leagues Under the Sea (1954)",2),("2012 (2009)",3),("50 First Dates (2004)",4)]

similarMovies = pd.DataFrame()

for movie, rating in user:
    similarMovies = similarMovies.append(get_similarMovies(movie, rating), ignore_index=True)

    similarMovies.head()
    print(similarMovies.sum().sort_values(ascending=False))