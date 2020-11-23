// API key: 780f46d1155fac9510be1f54ce452592
// https://api.themoviedb.org/3/search/person?api_key=780f46d1155fac9510be1f54ce452592&language=en-US&query={QUERY}&page=1&include_adult=false
async function getName(name) {
    let query = name.replace(/ /g, '%20'); // replace spaces with %20

    // search API for actor names
    let result = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/search/person?api_key=780f46d1155fac9510be1f54ce452592&language=en-US&query=${query}&page=1&include_adult=false`
    });

    return result.data.results;
}; 

const autocomplete = async function(event) {
    // retrieve typed text
    let text = document.getElementById("searchBar").value;

    if (!event.code.includes("Shift") && text !="") {
        returned = await getName(text);

        // filter results by starting words and popularity in query
        let filtered = returned.filter(x => x.name.toLowerCase().startsWith(text.toLowerCase())); 

        filtered.sort(function(n1, n2) {
            return n2.popularity - n1.popularity;
        });

        if (filtered.length === 0) {
            $(`#results`).replaceWith(`<div id="results"><div class="search-input searchResult" style="color:black">No results</div></div>`);
        } else if(filtered.length != 0) {
            // display results
            $(`#results`).replaceWith(`<div id="results" class="${filtered[0].id}"><button class="search-input searchResult">${filtered[0].name}</button></div>`);
            filtered.shift();

            // limit autocomplete options to six
            filtered.splice(0, filtered.length-5);

            filtered.forEach(x => $(`#results`).append(`<button class="search-input searchResult" class="${x.id}">${x.name}</button>`));
        }
    } else if (text == "") {
        $(`#results`).replaceWith(`<div id="results"></div>`);
    };

    $("#results").on("click", namePage);

};

// Search result functions
async function getMovies(personId) {
    // search API for actor's movies
    let result = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=780f46d1155fac9510be1f54ce452592&language=en-US`
    });

    return result.data.cast;
}

const handleLikeButtonPress = async function(event) {
    var db = firebase.firestore();
    let id = $(event.target).closest('span').attr('id');
    id = parseInt(id);
    if($(event.target).closest('span').children().filter('i').hasClass("fa-heart-o")){
        $(event.target).closest('i').removeClass("fa-heart-o");
        $(event.target).closest('i').addClass("fa-heart");
        // favorite movie
        firebase.auth().onAuthStateChanged(function(user) {
            //ADD MOVIE ID TO DB FOR USER
            var userRef = db.collection('users').doc(user.email);
            userRef.set({
            movies: firebase.firestore.FieldValue.arrayUnion(id)
            }, {merge: true});
        });
    }
    else{
        $(event.target).closest('i').removeClass("fa-heart");
        $(event.target).closest('i').addClass("fa-heart-o");
        // unfavorite movie
        firebase.auth().onAuthStateChanged(function(user) {
            //REMOVE MOVIE ID TO DB FOR USER
            var userRef = db.collection('users').doc(user.email);
            userRef.update({
                movies: firebase.firestore.FieldValue.arrayRemove(id)
            });
        });
    }
};

async function namePage(event) {
    // get movie names
    let movies = await getMovies(event.currentTarget.className);

    // sort movies by popularity
    movies.sort(function(m1, m2) {
        return m2.popularity - m1.popularity;
    });    

    // replace search bar with results
    $('.replace-container').replaceWith(`<div id="resultContainer"></div>`);
    var db = firebase.firestore();
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var docRef = db.collection("users").doc(user.email);
            docRef.get().then(function(doc) {
                let favorites = [];
                if (doc.exists) {
                    favorites = doc.data().movies;
                }
                movies.forEach(m => $("#resultContainer").append(renderCard(m, favorites)));
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        } else {
            movies.forEach(m => $("#resultContainer").append(renderCardNoHeart(m)));
        }
    });
    $("#resultContainer").on("click", "span.heart", handleLikeButtonPress);
}

const renderCard = function(movie, favorites) {
    let favorited = favorites.includes(movie.id);
    let month = `${movie.release_date}`.slice(5,7);
    let year = `${movie.release_date}`.slice(0,4);
    let day = `${movie.release_date}`.slice(8,10);

    let title = `${movie.title}`.replace(/^(.{32}[^\s]*).*/, "$1" + "...");
    let overview = `${movie.overview}`.replace(/^(.{170}[^\s]*).*/, "$1" + "...");
    if (favorited) {
        let nullCard = `<div data-id=${movie.id} class="card-container">
        <div class="float-layout">
            <div class="card-image">
                <img src="assets/img/no-poster.JPG"/>
                <div class="card">
                    <div class="card-desc">
                        <strong>${title}</strong>
                        <p id="text" style="font-size:12px; color: #816058;">${overview}</p>
                    </div>
                    <div class="release-date" align="left">
                            <p>${month}/${day}/${year}</p>
                    </div>
                    <div class="like-button-container" align="right">
                        <span id=${movie.id} class="heart"><i class="fa fa-heart" aria-hidden="true" ></i></span>
                    </div>
                </div>
            </div>
        </div>
        </div>`;

        let card = `
            <div data-id=${movie.id} class="card-container">
                <div class="float-layout">
                    <div class="card-image">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                        <div id="card" class="card">
                            <div class="card-desc">
                                <strong>${title}</strong>
                                <p id="text" style="font-size:12px; color: #816058;">${overview}</p>
                            </div>
                            <div class="release-date" align="left">
                                <p>${month}/${day}/${year}</p>
                            </div>
                            <div class="like-button-container" align="right">
                                <span id=${movie.id} class="heart"><i class="fa fa-heart" aria-hidden="true" ></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        
        return (movie.poster_path === null) ? nullCard : card;
    } else {
        let nullCard = `<div data-id=${movie.id} class="card-container">
        <div class="float-layout">
            <div class="card-image">
                <img src="assets/img/no-poster.JPG"/>
                <div class="card">
                    <div class="card-desc">
                        <strong>${title}</strong>
                        <p id="text" style="font-size:12px; color: #816058;">${overview}</p>
                    </div>
                    <div class="release-date" align="left">
                            <p>${month}/${day}/${year}</p>
                    </div>
                    <div class="like-button-container" align="right">
                        <span id=${movie.id} class="heart"><i class="fa fa-heart-o" aria-hidden="true" ></i></span>
                    </div>
                </div>
            </div>
        </div>
        </div>`;

        let card = `
            <div data-id=${movie.id} class="card-container">
                <div class="float-layout">
                    <div class="card-image">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                        <div id="card" class="card">
                            <div class="card-desc">
                                <strong>${title}</strong>
                                <p id="text" style="font-size:12px; color: #816058;">${overview}</p>
                            </div>
                            <div class="release-date" align="left">
                                <p>${month}/${day}/${year}</p>
                            </div>
                            <div class="like-button-container" align="right">
                                <span id=${movie.id} class="heart"><i class="fa fa-heart-o" aria-hidden="true" ></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        
        return (movie.poster_path === null) ? nullCard : card;
    }
};

const renderCardNoHeart = function(movie) {
    let month = `${movie.release_date}`.slice(5,7);
    let year = `${movie.release_date}`.slice(0,4);
    let day = `${movie.release_date}`.slice(8,10);

    let title = `${movie.title}`.replace(/^(.{32}[^\s]*).*/, "$1" + "...");
    let overview = `${movie.overview}`.replace(/^(.{170}[^\s]*).*/, "$1" + "...");

    let nullCard = `<div data-id=${movie.id} class="card-container">
        <div class="float-layout">
            <div class="card-image">
                <img src="assets/img/no-poster.JPG"/>
                <div class="card">
                    <div class="card-desc">
                        <strong>${title}</strong>
                        <p id="text" style="font-size:12px; color: #816058;">${overview}</p>
                    </div>
                    <div class="release-date" align="left">
                            <p>${month}/${day}/${year}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    let card = `
        <div data-id=${movie.id} class="card-container">
            <div class="float-layout">
                <div class="card-image">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                    <div id="card" class="card">
                        <div class="card-desc">
                            <strong>${title}</strong>
                            <p id="text" style="font-size:12px; color: #816058;">${overview}</p>
                        </div>
                        <div class="release-date" align="left">
                            <p>${month}/${day}/${year}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    
    return (movie.poster_path === null) ? nullCard : card;
};

$(function() {
    $("#searchBar").on("keyup", autocomplete);
});