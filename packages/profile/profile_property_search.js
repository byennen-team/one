Template.profilePropertySearch.rendered = function () {
  $('.selectpicker').selectpicker();
}

Template.profilePropertySearch.events({
  'click #advanced-search-btn': function () {
    $( '#advanced-search' ).slideToggle();
  }
});
