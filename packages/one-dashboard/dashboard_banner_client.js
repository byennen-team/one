Template.dashboardBanner.helpers({
// TODO: should return current temperature
  temp: function() {
    return '34';
  },
// TODO: should return icon code based on current weather
  weather: function() {
    return 'fa-sun-o';
    // example: (need to create custom icons)
    // if( sunny ){
    //   return 'fa-sun-o';
    // } else if ( cloudy ) {
    //   return 'fa-cloud';
    // } else if ( rain ) {
    //   return 'fa-tint';
    // } else if ( snow ) {
    //   return 'fa-bug';
    // }
  },
// TODO: should return the closes city to User's current location  
  city: function() {
    return 'new york';
  },
  month: function() {
    return moment().format('MMMM Do');
  },
  time: function() {
    return moment().format('h:mm a');
  }
});
