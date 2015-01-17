Template.documentsFolderModal.events({
  'submit form[name=createFolder]': function (event) {
    event.preventDefault();

    var form = $(event.target);
    var folderNameInput = form.find('[name="folderName"]');

    var folderName = folderNameInput.val();
    FileTools.createFolder(folderName);

    Template.instance().$('#documentsFolderModal').modal('hide');
    form.get(0).reset();
  }
});
