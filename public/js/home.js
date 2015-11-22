'use strict';

$(document).ready(init);


var pokedex = localStorage.pokedex ? JSON.parse(localStorage.pokedex) : undefined;

function init(){
  if (!pokedex){
    $.get('http://pokeapi.co/api/v1/pokedex/1/')
    .done(function(data){
      console.log(data);
      localStorage.pokedex = JSON.stringify(data);
      pokedex = data;
    })
    .fail(function(err){
      console.log(err);
    })
  }

  getpokemon();

  $('.viewInfo').click(viewInfo);
  $('#logout').click(logout);
  $('#worldMap').click(worldMap);
}

function getpokemon(){
  $('.pokemon').each(function(i, userPokemon){
    var pokemonName = userPokemon.textContent;
    var index = pokedex.pokemon.find(function(elem){
        if (elem.name === pokemonName){
          return elem;
        }
      }).resource_uri.split('/');
    index = index[index.length-2];
    var $pokemonImage = $('<img>').attr('src', `http://pokeapi.co/media/img/${index}.png`);
    $(this).append($pokemonImage);
  });
}

function worldMap(){
  window.location.replace('/homes/world');
}

function viewInfo() {
  $('.display').hide();
  var index = $(this).index() + 1;
  $('#displayArea').show();
  $(`.display:nth-child(${index})`).show();
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
