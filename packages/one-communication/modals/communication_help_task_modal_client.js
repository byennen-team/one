Template.helpTaskModal.events({
     // Opens the task menu  
  'click .welcome-task': function () {
    // expands the main dialog box t0 60% of full screen - task bar open
    $.Velocity.hook($('#communication-message-board'), "width", "56%");
    $.Velocity.hook($('#communication-task-board'), "width", "22%");
    $.Velocity.hook($('#communication-library-board'), "width", "22%");
    // opens task menu itself
    // Session.set( 'taskMenu', true ); // I don't think this is being used?
    $( '#task-menu, #task-menu-clear' ).velocity( "fadeIn", { duration: 300 });
    // add class to main chat window
    $('#communication-main').addClass('tasks');
    // Set caret height
    var $addTask = $( '#communication-add-task' );
    var position = $addTask.offset();
    $( "#task-menu-caret" ).css( 'top', ( position.top - 91 ) + "px" );
  },

    // Highlights the add button
    'click .welcome-library': function () {
        // Toggle to the library panel
        Session.set( 'members', false );
        // Animate the add button
        $( "#communication-library-add-files" )
            .delay( 300 )
            .velocity({ 
                translateZ: 0, 
                translateY: -20,
                color: '#fff'
            }, 200)
            .velocity({ 
                translateZ: 0, 
                translateY: 0
            }, 200)
            .velocity({ 
                translateZ: 0, 
                translateY: -10
            }, 100)
            .velocity({ 
                translateZ: 0, 
                translateY: 0,
                color: '#5bb8d7'
            }, 100);
    },

    // Hightlights myLibrary panel
    'click .welcome-library-span': function () {
        // Toggle to the library panel
        Session.set( 'members', false );
        // Animate the add button
        $( "#communication-library-panel-files-shadow" )
            .delay( 300 )
            .velocity( { opacity: 1 }, 300 )
            .velocity( { opacity: 0 }, 300 )
            .velocity( { opacity: 1 }, 300 )
            .velocity( { opacity: 0 }, 250 );
    },

    // Hightlights myLibrary panel
    'click .welcome-input': function () {
        // Animate the add button
        $( "#addMessageInput" ).focus();
        $( "#communication-message-input-flash" )
            .delay( 300 )
            .velocity( { opacity: 1 }, 300 )
            .velocity( { opacity: 0 }, 300 )
            .velocity( { opacity: 1 }, 300 )
            .velocity( { opacity: 0 }, 250 );
    },

     // Highlights the search input
    'click .welcome-search': function () {
        // Animate the add button
        $( "#message-board-search" )
            .delay( 300 )
            .velocity({ 
                translateZ: 0, 
                translateY: -20,
                color: '#5bb8d7'
            }, 200)
            .velocity({ 
                translateZ: 0, 
                translateY: 0
            }, 200)
            .velocity({ 
                translateZ: 0, 
                translateY: -10
            }, 100)
            .velocity({ 
                translateZ: 0, 
                translateY: 0,
                color: '#333333'
            }, 100);
    }

});