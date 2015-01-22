Template.eventMenu.rendered = function () {
  $('.datepicker').datepicker()
};

var roundTime = function( add ){
  // Returns the current time, rounded to the nearest half hour
  // add = number of hours to add to result (1 for an hour in the future)
  var hour = moment().format('h');
  var min = moment().format('mm');
  var ampm = moment().format('a');
  if( add == null ){
    var add = 0;
  }
  // round the time up to the nearest half hour
  if( min < 30 ){
    min = 30;
  }else {
    min = '00';
  }
  if( min == 00 || hour < 12 ){
    hour++;
  }else { // if switching over am/pm
    hour = 1;
    if( ampm == 'am' ){ 
      ampm = 'pm';
    }else {
      ampm = 'am';
    }
  }
  return hour + add + ':' + min + ' ' + ampm; // make it pretty
}

Template.eventMenu.helpers({

  // returns today's date
  day: function () {
    var weekday = moment().format('dddd');
    var date = moment().format('MMMM Do');
    return weekday + ', ' + date;
  },

  time: {
    start: roundTime(),
    end: roundTime(1)
  }
});