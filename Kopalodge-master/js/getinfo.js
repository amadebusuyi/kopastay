// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBfFBh2KDfWWyPaFLNusOtjUCcPQWapaw0",
    authDomain: "kato-me.firebaseapp.com",
    databaseURL: "https://kato-me.firebaseio.com",
    projectId: "kato-me",
    storageBucket: "kato-me.appspot.com",
    messagingSenderId: "466286957993",
    appId: "1:466286957993:web:cb6a430c57a29cce33a0b8",
    measurementId: "G-J0TSYQWEQW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


function isEmpty($element){
    if($element !== "" && $element !== null && $element !== undefined){
        return false;
    }
    else{
        return true;
    }
}
let dbLink = firebase.database();

$(document).ready(function(){
  let added = new Date();
    added = added.toISOString().slice(0, 16);
    var uid = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);

 $("#submit").click(function(){
  let statePos = Number($("#state").val()) - 1;
  let state = nigeria[statePos].state.name;
  let min = $(".slider-range-value-1").html();
  let max = $(".slider-range-value-2").html();
  let budget = min + " to " + max;
let wMsg = "Hello, I am "+$("#name").val()+" (Email: "+$("#email").val()+") and I am looking for a "+
  $("#apartment").val() + " within the price range of "+budget+" in "+ $("#lga").val() + ", "+ state + ". "+
  "Description: "+ $("#desc").val() + ".";

 dbLink.ref('kopastay/userInfo/' + uid).set({
  name : $("#name").val(),
  email : $("#email").val(),
  phone : $("#phone").val(),
  apartment: $("#apartment").val(),
  state: state,
  lga: $("#lga").val(),
  description: $("#desc").val(),
  budget: budget,
  added: added
  },
  function(error){
      if(error){
        $(".form-h1").html("Thanks for using our service "+ $("#name").val());
        let msg =  '<p class="alert alert-danger"><h3>Your information '+
        'could not be submitted due to technical issues.</h3></p>'+
          '<hr>'+
          '<p class="whatsapp">'+
          'You can get across to us on WhatsApp right away.'+
          '<br>'+ 
          '<a href="https://api.whatsapp.com/send?phone=08065348422&text='+wMsg+'"'+
          ' class="btn btn-success btn-lg">Message on'+
          ' WhatsApp</a>'+
          '</p>';
        alert("400");
        $("#feedback").html(msg)
        $('#apartment-details').hide();
        $('#personal-details').hide();
        $("#feedback").show();
      }
      else{ 
        $(".form-h1").html("Thanks for using our service "+ $("#name").val());
        let msg =  '<p><h3>Your information has been submitted and you will get'+
        ' a response from us within <b>24 hours</b>. </h3></p>'+
                       '<hr>'+
                        '<p class="whatsapp">'+
                        'You can get across to us on WhatsApp right away.'+
                        '<br>'+ 
          '<a href="https://api.whatsapp.com/send?phone=08065348422&text='+wMsg+'"'+
          ' class="btn btn-success btn-lg">Message on'+
          ' WhatsApp</a>'+
                        '</p>';  
        $("#feedback").html(msg);
        $('#apartment-details').hide();
        $('#personal-details').hide();
        $("#feedback").show();
      }
  });
});
})