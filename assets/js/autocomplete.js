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
            $(`#results`).replaceWith(`<div id="results"><div class="search-input searchResult">No results</div></div>`);
        } else if(filtered.length != 0) {
            // display results
            $(`#results`).replaceWith(`<div id="results" class="name" name="${filtered[0].name}"><button class="search-input searchResult">${filtered[0].name}</button></div>`);
            filtered.shift();

            // limit autocomplete options to six
            filtered.splice(0, filtered.length-5);

            filtered.forEach(x => $(`#results`).append(`<button class="search-input searchResult" class="name" name="${x.name}">${x.name}</button>`));
        }
    } else if (text == "") {
        $(`#results`).replaceWith(`<div id="results"></div>`);
    };
};

// API key: 780f46d1155fac9510be1f54ce452592
// https://api.themoviedb.org/3/search/person?api_key=780f46d1155fac9510be1f54ce452592&language=en-US&query={QUERY}&page=1&include_adult=false
async function namePage(event) {
    let window = window.open("result.html", windowName, [windowFeatures]);
    // console.log(event.target.firstChild.data);

    let result = await getName(event.target.firstChild.data);

    // let image = result[0].known_for[0].backdrop_path;
    // $(`#results`).replaceWith(`<img src="${image}">`);

    // window.location.href="result.html";

    $(".float-layout").replaceWith(`<p>Hello</p>`);

    let length = result[0].known_for.length;


    console.log();
    console.log(result[0].known_for);
    // let aCard = `
    //     <div data-id=${movie.id} class="card-container">
    //         <div class="float-layout">
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
    //     </div>`

    // return aCard;
}

$(function() {
    // $("#searchButton").on("click", search);
    $("#searchBar").on("keyup", autocomplete);
    $(".name").on("click", namePage);
});