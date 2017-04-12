$('.dropdown-toggle').click(function() {
  $(this).parents('.dropdown').toggleClass('active');
}).focusout(function() {
  $(this).parents('.dropdown').removeClass('active');
});
