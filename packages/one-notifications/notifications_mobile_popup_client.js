
/* globals Swiper:false */

Template.notificationsMobilePopup.created = function () {
  this.mySwiper = new ReactiveVar();
};

Template.notificationsMobilePopup.rendered = function () {
  //initialize swiper when document ready  
  // this.mySwiper.set = new Swiper('.swiper-container', {
   this.mySwiper.set(new Swiper ('.swiper-container', {
    // Optional parameters
    spaceBetween: 20,
    pagination: '.swiper-pagination',
    slidesPerView: 'auto',
    centeredSlides: true,
    paginationClickable: true
  }));   

};



Template.notificationsMobilePopup.helpers({
  // TODO: Should only return true if there are notifications
  'haveNotifications': function () {
    return Notify.getUnreadNotifications().count() ? true : false;
  },
  notificationsUnread: function () {
    return Notify.getUnreadNotifications();
  },
  date: function (dateToFormat) {
    return moment(dateToFormat).calendar();
  }
});

Template.notificationsMobilePopup.events({
  // Hides .notice when .x is clicked & updates database
  'click .x': function (event, instance) {
    var $this = $(event.target);
    var $slide = $this.closest( '.swiper-slide' );
    $slide.velocity( "slideUp", { duration: 500 } );
    Notify.markNotificationAsRead($(event.currentTarget).data("id"));
    setTimeout(function(){ 
      var mySwiper = instance.mySwiper.get();
      var doomed = mySwiper.activeIndex;
      var reel = mySwiper.slides.length;
      // if there's more than one slide left, remove current slide
      if( reel > 1 ){ 
        mySwiper.removeSlide( doomed );
      } else { // else destroy swiper and close notifications
        mySwiper.destroy();
        $this.closest( ".notifications-mobile-popup" )
          .velocity( "slideUp", { duration: 500 } );
      }
    }, 500);
  }
  
});

