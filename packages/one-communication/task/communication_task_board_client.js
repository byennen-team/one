Template.taskBoard.rendered = function () {
  // initialize maazalik:malihu-jquery-custom-scrollbar scrollbar plugin
  $("#communication-task-board-sleeve").mCustomScrollbar({
      theme:"one-light",
      scrollbarPosition: "inside"
  });

  console.log('task board rendered'); // DAVE: remove this
  Session.set( 'taskMenu', false );
};

Template.taskBoard.events({

  // Toggle task menu when a dot is clicked
  'click .dot': function () {
    var menuVisible = Session.get( 'taskMenu' );
    if( ! menuVisible ) {
      Session.set( 'taskMenu', true );
      $( '#communication-task-menu' ).velocity( "fadeIn", { duration: 300 });
    } else {
      Session.set( 'taskMenu', false );
      $( '#communication-task-menu' ).velocity( "fadeOut", { duration: 300 });
    }
  }

});