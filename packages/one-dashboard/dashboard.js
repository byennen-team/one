/* globals SocialMedia: true */
Meteor.methods({
  'getForecast': function(position) {
    /*jshint camelcase: false */
    check(position, Object);

    var lon = Math.round(position.coords.longitude * 100) / 100;
    var lat = Math.round(position.coords.latitude * 100) / 100;
    //using the cache function from social-media in order to
    //reduce calls to the server
    try {
      var result = SocialMedia.cachedHttp('GET',
        'https://api.forecast.io/forecast/' +
        Meteor.settings.FORECAST_API_KEY+'/' +
        lat + ',' + lon, {}, false, 20);

      //getting city based on coordinates
      var cityResult = SocialMedia.cachedHttp('GET',
        'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
        lat + ',' + lon + '&result_type=locality&key=' +
        Meteor.settings.GOOGLE_API_KEY, {}, false, 20);

      result.data.currently.locality =
        cityResult.data.results[0].address_components[0].long_name;

      return (null, result.data.currently);
    } catch (e) {
      console.log(e);
      return (e);
    }
  }
});