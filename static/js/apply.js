// Открытие окна подачи заявления
$('#apply').click(function() {
  $('#form').addClass('active');
});

// Закрытие окна подачи заявления
$('#close').click(function() {
  $('#form').removeClass('active');
});

// Переключение на следующий шаг и отправка формы
$('#next').click(function() {
  if (!$('.form-part.active').next().length) {
    $('#next').addClass('loading');
    return;
  }

  $next = $('.form-part.active').next();
  $('.form-part.active').removeClass('active');
  $next.addClass('active');

  if (!$('.form-part.active').next().length) {
    $('#next').empty();
    $('#next').append('Отправить ');
    $('#next').append('<i class="icon icon-check"></i>');
  }

  $('#back').removeClass('disabled');

  $next_step = $('.step-item.active').next();
  $('.step-item.active').removeClass('active');
  $next_step.addClass('active');
});

// Переключение на предыдущий шаг формы
$('#back').click(function() {
  $prev = $('.form-part.active').prev();
  $('.form-part.active').removeClass('active');
  $prev.addClass('active');

  if (!$('.form-part.active').prev().length) {
    $('#back').addClass('disabled');
  }

  $('#next').empty();
  $('#next').append('Далее ');
  $('#next').append('<i class="icon icon-arrow_forward"></i>');

  $prev_step = $('.step-item.active').prev();
  $('.step-item.active').removeClass('active');
  $prev_step.addClass('active');
});
