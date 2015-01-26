Template.taskBoard.rendered = function () {
  // initialize maazalik:malihu-jquery-custom-scrollbar scrollbar plugin
  $("#communication-task-board-sleeve").mCustomScrollbar({
      theme:"one-light",
      scrollbarPosition: "inside"
  });

  console.log('task board rendered'); // DAVE: remove this

  // TODO: Remove this, if we don't need to use Session
  // Session.set( 'taskMenu', false );
};

Template.taskBoard.events({

  // Toggle task menu when a dot is clicked
  'click .dot': function () {
    $( '#task-menu, #task-menu-clear' ).velocity( "fadeIn", { duration: 300 });

    // TODO: Remove this, if we don't need to use Session
    // var menuVisible = Session.get( 'taskMenu' );
    // if( ! menuVisible ) {
    //   Session.set( 'taskMenu', true );
    //   $( '#task-menu, #task-menu-clear' ).velocity( "fadeIn", { duration: 300 });
    // } else {
    //   Session.set( 'taskMenu', false );
    //   $( '#task-menu' ).velocity( "fadeOut", { duration: 300 });
    // }
  }

});