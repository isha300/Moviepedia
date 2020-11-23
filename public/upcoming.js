export const renderCard = function(movie) {
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
};

export const renderPage = async function() {
    let result = await axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=780f46d1155fac9510be1f54ce452592&language=en-US&page=1',
    });
    result = result.data.results;
    // var db = firebase.firestore();
    // let favorites = [];
    // firebase.auth().onAuthStateChanged(function(user) {
    //     var docRef = db.collection("users").doc(user.email);
    //     docRef.get().then(function(doc) {
    //         if (doc.exists) {
    //             favorites = doc.data().movies;
    //         }
    //         console.log(favorites);
    //         for (let i=0; i<20; i++){
    //             $('#placeholder').append(renderCard(result[i], favorites));
    //         }
    //     }).catch(function(error) {
    //         console.log("Error getting document:", error);
    //     });
    // });
    for (let i=0; i<20; i++){
        $('#placeholder').append(renderCard(result[i]));
    }
    let result2 = await axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=780f46d1155fac9510be1f54ce452592&language=en-US&page=2',
    });
    result2 = result2.data.results;
    for (let i=0; i<result2.length; i++){
        $('#placeholder').append(renderCard(result2[i]));
    }
    let result3 = await axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=780f46d1155fac9510be1f54ce452592&language=en-US&page=3',
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
