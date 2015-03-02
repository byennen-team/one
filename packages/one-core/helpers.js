/* globals Helpers: true */

Helpers = {

  formatDate: function (date) {
    if (moment(date).diff(moment(new Date()), 'days') >= 1) {
      return moment(date).format('MMM D, YYYY');
    } else {
      return moment(date).fromNow();
    }
  }

};
