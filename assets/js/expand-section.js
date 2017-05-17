function expand() {
  $('article .expandable').hide();
  $('article button').on('click', function() {
    $(this).next().slideToggle(400);
    $(this).children('.icon').toggleClass('icon-keyboard_arrow_right').toggleClass('icon-keyboard_arrow_down');
  });
}

$(document).ready(expand);
