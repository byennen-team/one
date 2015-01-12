Template.taskBoard.rendered = function () {
	var currentHeight = $(window).height();
  $('#communication-task-board').css( 'height', currentHeight - 70 + 'px' );
} 