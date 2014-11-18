Template.documentsMenu.helpers({
  current_page: function () {
    var current_page = Routes.getName() === Routes.MY_DOCUMENTS ? 'My Documents' : 'Company Documents';
    return current_page;
  },
  current_url: function () {
    var current_url = Routes.getName() === Routes.MY_DOCUMENTS ? 'myDocuments' : 'companyDocuments';
    return current_url;
  },
  next_url: function () {
    var next_url = Routes.getName() === Routes.MY_DOCUMENTS ? 'companyDocuments' : 'myDocuments';
    return next_url;
  },
  next_page: function () {
    var next_page = Routes.getName() === Routes.MY_DOCUMENTS ? 'Company Documents' : 'My Documents';
    return next_page;
  },
  // icon: function () {
  //   if (Routes.getName() === Routes.COMPANY_DOCUMENTS) {
  //     return "<p>All new content for </p>";
  //   }
  // }
});

Template.documentsMenu.events({
  'click .dropdown-active': function () {
    $('.dropdown').velocity("slideDown");
  },
  'click .dropdown': function () {
    $('.dropdown').velocity("slideUp");
  }
});
