Template.profilePropertySearch.rendered = function () {
  $('.selectpicker').selectpicker();

  $("#sqft").slider();
  $("#sqft").on("slide", function(slideEvt) {
    $("#sqftSliderVal").text(slideEvt.value);
  });

  $('.datepicker').datepicker();
}

Template.profilePropertySearch.events({
  'click #advanced-search-btn': function () {
    $( '#advanced-search' ).slideToggle();
  }
});
