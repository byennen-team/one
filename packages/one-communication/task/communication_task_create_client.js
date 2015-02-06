Template.communicationCreateTask.rendered = function () {
  // call bootstrap3-datetimepicker plugin 
  $('.datetimepicker').datetimepicker({
    minuteStepping: 5,
    format: 'h:mm a on M/D',
    sideBySide: true,
    showClear: true  // this option doesn't seem to work
  });

  // use specific class to call first
  $( '.taskcolorselectpicker' ).selectpicker(); 
// TODO: if the event already has a color defined, insert it instead of 'purple'
  $( '.filter-option' ).addClass( 'purple dot-select' );

  var currentHeight = $(window).height();
  var taskHeight = currentHeight - 110;
  var $taskMenuSleeve = $( "#task-menu-sleeve" );
  $taskMenuSleeve.css( "maxHeight", taskHeight + "px" );

  // initialize mCustomScrollbar scrollbar plugin
  $taskMenuSleeve.mCustomScrollbar({
    theme:"one-dark",
    scrollbarPosition: "inside"
  });
};


Template.communicationCreateTask.events({

// // TODO: submit form here:
  'click #task-menu-create': function () {
    // Closes menu
    $( '#task-menu, #task-menu-clear' )
      .velocity( "fadeOut", { duration: 500 });
    $( '#communication-task-board .task' ).removeClass( 'open' );
  },

// TODO: Needs to delete the current task
  'click #task-menu-delete': function () {
    // Closes menu
    $( '#task-menu, #task-menu-clear' )
      .velocity( "fadeOut", { duration: 500 });
    $( '#communication-task-board .task' ).removeClass( 'open' );
  },

  'click #task-menu-clear': function () {
    // Closes menu
    $( '#task-menu, #task-menu-clear' )
      .velocity( "fadeOut", { duration: 500 });
    $( '#communication-task-board .task' ).removeClass( 'open' );
  },

// TODO: Also needs to remove the guest from the list
//  The div .guest will need to be actually removed from the DOM to prevent
//    positioning errors.
  'click .uninvite': function (event){
    var $this = $( event.currentTarget );
    $this.closest( '.guest' ).velocity( "slideUp", { duration: 350 });
  },

  // Grabs the classes off of selected option and applies them to the button
  'click .dot-select': function (event) {
    var $this = $( event.currentTarget );
    var $button = $this.closest( '.bootstrap-select' ).find( '.filter-option' );
    // clear old styling classes, but keep original classes
    $button.attr( 'class', 'filter-option pull-left');
    // get classes from the selected option
    var classList = $this.attr('class').split(/\s+/);
    for (var i = 0; i < classList.length; i++) {
      $button.addClass( classList[i] );
    }
  },

  // fix removal of classes when button is clicked
  'click .select-color > .filter-option': function (event) {
    var $this = $( event.currentTarget );
    // get classes
    var classList = $this.text().split(/\s+/);
    // Put them back on the button
    for (var i = 0; i < classList.length; i++) {
        $this.addClass( classList[i] );
    }
    $this.addClass( 'dot-select' );
  }

});


Template.communicationCreateTask.helpers({
// TODO: should return false if the current task is new, 
//    false if it already exists.
  notNew: function () {
    return true;
  },

  // Returns the task's due date. If one is not defined, returns today's date
  calendarStartDate: function () {
// TODO: Return due date below. If one is not defined, return false.
    // var deadline = '2:00 pm on 2/18';
    var deadline = false;
// end TODO
    if( deadline ){
      return deadline;
    } else {
      // var weekday = moment().format('dddd');
      var date = moment().format('h:mm a on M/D');
      return date;
    }
  },

  // Returns the task's due date. If one is not defined, returns "".
  dueDate: function () {
// TODO: Return due date below. If one is not defined, return false.
    // var deadline = '2:00 pm on 2/18';
    var deadline = false;
// /TODO
    if( deadline ){
      return deadline;
    } else {
      return "";
    }
  },

// TODO: if event has a description, return description, else return.
  description: function () {
    // return "here are some notes about the event.";
    return;
  }

});
