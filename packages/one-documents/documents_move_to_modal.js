Template.documentsMoveToModal.events({
  'click [data-action="move-to"]': function (event, templateInstance) {
    var fileTree = templateInstance.$('[data-view="file-tree"]');
    var selectedFolderIds = fileTree.jstree('get_selected');
    var documentsToMove = Session.get('selectedDocuments');

    if (!_.isEmpty(selectedFolderIds) && !_.isEmpty(documentsToMove)) {
      var targetFolder = selectedFolderIds[0];
      if (targetFolder === '#companyDocuments' ||
          targetFolder === '#myDocuments'
      ) {
        targetFolder = null;
      }
      Meteor.call('moveTo', documentsToMove, targetFolder, function (error) {
        if (error) {
          console.error(error);
        }
      });
      Modal.hide();
    }
  },

  'click [data-action="toggle-dropdown"]': function (event, templateInstance) {
    templateInstance.$('[data-view="dropdown"]').toggleClass('hidden');
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
  },

  selectedFolder: function () {
    var selectedFolderId = Session.get('selectedFolderId');
    if (selectedFolderId) {
      if (selectedFolderId === '#companyDocuments') {
        return 'Company Docs';
      } else if (selectedFolderId === '#myDocuments') {
        return 'My Library';
      } else {
        var selectedFolder = Files.findOne(selectedFolderId);
        return selectedFolder ? selectedFolder.name : null;
      }
    } else {
      return null;
    }
  }
});

Template.documentsMoveToModal.created = function () {
  selectCurrentFolder();
};

Template.documentsMoveToModal.rendered = function () {
  var templateInstance = this;
  var fileTree = templateInstance.$('[data-view="file-tree"]');
  fileTree.jstree({
    core: {
      multiple: false,
      data: getChildNodes
    }
  });

  fileTree.on('select_node.jstree', function (event, eventData) {
    Session.set('selectedFolderId', eventData.selected[0]);
    templateInstance.$('[data-view="dropdown"]').addClass('hidden');
  });
};

function selectCurrentFolder() {
  var currentFolderId = Session.get('currentFolderId');
  var selectedFolderId;
  if (currentFolderId) {
    selectedFolderId = currentFolderId;
  } else {
    if (FileTools.isCompanyDocumentsActive()) {
      selectedFolderId = '#companyDocuments';
    } else {
      selectedFolderId = '#myDocuments';
    }
  }

  Session.set('selectedFolderId', selectedFolderId);
}

function getChildNodes(node, callback) {
  var fileTreeNodes;
  if (node.id === '#') {
    if (FileTools.isCompanyDocumentsActive()) {
      fileTreeNodes = [getCompanyDocsNode()];
    } else {
      fileTreeNodes = [getMyLibraryNode()];
    }
  } else {
    fileTreeNodes = getChildDocuments(node).map(documentToNode);
  }

  callback.call(this, fileTreeNodes);
}

function getCompanyDocsNode() {
  return {
    id: '#companyDocuments',
    text: 'Company Docs',
    icon: 'fa fa-folder',
    state: {
      opened: true,
      selected: !Session.get('currentFolderId')
    },
    children: true
  };
}

function getMyLibraryNode() {
  return {
    id: '#myDocuments',
    text: 'My Library',
    icon: 'fa fa-folder',
    state: {
      opened: true,
      selected: !Session.get('currentFolderId')
    },
    children: true
  };
}

function getChildDocuments(node) {
  return Files.find(
    {
      companyDocument: FileTools.isCompanyDocumentsActive(),
      isFolder: true,
      archived: {$ne: true},
      parent: node.id.charAt(0) === '#' ? null : node.id
    }, {sort: {name: 1}}
  );
}


function documentToNode(document) {
  return {
    id: document._id,
    text: document.name,
    icon: 'fa fa-folder',
    state: {
      selected: Session.equals('currentFolderId', document._id)
    },
    children: true
  };
}
