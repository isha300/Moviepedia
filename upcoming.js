export const renderCard = function(movie) {
    let aCard = `
        <div data-id=${movie.id} class="card-container">
            <div class="float-layout">
                <div class="card-image">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                    <div class="card">
                        <div class="card-desc">
                            <p>${movie.title}</p>
                        </div>
                        <div class="like-button-container" align="right">
                            <span id=${movie.id} class="heart"><i class="fa fa-heart-o" aria-hidden="true" ></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    return aCard;
};

export const renderPage = async function() {
    let result = await axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=780f46d1155fac9510be1f54ce452592&language=en-US&page=1',
    });
    result = result.data.results;
    for (let i=0; i<20; i++){
        $('#placeholder').append(renderCard(result[i]));
    }
};

export const handleLikeButtonPress = async function(event) {
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

export const loadTab = function(tweets) {
    renderPage();
    $("#placeholder").on("click", "span.heart", handleLikeButtonPress);
};

$(function() {
    loadTab();
});
