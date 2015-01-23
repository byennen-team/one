Template.eventMenu.rendered = function () {

};

var roundTime = function( add ){
  // Returns the current time, rounded to the nearest half hour
  // add = number of hours to add to result (1 for an hour in the future)
  var hour = moment().format('h');
  var min = moment().format('mm');
  var ampm = moment().format('a');
console.log( hour + ':' + min + ampm );

  // round the time up to the nearest half hour
  if( min < 30 ){
console.log( 'up to 30' );
    min = 30;
  }else {
console.log( 'down to 00' );
    min = '00';
  }
  if( min == '00' && hour < 12 ){ // if we've rounded down
console.log( 'add an hour' );
    hour++;
  }else if( hour == 12 ){ // if it's 12, to to 1 and switch am/pm
console.log( 'hour to 1' );
    hour = 1;
    if( ampm == 'am' ){ 
console.log( 'to PM' );
      ampm = 'pm';
    }else {
console.log( 'to AM' );
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
    console.log( weekday + ', ' + date );
    return weekday + ', ' + date;
  },

  time: {
    start: roundTime(),
    end: roundTime(1)
  }
});