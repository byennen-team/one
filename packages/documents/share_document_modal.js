// TODO: replace this with something useful.
// function copyToClipboard(text) {
//   window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
// }

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

Template.shareDocumentModal.helpers({
  shareUrl: function () {
    return Session.get('sharedDocumentUrl');
  }
});

Template.shareDocumentModal.rendered = function(){
  $('.selectpicker').selectpicker();
  $('.link-expiration').datepicker();
  $('[data-toggle="tooltip"]').tooltip();
};

Template.shareDocumentModal.events({

  // 'click .copy-link': function () {
  //   var url = Session.get('sharedDocumentUrl');
  //   console.log(url);
  //   document.execCommand('copy', url );
  // },

  'click .display-link': function (event, template) {
    var displayLink = event.currentTarget;
    console.log(displayLink);
    selectElementText(displayLink);
  },

  'click .datepicker': function(){
    console.log('datepicker click');
  }
});

// Template.shareDocumentModal.rendered = function () {
//   var input = this.$('.selectpicker');
//   input.select2({
//     formatNoMatches: function () {
//       return 'Type a full email address';
//     },
//     multiple: false,
//     query: function (query) {
//       var data = {results: []};



//       //if (Match.test(query.term, MatchEx.Email()))
//       //  data.results.push({id: i++, text: query.term});

//       query.callback(data);
//     },
//     width: 'element'
//   });
// };