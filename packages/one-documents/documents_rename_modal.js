Template.documentsRenameModal.events({
  'click #rename-file': function (event, template) {
    var fileId = Session.get('selectedFileId');
    var fileName = template.find('input').value;
    if (fileName && fileName.length > 0)
	    Meteor.call('renameDocument', fileId, fileName, function () {
	      $('#documentsRenameModal').modal('hide');
	    });
  }
});