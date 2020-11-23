export const renderCard = function(movie) {
    let month = `${movie.release_date}`.slice(5,7);
    let year = `${movie.release_date}`.slice(0,4);
    let day = `${movie.release_date}`.slice(8,10);

    let overview = `${movie.overview}`.replace(/^(.{200}[^\s]*).*/, "$1" + "...");
    let aCard = `
            <div data-id=${movie.id} class="card-container">
            <div class="float-layout">
                <div class="card-image">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                    <div id="card" class="card">
                        <div class="card-desc">
                            <strong>${movie.title}</strong>
                            <p id="text" style="font-size:12px; color: #816058;">${overview}</p>
                            
                            <p>${month}/${day}/${year}</p>
                        </div>
                        <div class="like-button-container" align="right">
                            <span id=${movie.id} class="heart"><i class="fa fa-heart-o" aria-hidden="true" ></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    return aCard;
};

export const renderPage = async function() {
    let result = await axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=780f46d1155fac9510be1f54ce452592&language=en-US&page=1',
    });
    result = result.data.results;
    for (let i=0; i<result.length; i++){
        $('#placeholder').append(renderCard(result[i]));
    }
    let result2 = await axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=780f46d1155fac9510be1f54ce452592&language=en-US&page=2',
    });
    result2 = result2.data.results;
    for (let i=0; i<result2.length; i++){
        $('#placeholder').append(renderCard(result2[i]));
    }
    let result3 = await axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=780f46d1155fac9510be1f54ce452592&language=en-US&page=3',
    });
    result3 = result3.data.results;
    for (let i=0; i<result3.length; i++){
        $('#placeholder').append(renderCard(result3[i]));
    }
};

export const loadTab = function() {
    renderPage();
};

$(function() {
    loadTab();
});
