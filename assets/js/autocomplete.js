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
        let filtered = returned.filter(x => x.name.toLowerCase().startsWith(text.toLowerCase())); // filter results by starting words in query

        if (filtered.length === 0) {
            $(`#results`).replaceWith(`<div id="results"><div class="search-input searchResult" style="color:black">No results</div></div>`);
        } else if(filtered.length != 0) {
            // display results
            $(`#results`).replaceWith(`<div id="results" class="${filtered[0].id}"><button class="search-input searchResult">${filtered[0].name}</button></div>`);
            filtered.shift();

            // limit autocomplete options to six
            filtered.splice(0, filtered.length-5);

            filtered.forEach(x => $(`#results`).prepend(`<button class="search-input searchResult" class="${x.id}">${x.name}</button>`));
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

async function namePage(event) {
    let movies = await getMovies(event.currentTarget.className);
    $('.replace-container').replaceWith(`<div id="resultContainer"></div>`);
    // $("#resultContainer").append(renderCard(movies[0]));
    
    movies.forEach(m => $("#resultContainer").append(renderCard(m)));
}

const renderCard = function(movie) {
    let month = `${movie.release_date}`.slice(5,7);
    let year = `${movie.release_date}`.slice(0,4);
    let day = `${movie.release_date}`.slice(8,10);

    // let mid = `${movie.overview}`.replace(/([.?!])\s*(?=[A-Z])/g, "$1|");
    // let overview;
    // let i = 0;
    // for (let char of mid) {
    //     if (char == "|") {
    //         i++;
    //     } if (i == 2) {
    //         break;
    //     } else {
    //         overview += char;
    //     }
    // }



    // let overview = `${movie.overview}`.replace(/^(.{100}[^\s]*).*/, "$1");

    let nullCard = `<div data-id=${movie.id} class="card-container">
        <div class="float-layout">
            <div class="card-image">
                <img src="assets/img/no-poster.JPG"/>
                <div class="card">
                    <div class="card-desc">
                        <strong>${movie.title}</strong>
                        <p id="text" style="font-size:12px">${overview}</p>
                        <br>
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
                            <strong>${movie.title}</strong>
                            <p id="text" style="font-size:12px">${overview}</p>
                            <br>
                            <p>${month}/${day}/${year}</p>
                        </div>
                        <div class="like-button-container" align="right">
                            <span id=${movie.id} class="heart"><i class="fa fa-heart-o" aria-hidden="true" ></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    // let flipCard = `
    // <div data-id=${movie.id} class="flip-card card-container">
    //     <div class="flip-card-inner float-layout">
    //         <div class="flip-card-front">
    //             <div class="card-image">
    //                 <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
    //                 <div class="card">
    //                     <div class="card-desc">
    //                         <p>${movie.title}</p>
    //                     </div>
    //                     <div class="like-button-container" align="right">
    //                         <span id=${movie.id} class="heart"><i class="fa fa-heart-o" aria-hidden="true" ></i></span>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
            
    //         <div class="flip-card-back">
    //             <h1>Back info</h1>
    //         </div>
    //     </div>
    // </div>`;

    return (movie.poster_path === null) ? nullCard : card;
}

const handleLikeButtonPress = async function(event) {
    let id = $(event.target).closest('span').attr('id');
    if($(event.target).closest('span').children().filter('i').hasClass("fa-heart-o")){
        $(event.target).closest('i').removeClass("fa-heart-o");
        $(event.target).closest('i').addClass("fa-heart");
    }
    else{
        $(event.target).closest('i').removeClass("fa-heart");
        $(event.target).closest('i').addClass("fa-heart-o");
    }
};

$(function() {
    $("#searchBar").on("keyup", autocomplete);
    $("#resultContainer").on("click", "span.heart", handleLikeButtonPress);
});