'use strict';

$(document).ready(init);

function init(){
  $('#signupButton').click(signup);
  $('#signinButton').click(signin);
}

function signin(e){
  e.preventDefault();

  var user = {};
  user.email = $('#signinEmail').val();
  user.password = $('#signinPassword').val();
  console.log(user);
  if (user.email && user.password){
    $.post('/users/login', user)
    .done(function(authUser){
      window.location.replace(`/homes/${authUser._id}`);
    })
    .fail(function(err){
      console.log(err);
      swal('Oops!', err.responseText, 'error');
    });
  }
};

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
