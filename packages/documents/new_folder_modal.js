Template.documentsFolderModal.events({
  'submit form[name=createFolder]': function (event) {
    event.preventDefault();

    var templateInstance = Template.instance();
    var form = $(event.target);
    var folderNameInput = form.find('[name="folderName"]');

    var folderName = folderNameInput.val();
    var parentFolderId = Session.get('currentFolderId');
    FileTools.createFolder(
      folderName,
      parentFolderId,
      function (error, newFolderId) {
        if (error) {
          // TODO: Show error to user
          console.error(error);
        } else {
          templateInstance.$('#documentsFolderModal').modal('hide');
          form.get(0).reset();
          Router.go('folder', {_id: newFolderId});
        }
      }
    );
  }
});
