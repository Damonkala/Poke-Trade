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
  $('#generatePokemon').click(generatePokemon);
}

function generatePokemon() {
  let pokedex;

  $.get('https://pokeapi.co/api/v1/pokedex/1/')
    .done(function(data){
      pokedex = data;
          // var intervalID = window.setInterval(function(){
          //   generatePokemon();
          //
          // }, 5000);
          //
          // window.setTimeout(function(){
          //   window.clearInterval(intervalID);
          // }, 50000);

      let randomPokemonNumber = Math.floor(Math.random() * 778);
      let randomPokemonName = pokedex.pokemon[randomPokemonNumber].name;

      let pokemonData = 'https://pokeapi.co/' + pokedex.pokemon[randomPokemonNumber].resource_uri;

      $.get(pokemonData)
        .done(function(data){

            // let $attack = $('<p>').text('Attack Power: ' + data.attack);
            // let $defense = $('<p>').text('Defense Power: ' + data.defense);
            // let $hp = $('<p>').text('HP: ' + data.hp);

        let pokemonSprite = 'https://pokeapi.co/' + data.sprites[0].resource_uri;

        $.get(pokemonSprite)
          .done(function(data){
            let $pokemonImage = $('<img>').attr('src', 'https://pokeapi.co/' + data.image);
            // let pokemonLocation = Math.floor(Math.random() * 120);
            let $pokemonName = $('<h1>').text(randomPokemonName);

            $('#pokemonArea').append($pokemonImage, $pokemonName);
            var newPokemon = {};
            newPokemon.name = randomPokemonName;
            newPokemon.image = 'http://pokeapi.co/' + data.image;
            var username = $('#username').data('username');

            $.post('/users/pokemon/' + username, newPokemon)
            .done(function(data){
              console.log(data);
            })
            .fail(function(err){
              console.log(err);
            })
            // pokemonRef.child(randomPokemonName).set({
            //   name: randomPokemonName,
            //   number: randomPokemonNumber,
            //   image: pokemonImage,
            //   position: pokemonLocation
            // });



          }).fail(function(error){
            console.log('Failed at sprite retrieval. Error: ', error);
          });

      }).fail(function(err){
        console.log('Failed at pokemon retrieval. Error: ', error);
      });

  }).fail(function(err){
    console.log('Failed at pokedex. Error: ', error);
  });

}

function makeTrade(){
  var tradeInfo = {};
  tradeInfo.homePokemon = $(".homePokemonHighlighted h1").text();
  tradeInfo.guestPokemon = $(".guestPokemonHighlighted h1").text();
  if(tradeInfo.homePokemon && tradeInfo.guestPokemon){
    tradeInfo.homeownerId = $('.homePokemonHighlighted').data('id');
    tradeInfo.guestId = $('.guestPokemonHighlighted').data('id');
    tradeInfo.guestName = $('.guestPokemonHighlighted').data('name');
    $.post('/trades', tradeInfo)
    .done(function(data){
      console.log(data);
      swal('HUZAH!', "Your trade has been requested", 'success')
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
  if( !$('#newUsername').val() || !$('#newPassword').val()){
    return;
  }
  if ($('#passconf').val() !== $('#newPassword').val()){
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
    $.post('/users/login', newUser)
    .done(function(data){
      window.location.replace(`/homes/${newUser.username}`)
    }).fail(function(err){
      $('#username').val('');
      $('#password').val('');
      swal('Error:', err.responseText, 'error');
    });
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
