Template.communicationMain.rendered = function () {

  // initialize maazalik:malihu-jquery-custom-scrollbar scrollbar plugin
  var board = $("#communication-message-board-sleeve");
  board.mCustomScrollbar({
	  	theme:"one-dark",
	  	scrollbarPosition: "inside"
  });
  board.mCustomScrollbar("scrollTo","bottom");


}; 