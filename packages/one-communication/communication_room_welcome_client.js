
Template.welcomeRoom.events({
// Opens the task menu & flashes  
  'click .welcome-task': function () {
    // expands the main dialog box t0 60% of full screen - task bar open
    $.Velocity.hook($('#communication-message-board'), "width", "45%");
    $.Velocity.hook($('#communication-task-board'), "width", "15%");
    $.Velocity.hook($('#communication-library-board'), "width", "15.5%");
    // opens task menu itself
    Session.set( 'taskMenu', true );
    $( '#communication-task-menu' ).velocity( "fadeIn", { duration: 300 });
    // add class to main chat window
    $('#communication-main').addClass('tasks');
  }

});
