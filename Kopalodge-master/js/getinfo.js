// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAPZdWdRzDHwyinXLFBSUSWfWDwvkZzF_M",
    authDomain: "kopa-stay.firebaseapp.com",
    databaseURL: "https://kopa-stay.firebaseio.com",
    projectId: "kopa-stay",
    storageBucket: "kopa-stay.appspot.com",
    messagingSenderId: "658458955460",
    appId: "1:658458955460:web:6bacdb772c105b5c2f8391",
    measurementId: "G-83YNDVYFCS"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


function isEmpty($element){
    if($element !== "" && $element !== null && $element !== undefined){
        return false;
    }
    else{
        return true;
    }
}
//let dbLink = firebase.database();

$(document).ready(function(){
  let added = new Date();
    added = added.toISOString().slice(0, 16);
 //   var uid = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
 $("#submit").click(function(){
  if($("#name").val() === ""){
                $("#name").focus();
                $(".error-name").show();
                return false;
            }
            else if($("#email").val() == "" || $("#email").val().indexOf("@") < 3){
                $("#email").focus();
                $(".error-email").show();
                return false;
            }

            else if ($("#phone").val() === "" || $("#phone").val().length < 11){
                $("#phone").focus();
                $(".error-phone").show();
                return false;
            }

  let statePos = Number($("#state").val()) - 1;
  let state = nigeria[statePos].state.name;
  let min = $(".slider-range-value-1").html();
  let max = $(".slider-range-value-2").html();
  let budget = min + " to " + max;
  if($("#desc").val() !== ""){
   let msgDesc = "Description: "+ $("#desc").val() + ".";
  }
  else msgDesc = "";
let wMsg = "Hello, I am "+$("#name").val()+" and I am looking for a "+
  $("#apartment").val() + " within the price range of "+budget+" in "+ $("#lga").val() + ", "+ state + "."+
  msgDesc;

  var uid = firebase.database().ref().child('userInfo').push().key;

 firebase.database().ref('userInfo/' + uid).set({
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
        $(".form-h1").html("Thanks for using our service <b>"+ $("#name").val()+ "</b>");
        let msg =  '<p class="alert alert-danger"><h3>Your information '+
        'could not be submitted due to technical issues.</h3></p>'+
          '<hr>'+
          '<p class="whatsapp">'+
          'You can get across to us on WhatsApp right away.'+
          '<br>'+ 
          '<a href="https://api.whatsapp.com/send?phone=2349038371598&text='+wMsg+'"'+
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
        $(".form-h1").html("Thanks for using our service <b>"+ $("#name").val()+"</b>");
        let msg =  '<p><h3>Your information has been submitted and you will get'+
        ' a response from us within <b>24 hours</b>. </h3></p>'+
                       '<hr>'+
                        '<p class="whatsapp">'+
                        'You can get across to us on WhatsApp right away.'+
                        '<br>'+ 
          '<a href="https://api.whatsapp.com/send?phone=2349038371598&text='+wMsg+'"'+
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