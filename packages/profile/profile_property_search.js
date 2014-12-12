Template.profilePropertySearch.rendered = function () {

}

Template.profilePropertySearch.events({
  'click #advanced-search-btn': function () {
    var $advSearch = $( '#advanced-search' );
    var status = $advSearch.css( 'display' );
    if( status == 'none' ){
      $( '#advanced-search-btn' ).addClass('open');
    } else {
      $( '#advanced-search-btn' ).removeClass('open');
    }
    $advSearch.slideToggle();
  }
});
