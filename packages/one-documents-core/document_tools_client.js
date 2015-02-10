/* globals DocumentTools: true */

DocumentTools = DocumentTools || {};

_.extend(DocumentTools, {

  download: function (url, downloadName) {
    downloadName = downloadName || 'img.png';
    var a = $('<a target="_blank">')
      .attr("href", url)
      .attr("download", downloadName)
      .appendTo("body");
    a[0].click();
    a.remove();
  },

  print: function (url) {
    var file = window.open(url);
    file.print();
  }

});
