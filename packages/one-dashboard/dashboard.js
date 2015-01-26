/* globals SocialMedia: true */
Meteor.methods({
  'getForecast': function(position) {
    check(position, Object);
    //using the cache function from social-media in order to
    //reduce calls to the server
    try {
      var result = SocialMedia.cachedHttp('GET',
        'https://api.forecast.io/forecast/' +
        Meteor.settings.FORECAST_API_KEY+'/' +
        position.coords.latitude +
        ',' + position.coords.longitude, {}, false, 20);
      console.log(result.type);
      return (null, result.data.currently);
    } catch (e) {
      console.log(e);
      return (e);
    }
  }
});