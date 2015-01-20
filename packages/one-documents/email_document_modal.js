function copyToClipboard(text) {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

function selectElementText(el, win) {
    win = win || window;
    var doc = win.document, sel, range;
    if (win.getSelection && doc.createRange) {
        sel = win.getSelection();
        range = doc.createRange();
        range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (doc.body.createTextRange) {
        range = doc.body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }
}

Template.emailDocumentModal.helpers({
  shareUrl: function () {
    return Session.get('sharedDocumentUrl');
  }
});

Template.emailDocumentModal.rendered = function(){
  $('.selectpicker').selectpicker();
};

Template.emailDocumentModal.events({
  'click .copy-link': function () {
    var url = Session.get('sharedDocumentUrl');
    copyToClipboard(url);
  },

  'click .display-link': function (event, template) {
    var displayLink = event.currentTarget;
    console.log(displayLink);
    selectElementText(displayLink);
  }
});

// Template.emailDocumentModal.rendered = function () {
//   var input = this.$('input');
//   input.select2({
//     formatNoMatches: function () {
//       return 'Type a full email address';
//     },
//     multiple: true,
//     query: function (query) {
//       var data = {results: []};



//       //if (Match.test(query.term, MatchEx.Email()))
//       //  data.results.push({id: i++, text: query.term});

//       query.callback(data);
//     },
//     width: 'element'
//   });
// };