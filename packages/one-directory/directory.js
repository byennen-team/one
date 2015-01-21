// TODO: use bootstrap table for sorting:
//       http://wenzhixin.net.cn/p/bootstrap-table/docs/index.html

Template.directory.events({
  'click .load-more': function () {
    Search.limit.set(Search.limit.get() + 100);
  },
  'click .user': function () {
    var user = Meteor.users.findOne({_id: this._id});
    Router.go(Routes.PROFILE, {slug: user.slug});
  }
});

Template.directory.helpers({
  alphabetLetters: [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ],
  users: Search.results
});
