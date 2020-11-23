# Moviepedia


My Moviepedia Web Application: https://mymoviepedia.web.app/

This is a web application that allows users to input the name of an actor/actress and get their filmography returned in order of popularity. The Now Playing tab shows which movies are released in theaters and the Upcoming tab shows which movies are being released soon. The web application allows users to make an account and favorite movies that can be viewed later in their My Favorites tab.  

# API 
API Used: https://developers.themoviedb.org/3/
API Calls
For the Now Playing tab: https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1

For the Upcoming tab: https://api.themoviedb.org/3/movie/upcoming?api_key=<<api_key>>&language=en-US&page=1

For the Search Autocomplete: https://api.themoviedb.org/3/search/person?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

To retrieve movie by ID: https://api.themoviedb.org/3/find/{external_id}?api_key=<<api_key>>&language=en-US&external_source=imdb_id

To retrieve filmography by actor: https://api.themoviedb.org/3/person/{person_id}/movie_credits?api_key=<<api_key>>&language=en-US

# Technology Used

Bootstrap, HTML, CSS, Javascript, Firebase, Cloud Firestore
