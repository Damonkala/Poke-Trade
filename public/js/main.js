'use strict'

$(document).ready(init);

function init(){
  $('#createNewUser').click(createNewUser);
  $('#login').click(login);
  $('#logout').click(logout);
  $('#makeTrade').click(makeTrade);
  $('.homePokemon').click(highlightHomePokemon);
  $('.guestPokemon').click(highlightGuestPokemon);
  $('.home').click(visitHome);
}

function makeTrade(){
  var tradeInfo = {};
  tradeInfo.homePokemon = $(".homePokemonHighlighted h1").text();
  tradeInfo.guestPokemon = $(".guestPokemonHighlighted h1").text();
  if(tradeInfo.homePokemon && tradeInfo.guestPokemon){
    tradeInfo.homeownerId = $('.homePokemonHighlighted').data('id');
    tradeInfo.guestId = $('.guestPokemonHighlighted').data('id');
    $.post('/trades', tradeInfo)
    .done(function(data){
      console.log(data);
    })
    .fail(function(err){
      console.log(err);
    })
  }
}
function highlightHomePokemon () {
  $(this).toggleClass("homePokemonHighlighted");
}
function highlightGuestPokemon () {
  $(this).toggleClass("guestPokemonHighlighted");
}

function visitHome(){
  var username = $(this).attr('id')

  $.get(`/homes/${username}`)
  .done(function(data){
    var userHome = data.username;

    window.location.replace(`/homes/${username}`)
  }).fail(function(err){
    console.log(err);
  });
}

function login(event){
  event.preventDefault();

  var user = {};
  user.username = $('#username').val();
  user.password = $('#password').val();

  $.post('/users/login', user)
  .done(function(data){
    window.location.replace(`/homes/${user.username}`)
  }).fail(function(err){
    $('#username').val('');
    $('#password').val('');
    swal('Error:', err.responseText, 'error');
  });
}

function createNewUser(event){
  event.preventDefault();
  if( !$('#username').val() || !$('#password').val()){
    return;
  }
  if ($('#passconf').val() !== $('#newPassword').val() || $('#username') === null){
    // debugger;
    alert('Passwords do not match');
    return;
  }
  var newUser = {};
  newUser.username = $('#newUsername').val();
  newUser.password = $('#newPassword').val();
  newUser.startPokemon = $('input[name="startPokemon"]:checked').val()

  $.post('/users/register', newUser)
  .done(function(data){
    console.log(data);
  }).fail(function(err){
    console.log(err);
  });
}

function logout() {
  $.post('/users/logout')
  .done(function(){
    console.log('cookies erased')
    window.location.replace('/')
  })
  // .fail()
}
