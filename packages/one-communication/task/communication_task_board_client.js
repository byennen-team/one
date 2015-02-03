Template.taskBoard.rendered = function () {
  // initialize maazalik:malihu-jquery-custom-scrollbar scrollbar plugin
  $("#communication-task-board-sleeve").mCustomScrollbar({
      theme:"one-light",
      scrollbarPosition: "inside"
  });

};

Template.taskBoard.events({

  // Show task menu when a dot is clicked
  'click .dot': function ( event ) {
    // Set caret height
    var $this = $( event.currentTarget );
    var position = $this.offset();
    $( "#task-menu-caret" ).css( 'top', ( position.top - 89 ) + "px" );

    // show menu
    $( '#task-menu, #task-menu-clear' ).velocity( "fadeIn", { duration: 300 });
  }

});