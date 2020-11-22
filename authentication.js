var db = firebase.firestore();

function signup(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
        console.log(user);
        // Signed in 
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // handle error - alert user
        console.log("error");
        alert("error");
    });
}

function signin(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
        console.log(user);
        // let user1 = firebase.auth().currentUser;
        // if (user1) {
        //     document.getElementById('invalidLogin').style.display = "block";
        //     console.log(user1);
        // }
    })
    .catch((error) => {
        document.getElementById('invalidLogin').style.display = "block";
        var errorCode = error.code;
        var errorMessage = error.message;
    });
}

const handleJoinButtonPress = function(event) {
    event.preventDefault();
    let email = $(event.target).closest('form.signupForm').find('input.email')[0].value;
    let password = $(event.target).closest('form.signupForm').find('input.password')[0].value;
    signup(email, password);

    // firebase.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //         // User is signed in.
    //         //   console.log(user.uid);
    //         //   console.log(user.email);

    //         // ADD MOVIE ID TO DB FOR USER
    //         //   var userRef = db.collection('users').doc(user.email);
    //         //   userRef.set({
    //         //     movies: firebase.firestore.FieldValue.arrayUnion(531219)
    //         //   }, {merge: true});

    //         // GET USER'S FAVORITE MOVIES ID'S
    //         // var docRef = db.collection("users").doc(user.email);
    //         // docRef.get().then(function(doc) {
    //         //     if (doc.exists) {
    //         //         console.log("Document data:", doc.data());
    //         //     } else {
    //         //         // doc.data() will be undefined in this case
    //         //         console.log("No such document!");
    //         //     }
    //         // }).catch(function(error) {
    //         //     console.log("Error getting document:", error);
    //         // });
    //     } else {
    //       // No user is signed in.
    //     }
    // });
}

const handleLoginButtonPress = function(event) {
    event.preventDefault();
    let email = $(event.target).closest('form.loginForm').find('input.email')[0].value;
    let password = $(event.target).closest('form.loginForm').find('input.password')[0].value;
    document.getElementById('invalidLogin').style.display = "none";
    signin(email, password);
}

$(function() {
    $("form.signupForm").on("submit", handleJoinButtonPress);
    $("form.loginForm").on("submit", handleLoginButtonPress);
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          document.getElementById('loginBtn').style.display = "none";
        } else {
          // No user is signed in.
        }
    });
});