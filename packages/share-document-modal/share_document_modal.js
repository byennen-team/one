Template.shareDocumentModal.helpers({
  shareUrl: function () {
    return Session.get('sharedDocumentUrl');
  }
});

Template.shareDocumentModal.rendered = function () {
  var input = this.$('input');
  input.select2({
    formatNoMatches: function () {
      return 'Type a full email address';
    },
    multiple: true,
    query: function (query) {
      var data = {results: []};



      //if (Match.test(query.term, MatchEx.Email()))
      //  data.results.push({id: i++, text: query.term});

      query.callback(data);
    },
    width: 'element'
  });
};