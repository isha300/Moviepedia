# My Moviepedia


My Moviepedia Web Application: https://mymoviepedia.web.app/

This is a web application that allows users to input the name of an actor/actress and get their filmography returned in order of popularity. The Now Playing tab shows which movies are released in theaters and the Upcoming tab shows which movies are being released soon. The web application allows users to make an account and favorite movies that can be viewed later in their My Favorites tab.

# Technology Used

HTML, CSS, Javascript, Bootstrap, Firebase, Cloud Firestore

# API 
API Used: https://developers.themoviedb.org/3/

API Calls
For the Now Playing tab: https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1

For the Upcoming tab: https://api.themoviedb.org/3/movie/upcoming?api_key=<<api_key>>&language=en-US&page=1

For the Search Autocomplete: https://api.themoviedb.org/3/search/person?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

To retrieve movie by ID: https://api.themoviedb.org/3/find/{external_id}?api_key=<<api_key>>&language=en-US&external_source=imdb_id

To retrieve filmography by actor: https://api.themoviedb.org/3/person/{person_id}/movie_credits?api_key=<<api_key>>&language=en-US

# Backend

Firebase authentication was used for Moviepedia's login and sign up system to allow users to create accounts with an email and password. Cloud Firestore was used as the backend for the app, storing a document for each user containing an array of favorited movie IDs within a database collection of users. Favoriting a movie appended that movie's ID to the respective user's array in the backend, and unfavoriting deleted the movie object from the backend. The user's My Favorites tab read this data from Firestore to render favorited movies. 
