$(function() {
    $("#searchButton").on("click", search);
    $("#searchBar").on("keyup", autocomplete);
});

// API key: 780f46d1155fac9510be1f54ce452592
// https://api.themoviedb.org/3/search/person?api_key=780f46d1155fac9510be1f54ce452592&language=en-US&query={QUERY}&page=1&include_adult=false

const autocomplete = async function(event) {
    // retrieve typed text
    let text = document.getElementById("searchBar").value;

    if (!event.code.includes("Shift") && text !="") {
        let query = text.replace(/ /g, '%20'); // replace spaces with %20

        // search API for actor names
        let result = await axios({
            method: 'get',
            url: `https://api.themoviedb.org/3/search/person?api_key=780f46d1155fac9510be1f54ce452592&language=en-US&query=${query}&page=1&include_adult=false`
        });

        returned = result.data.results;
        let filtered = returned.filter(x => x.name.toLowerCase().startsWith(text.toLowerCase())); // filter results by starting words in query

        if (filtered.length === 0) {
            $(`#results`).replaceWith(`<div id="results"><div class="search-input searchResult">No results</div></div>`);
        } else if(filtered.length != 0) {
            // display results
            $(`#results`).replaceWith(`<div id="results"><button class="search-input searchResult">${filtered[0].name}</button></div>`);
            filtered.shift();

            // limit autocomplete options to six
            filtered.splice(0, filtered.length-5);

            filtered.forEach(x => $(`#results`).append(`<button class="search-input searchResult">${x.name}</button>`));
        }
    } else if (text == "") {
        $(`#results`).replaceWith(`<div id="results"></div>`);
    };
};

const search = function(event) {

};