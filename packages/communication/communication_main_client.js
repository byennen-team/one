Template.communicationMain.rendered = function () {

 //  var data = new ReactiveDict;

 //  var updateWindowSize = function () {
 //    data.set("width", $(window).width() );
 //    data.set("height", $(window).height() );
 //  };
 //  updateWindowSize();
 //  window.addEventListener("resize", updateWindowSize);

 //  var windowSize = function () {
 //    return {
 //      width: data.get("width"),
 //      height: data.get("height")
 //    };
 //  };

	// // Bumps the Communication hub down below the header
	// var currentHeight = $(window).height();
 //  // var currentHeight = windowSize();
 //  console.log(currentHeight.height);
 //  $('#communication-main').css( 'height', currentHeight.height - 55 + 'px' );

  // initialize maazalik:malihu-jquery-custom-scrollbar scrollbar plugin
  $("#communication-task-board").mCustomScrollbar({
	  	theme:"one-light",
	  	scrollbarPosition: "inside"
  });

  var board = $("#communication-message-board-sleeve");
  board.mCustomScrollbar({
	  	theme:"one-dark",
	  	scrollbarPosition: "inside"
  });
  board.mCustomScrollbar("scrollTo","bottom");


} 