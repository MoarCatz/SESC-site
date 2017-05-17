$(window).scroll(function() {
  var winTop = $(this).scrollTop();
  var $elems = $('.anchor');

  var top = $.grep($elems, function(item) {
    return $(item).position().top <= winTop + 70;
  });

  $('.nav .nav-item').removeClass('active');
	$('a[href="#' + $(top[top.length - 1]).attr('id') + '"]').parent().addClass('active');
});

$('li').removeClass('active');
$('li:first-child').addClass('active');

// Выпадающие меню
$('.dropdown-toggle').click(function() {
  $(this).parents('.dropdown').toggleClass('active');
}).focusout(function() {
  $(this).parents('.dropdown').removeClass('active');
});
