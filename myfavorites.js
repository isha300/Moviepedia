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
                        <div class="unfavorite-button-container" align="right">
                            <span id=${movie.id} class="heart"><i class="fa fa-heart" aria-hidden="true" ></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    return aCard;
};

export const renderPage = async function() {
    var db = firebase.firestore();
    let favorites = [];
    //GET USER'S FAVORITE MOVIES ID'S
    await firebase.auth().onAuthStateChanged(async function(user) {
        var docRef = db.collection("users").doc(user.email);
        docRef.get().then(async function(doc) {
            if (doc.exists) {
                favorites = doc.data().movies;
                for (let i = 0; i < favorites.length; i++) {
                    let movieObj = await axios({
                        method: 'get',
                        url: `https://api.themoviedb.org/3/movie/${favorites[i]}?api_key=780f46d1155fac9510be1f54ce452592&language=en-US`
                    });
                    $('#placeholder').append(renderCard(movieObj.data));
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    });
};

const handleLikeButtonPress = function(event) {
    $(event.target).closest('div.card-container').remove();
};

$(function() {
    renderPage();
    $("#placeholder").on("click", "span.heart", handleLikeButtonPress);
});