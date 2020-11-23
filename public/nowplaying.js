export const renderCard = function(movie, favorites) {
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

export const renderCardNoHeart = function(movie) {
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

export const renderPage = async function() {
    let result = await axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=780f46d1155fac9510be1f54ce452592&language=en-US&page=1',
    });
    result = result.data.results;
    var db = firebase.firestore();
    firebase.auth().onAuthStateChanged(async function(user) {
        if (user) {
            var docRef = db.collection("users").doc(user.email);
            docRef.get().then(async function(doc) {
                let favorites = [];
                if (doc.exists) {
                    favorites = doc.data().movies;
                }
                for (let i=0; i<20; i++){
                    $('#placeholder').append(renderCard(result[i], favorites));
                }
                let result2 = await axios({
                    method: 'get',
                    url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=780f46d1155fac9510be1f54ce452592&language=en-US&page=2',
                });
                result2 = result2.data.results;
                for (let i=0; i<result2.length; i++){
                    $('#placeholder').append(renderCard(result2[i], favorites));
                }
                let result3 = await axios({
                    method: 'get',
                    url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=780f46d1155fac9510be1f54ce452592&language=en-US&page=3',
                });
                result3 = result3.data.results;
                for (let i=0; i<result3.length; i++){
                    $('#placeholder').append(renderCard(result3[i], favorites));
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        } else {
            for (let i=0; i<20; i++){
                $('#placeholder').append(renderCardNoHeart(result[i]));
            }
            let result2 = await axios({
                method: 'get',
                url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=780f46d1155fac9510be1f54ce452592&language=en-US&page=2',
            });
            result2 = result2.data.results;
            for (let i=0; i<result2.length; i++){
                $('#placeholder').append(renderCardNoHeart(result2[i]));
            }
            let result3 = await axios({
                method: 'get',
                url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=780f46d1155fac9510be1f54ce452592&language=en-US&page=3',
            });
            result3 = result3.data.results;
            for (let i=0; i<result3.length; i++){
                $('#placeholder').append(renderCardNoHeart(result3[i]));
            }
        }
    });
};

export const loadTab = function() {
    renderPage();
};

$(function() {
    loadTab();
});
