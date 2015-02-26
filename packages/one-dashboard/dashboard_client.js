/* globals temp: false */

Template.dashboard.helpers({
  // Return current temperature
  temp: function() {
    if (temp.get())
      return temp.get().temperature;
    else
      return null;
  },

  // Return the closes city to User's current location
  city: function() {
    if (temp.get())
      return temp.get().locality;
    else
      return null;
  },
  month: function() {
    return moment().format('MMMM D');
  },
  time: function() {
    return moment().format('h:mm a');
  }
});