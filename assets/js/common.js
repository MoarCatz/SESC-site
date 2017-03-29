$(window).scroll(function() {
  var winTop = $(this).scrollTop();
  var $elems = $('.anchor');

  var top = $.grep($elems, function(item) {
    return $(item).position().top <= winTop + 53;
  });

  $('.nav .nav-item').removeClass('active');
	$('a[href="#' + $(top[top.length - 1]).attr('id') + '"]').parent().addClass('active');
});
