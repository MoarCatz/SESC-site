function expand() {
  $('#plan + article li + div').hide();
  $('#plan + article button').on('click', function() {
    $(this).next().slideToggle(400);
    $(this).children('.icon').toggleClass('icon-arrow_drop_up').toggleClass('icon-arrow_drop_down');
  });
}

$(document).ready(expand);