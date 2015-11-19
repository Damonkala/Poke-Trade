'use strict'

$(document).ready(init);

function init(){
	$('#acceptTrade').click(acceptTrade);
}


function acceptTrade(){
	var tradeid = $('#newTrade').data('tradeid')
	console.log(tradeid);
	$.post('/trades/accept/' + tradeid)
	.done()
	.fail()

}
