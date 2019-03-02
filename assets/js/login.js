var config = {
  apiKey: "AIzaSyDc09T-OmJie6bBbWkx0FWsPT9Mk10ROp0",
  authDomain: "happy-hour-proje-1551302378847.firebaseapp.com",
  databaseURL: "https://happy-hour-proje-1551302378847.firebaseio.com",
  projectId: "happy-hour-proje-1551302378847",
  storageBucket: "happy-hour-proje-1551302378847.appspot.com",
  messagingSenderId: "650709499185"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {// if user is logged in we show the login_div
     document.getElementById("user_div").style.display = "block";
     document.getElementById("login_div").style.display = "none";
     
     var user = firebase.auth().currentUser;
        if (user != null){
            var email_id = user.email;
            document.getElementById("user_param").innerHTML ="Current User: " + email_id;
            $('#log-out').show();
        }
   
    } else {// if user is not login we show the user_div
        // document.getElementById("user_div").style.display = "none";
        $('#user_div').hide(); // This does the same as above
        $('#log-out').hide();
        document.getElementById("login_div").style.display = "block";
        // $('#login_div').show(); **Gian you can use this too**
    }
  });
  

function login() {

    var userEmail = document.getElementById("input-email").value;
    var userPass = document.getElementById("input-password").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        // window.alert("Error :" + errorMessage);
        $('#server-error').text(errorMessage);
      });
}
function logout(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
}