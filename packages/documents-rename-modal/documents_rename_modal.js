Template.documentsRenameModal.events({
  'click button': function (event, template) {
    var fileId = Session.get('selectedFileId');
    var fileName = template.find('input').value;
    Meteor.call('renameDocument', fileId, fileName, function () {
      $('#documentsRenameModal').modal('hide');
    });
  }
});