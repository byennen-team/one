Template.eventMenu.rendered = function () {
  // If there is an address, show it
  var location = $( '#event-menu-location' ).val();
  if( location ){
    Session.set( 'whereOpen', true );
  }else {
    Session.set( 'whereOpen', false );
  }

  // Hide add people button to start
  Session.set( 'addPeople', false );

  // If there is an address, show it
  var location = $( '#event-menu-notes' ).val();
  if( location ){
    Session.set( 'notesOpen', true );
  }else {
    $( '#event-menu-notes' ).css( 'display', 'none' );
    Session.set( 'notesOpen', false );
  }

// TODO: if the event already has a color defined, insert in instead of 'purple'
  $( '.colorselectpicker' ).selectpicker(); // use specific class to call first
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
  if( min == '00' && hour < 12 ){ // if we've rounded down
    hour++;
  }else if( hour == 12 ){ // if it's 12, to to 1 and switch am/pm
    hour = 1;
    if( ampm == 'am' ){ 
      ampm = 'pm';
    }else {
      ampm = 'am';
    }
  }

  if( add == null ){
    return hour + ':' + min + ' ' + ampm; // make it pretty
  }else {
    hour = parseInt(hour, 10);
    add = parseInt(add, 10);
    hour = hour + add;
    return hour + ':' + min + ' ' + ampm; // make it pretty
  }
}

Template.eventMenu.helpers({

  // returns today's date
  day: function () {
    var weekday = moment().format('dddd');
    var date = moment().format('MMMM D');
    return weekday + ', ' + date;
  },

  time: {
    start: roundTime(),
    end: roundTime(1)
  },
// TODO: if event has a location, return the address string, else return.
  eventLocation: function () {
    return;
    return '575 Madison Ave, New York, NY';
  },
// TODO: if event has a location, return open, else return.
  hasLocation: function () {
    // return; 
    return "open"; 
  },

// TODO: if event has notes, return notes, else return.
  notes: function () {
    return "here are some notes about the event."
    // return;
  }
});

Template.eventMenu.events({

  // Toggle event location on label click
  'click #event-menu-location-label': function () {
    var open = Session.get( 'whereOpen' );
    if( open ){ // if box is currently open, close it and set session to false
      Session.set( 'whereOpen', false );
      $( '#event-menu-location-box' ).velocity("slideUp", { duration: 350 });
    }else { // if box is currently closed, open it and set session to true
      Session.set( 'whereOpen', true );
      $( '#event-menu-location-box' ).velocity("slideDown", { duration: 350 });
    }
  },

  // Toggle add people on label click
  'click #event-menu-invite-label': function () {
    var open = Session.get( 'addPeople' );
    if( open ){ // if box is currently open, close it and set session to false
      Session.set( 'addPeople', false );
      $( '#event-menu-invite-box' ).velocity("slideUp", { duration: 350 });
    }else { // if box is currently closed, open it and set session to true
      Session.set( 'addPeople', true );
      $( '#event-menu-invite-box' ).velocity("slideDown", { duration: 350 });
    }
  },

  // Toggle notes on label click
  'click #event-menu-notes-label': function () {
    var open = Session.get( 'notesOpen' );
    if( open ){ // if box is currently open, close it and set session to false
      Session.set( 'notesOpen', false );
      $( '#event-menu-notes' ).velocity("slideUp", { duration: 350 });
    }else { // if box is currently closed, open it and set session to true
      Session.set( 'notesOpen', true );
      $( '#event-menu-notes' ).velocity("slideDown", { duration: 350 }, 'ease-out');
    }
  },

  'click .btn-cancel': function (event) {
    event.preventDefault();
    $( '#event-menu' ).velocity("fadeOut", { duration: 500 });
  },

// TODO: submit form here:
  'click .btn-submit': function (event) {
    event.preventDefault();
    $( '#event-menu' ).velocity("fadeOut", { duration: 500 });
  },

// TODO: Also needs to remove the guest from the list
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