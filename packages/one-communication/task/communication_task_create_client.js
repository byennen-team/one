Template.communicationCreateTask.rendered = function () {
  console.log('task menu rendered'); // DAVE: remove this

  // TODO: if the event already has a color defined, insert in instead of 'purple'
  $( '.taskcolorselectpicker' ).selectpicker(); // use specific class to call first
  $( '.filter-option' ).addClass( 'purple dot-select' );

};

var roundTime = function( add ){
  // Returns the current time, rounded to the nearest half hour
  // add = number of hours to add to result (1 for an hour in the future)
  var hour = moment().format('h');
  var min = moment().format('mm');
  var ampm = moment().format('a');

  // round the time up to the nearest half hour
  if( min < 30 ){
    min = 30;
  }else {
    min = '00';
  }
  if( min === '00' && hour < 12 ){ // if we've rounded down
    hour++;
  }else if( hour === 12 ){ // if it's 12, to to 1 and switch am/pm
    hour = 1;
    if( ampm === 'am' ){ 
      ampm = 'pm';
    }else {
      ampm = 'am';
    }
  }

  if( add === null ){
    return hour + ':' + min + ' ' + ampm; // make it pretty
  }else {
    hour = parseInt(hour, 10);
    add = parseInt(add, 10);
    hour = hour + add;
    return hour + ':' + min + ' ' + ampm; // make it pretty
  }
};

Template.communicationCreateTask.events({

  'click .btn-cancel': function (event) {
    event.preventDefault();
    $( '#task-menu' ).velocity("fadeOut", { duration: 500 });
  },

// TODO: submit form here:
  'click .btn-submit': function (event) {
    event.preventDefault();
    $( '#task-menu, #task-menu-clear' )
      .velocity( "fadeOut", { duration: 500 });
  },

  'click #task-menu-create': function () {
    $( '#task-menu, #task-menu-clear' )
      .velocity( "fadeOut", { duration: 500 });
  },

// TODO: Needs to delete the current task
  'click #task-menu-delete': function () {
    $( '#task-menu, #task-menu-clear' )
      .velocity( "fadeOut", { duration: 500 });
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
  }
//   // returns today's date
//   day: function () {
//     var weekday = moment().format('dddd');
//     var date = moment().format('MMMM D');
//     return weekday + ', ' + date;
//   },

//   time: {
//     start: roundTime(),
//     end: roundTime(1)
//   },

// // TODO: if event has notes, return notes, else return.
//   notes: function () {
//     return "here are some notes about the event.";
//     // return;
//   }

});
