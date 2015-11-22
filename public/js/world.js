'use strict';

$(document).ready(init);

function init(){
  $('#logout').click(logout);
  $('.img').click(goToHouse);
}

function goToHouse(e){
  var userId = $(this).data('id').toString();
  window.location.replace(`/homes/${userId}`)
}

function logout(e){
  e.preventDefault();
  $.post('/users/logout')
  .done(function(res){
    console.log(res);
    window.location.replace('/')
  })
  .fail(function(err){
    console.log(err);
    swal('Oops!', err.responseText, 'error');
  });
}
