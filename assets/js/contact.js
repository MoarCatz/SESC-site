function setDanger(object) {
  object.addClass('is-danger');
  if (!object.parent().has('p').length) {
    object.parent().append('<p class="form-input-hint">Пожалуйста, заполните данное поле.</p>');
  }
  $('#submit').addClass('disabled');
}

function setSuccess(object) {
  object.removeClass('is-danger');
  object.addClass('is-success');
  object.parent().children('.form-input-hint').remove();
  $('#submit').removeClass('disabled');
}

function clear(object) {
  object.removeClass('is-danger');
  object.removeClass('is-success');
  object.parent().children('.form-input-hint').remove();
}

function validate(field, regex) {
  if (typeof regex === 'string') {
    var condition = (field.val() !== regex);
  }
  else {
    var condition = field.val().match(regex);
  }

  if (!condition) {
    setDanger(field);
    return false;
  }
  else {
    setSuccess(field);
    return true;
  }
}

$('.form-input').focusout(function() {
  validate($(this), '');
});
$('#email').focusout(function() {
  validate($(this), /[A-Za-z0-9._-]+@[a-z]+.[a-z]+/g);
});
$('#topic').focusout(function() {
  validate($(this), 'Выберите подходящее');
});

$('#reset').click(function() {
  clear($('#name'));
  clear($('#email'));
  clear($('#topic'));
  clear($('#message'));

  $('#submit').removeClass('disabled');
});

$('#submit').click(function(event) {
  var inputs = [
    [$('#name'), ''],
    [$('#email'), /[A-Za-z0-9._-]+@[a-z]+.[a-z]+/g],
    [$('#topic'), 'Выберите подходящее'],
    [$('#message'), '']
  ];

  for (var i = 0; i < inputs.length; ++i) {
    if (!validate(inputs[i][0], inputs[i][1])) {
      event.preventDefault();
    }
  }
});
