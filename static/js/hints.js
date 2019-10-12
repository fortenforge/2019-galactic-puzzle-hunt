$(document).ready(function() {
    $('.hint-preview-text').click(e => {
      $(e.target).next().show();
    });
});
