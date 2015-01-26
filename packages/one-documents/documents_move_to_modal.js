Template.documentsMoveToModal.events({
  'click [data-action="move-to"]': function (event, templateInstance) {
    var fileTree = templateInstance.$('[data-view="file-tree"]');
    var selectedFolderIds = fileTree.jstree('get_selected');
    var documentsToMove = Session.get('selectedDocuments');

    if (!_.isEmpty(selectedFolderIds) && !_.isEmpty(documentsToMove)) {
      var targetFolder = selectedFolderIds[0];
      Meteor.call('moveTo', documentsToMove, targetFolder, function (error) {
        if (error) {
          console.error(error);
        }
      });
      Modal.hide();
    }
  }
});

Template.documentsMoveToModal.helpers({
  currentFolder: function () {
    var currentFolderId = Session.get('currentFolderId');
    if (currentFolderId) {
      var currentFolder = Files.findOne(currentFolderId);
      return currentFolder ? currentFolder.name : '';
    } else {
      return FileTools.isCompanyDocumentsActive() ?
        'Company Docs' :
        'My Library';
    }
  }
});

Template.documentsMoveToModal.rendered = function () {
  var fileTree = this.$('[data-view="file-tree"]');
  fileTree.jstree({
    core: {
      multiple: false,
      data: function (node, callback) {
        var fileTreeNodes;
        if (node.id === '#') {
          if (FileTools.isCompanyDocumentsActive()) {
            fileTreeNodes = [
              {
                id: '#companyDocuments',
                text: 'Company Docs',
                icon: 'fa fa-folder',
                state: {
                  opened: true,
                  selected: !Session.get('currentFolderId')
                },
                children: true
              }
            ];
          } else {
            fileTreeNodes = [
              {
                id: '#myDocuments',
                text: 'My Library',
                icon: 'fa fa-folder',
                state: {
                  opened: true,
                  selected: !Session.get('currentFolderId')
                },
                children: true
              }
            ];
          }
        } else {
          var filesCursor = Files.find(
            {
              companyDocument: FileTools.isCompanyDocumentsActive(),
              isFolder: true,
              archived: {$ne: true},
              parent: node.id[0] === '#' ? null : node.id
            },
            {
              sort: {name: 1}
            }
          );

          fileTreeNodes = filesCursor.map(function (document) {
            return {
              id: document._id,
              text: document.name,
              icon: 'fa fa-folder',
              state: {
                selected: Session.equals('currentFolderId', document._id)
              },
              children: true
            };
          });
        }

        callback.call(this, fileTreeNodes);
      }
    }
  });

  fileTree.on('select_node.jstree', function (event, eventData) {
    Session.set('selectedFolderId', eventData.selected[0]);
  });
};
