Template.documentsFolderModal.events({
  'submit form[name=createFolder]': function (event) {
    event.preventDefault();

    var form = $(event.target);
    var folderNameInput = form.find('[name="folderName"]');

    var folderName = folderNameInput.val();
    var parentFolderId = Session.get('currentFolderId');
    FileTools.createFolder(folderName, parentFolderId);

    Template.instance().$('#documentsFolderModal').modal('hide');
    form.get(0).reset();
  }
});
