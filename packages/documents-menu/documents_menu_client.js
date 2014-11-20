Template.documentsMenu.helpers({
  current_page: function () {
    if (Routes.getName() === Routes.MY_DOCUMENTS) {
      return "<a href='/documents'>My Documents <i class='fa fa-sort-desc'></i></a>";
    } else {
      return "<a href='/documents/company'><img src='../../images/documents/DE-white.png'/> Company Documents <i class='fa fa-sort-desc'></i></a>"
    }
  },
  next_page: function () {
    if (Routes.getName() === Routes.MY_DOCUMENTS) {
      return "<a href='/documents/company'><img src='../../images/documents/DE-white.png'/> Company Documents</a>";
    } else {
      return "<a href='/documents'>My Documents</a>"
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
