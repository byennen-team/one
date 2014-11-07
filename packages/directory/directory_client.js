// TODO: use bootstrap table for sorting: http://wenzhixin.net.cn/p/bootstrap-table/docs/index.html
// TODO: search by letter

var alphabet = ['a', 'b', 'c', 'd','e', 'f', 'g', 'h', 'i', 'j','k', 'l', 'm',
                'n', 'o', 'p','q', 'r','s', 't', 'u', 'v','w', 'x', 'y', 'z'];

Template.directory.helpers({
  users: function () {
    return Search.results();
  },
  alphabets: function () {
    return alphabet;
  }
});
