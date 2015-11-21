'use strict';

$(document).ready(init);

function init(){
  $('#signupButton').click(signup);
  // $('#signin').click(signin);
}

// function signin(e){
//   e.preventDefault();
//
//
// }

function signup(e){
  e.preventDefault();

  var newUser = {};

  newUser.email = $('#signupEmail').val();
  newUser.password = $('#signupPassword1').val();
  var pwd2 = $('#signupPassword2').val();

  if (newUser.email && newUser.password && newUser.password === pwd2){
    $.post('/users/register', newUser)
    .done(function(authUser){
      window.location.replace(`/users/start/${authUser._id}`);
    })
    .fail(function(err){
      console.log(err);
      swal('Oops!', err.responseText, 'error')
    })
  }
}
