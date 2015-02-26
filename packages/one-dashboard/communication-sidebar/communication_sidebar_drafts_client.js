/* globals comSidebarCurrentWidth: false */

Template.communicationSidebarDrafts.rendered = function(){

  // initialize maazalik:malihu-jquery-custom-scrollbar scrollbar plugin
  // Desktop Only
  if( comSidebarCurrentWidth >= 992 ){
    $(".communication-sidebar-sleeve").mCustomScrollbar({
        theme:"one-light",
        scrollbarPosition: "inside"
    });
  }

};