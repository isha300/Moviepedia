function initializeFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyA7mn9OBzEaqnMZG7BvMKiIfVaqHsNCKeA",
        authDomain: "moviepedia-dc067.firebaseapp.com",
        databaseURL: "https://moviepedia-dc067.firebaseio.com",
        projectId: "moviepedia-dc067",
        storageBucket: "moviepedia-dc067.appspot.com",
        messagingSenderId: "397029448180",
        appId: "1:397029448180:web:8a816a5b2ef85d33d5c1a1"
    };
    firebase.initializeApp(firebaseConfig);
}

export const renderCard = function(movie) {
    let month = `${movie.release_date}`.slice(5,7);
    let year = `${movie.release_date}`.slice(0,4);
    let day = `${movie.release_date}`.slice(8,10);

    let overview = `${movie.overview}`.replace(/^(.{170}[^\s]*).*/, "$1" + "...");
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
                        <div class="unfavorite-button-container" align="right">
                            <span id=${movie.id} class="heart"><i class="fa fa-heart" aria-hidden="true" ></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    // let aCard = `
    //     <div data-id=${movie.id} class="card-container">
    //         <div class="float-layout">
    //             <div class="card-image">
    //                 <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
    //                 <div class="card">
    //                     <div class="card-desc">
    //                         <p>${movie.title}</p>
    //                     </div>
    //                     <div class="unfavorite-button-container" align="right">
    //                         <span id=${movie.id} class="heart"><i class="fa fa-heart" aria-hidden="true" ></i></span>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>`
    return aCard;
};

export const renderPage = async function() {
    var db = firebase.firestore();
    let favorites = [];
    //GET USER'S FAVORITE MOVIES ID'S
    firebase.auth().onAuthStateChanged(async function(user) {
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
    var db = firebase.firestore();
    let id = $(event.target).closest('span').attr('id');
    id = parseInt(id);

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
    $(event.target).closest('div.card-container').remove();
};

const handleLogoutButtonPress = function(event) {
    event.preventDefault();
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location.href="index.html";
      }).catch(function(error) {
        // An error happened.
    });
}

$(function() {
    initializeFirebase();
    renderPage();
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
            $('.logout').show();
            $('.myfavorites').show();
            $('.like-button-container').show();
        }
    });
    $("#placeholder").on("click", "span.heart", handleLikeButtonPress);
    $('.logout').on("click", handleLogoutButtonPress);
});