'use strict'

$(document).ready(init);

function init(){
	$('#acceptTrade').click(acceptTrade);
}


function acceptTrade(){
	var tradeid = $('#newTrade').data('tradeid')
	console.log(tradeid);
	$.post('/trades/accept/' + tradeid)
	.done(function(data){
		swal('HUZAH!', "Your trade has been accepted", 'success')
		$('#startPokemon').text(data);
		$('#button1').remove();

	})
	.fail()

}
