Template.documentsMenu.helpers({
  current_page: function () {
    if (Routes.getName() === Routes.MY_DOCUMENTS) {
      return "<a href='/documents'>My Library <span class='caret'></span></a>";
    } else {
      return "<a href='/documents/company'><img src='../../images/documents/DE-white.png'/> Company Docs <span class='caret'></span></a>"
    }
  },
  next_page: function () {
    if (Routes.getName() === Routes.MY_DOCUMENTS) {
      return "<a href='/documents/company'><img src='../../images/documents/DE-white.png'/> Company Docs</a>";
    } else {
      return "<a href='/documents'>My Library</a>"
    }
  }
});

Template.documentsMenu.events({
  'click .dropdown-active': function () {
    $('.dropdown').velocity("slideDown");
  },
  'click .dropdown': function () {
    $('.dropdown').velocity("slideUp");
  }
});
