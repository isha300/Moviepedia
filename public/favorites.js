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
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
            $('.logout').show();
            $('.myfavorites').show();
            $('.like-button-container').show();
        } else {
            // No user is signed in.
            $('.loginSignup').show();
        }
    });
    $("#placeholder").on("click", "span.heart", handleLikeButtonPress);
    $('.logout').on("click", handleLogoutButtonPress);
});