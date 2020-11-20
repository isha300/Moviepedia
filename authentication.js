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
});