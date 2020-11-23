var db = firebase.firestore();

function signup(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
        window.location.href = "index.html";
    })
    .catch((error) => {
        document.getElementById('invalidSignup').style.display = "block";
    });
}

function signin(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
        window.location.href = "index.html";
    })
    .catch((error) => {
        document.getElementById('invalidLogin').style.display = "block";
    });
}

const handleJoinButtonPress = function(event) {
    event.preventDefault();
    let email = $(event.target).closest('form.signupForm').find('input.email')[0].value;
    let password = $(event.target).closest('form.signupForm').find('input.password')[0].value;
    signup(email, password);
}

const handleLoginButtonPress = function(event) {
    event.preventDefault();
    let email = $(event.target).closest('form.loginForm').find('input.email')[0].value;
    let password = $(event.target).closest('form.loginForm').find('input.password')[0].value;
    signin(email, password);
}

$(function() {
    $("form.signupForm").on("submit", handleJoinButtonPress);
    $("form.loginForm").on("submit", handleLoginButtonPress);
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
        } else {
          // No user is signed in.
        }
    });
});