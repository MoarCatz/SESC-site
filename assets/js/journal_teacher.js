// Фикс метода String.includes для iOS Safari
if (!String.prototype.includes) {
  String.prototype.includes = function() {
    'use strict';
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}

// Размещение всплывающих окон
$('td.topic-tlp').hover(function() {
  var top = $(this).position().top;
  var left = $(this).position().left;

  $(this).removeClass('tooltip-right tooltip-bottom tooltip-left');

  if (left < 150) {
    $(this).toggleClass('tooltip-right');
  }
  else if ($(document).width() - left < 130) {
    $(this).toggleClass('tooltip-left');
  }
  else if (top <= 50) {
    $(this).toggleClass('tooltip-bottom');
  }
});

$('td.topic-pvr:nth-last-child(-n+3)').addClass('popover-left');

// Переключение между классами
function setDropText(drop, text) {
  drop.text(text).append('<i class="icon icon-arrow_drop_down"></i>');
}
var classes = ['1Б', '2Б', '3Б', '4Б', '5Б', '6Б', '7Б', '8А', '9Е', '10Е'];
var currIdx = classes.indexOf($('#class-switch').text().split(/\s+/g)[0]);

// Логика переключения классов и месяцев
$('#month-switch + ul a').click(function() {
  setDropText($('#month-switch'), $(this).text());
});

$('#class-switch + ul a').click(function() {
  setDropText($('#class-switch'), $(this).text());
  currIdx = classes.indexOf($(this).text());
});

$('#left').click(function() {
  if (--currIdx === -1) {
    currIdx = classes.length - 1;
  }
  setDropText($('#class-switch'), classes[currIdx]);
});

$('#right').click(function() {
  currIdx = (currIdx + 1) % classes.length;
  setDropText($('#class-switch'), classes[currIdx]);
});

// Выставление оценок/тем
var months = ['Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май'];
var monthMap = ['сентября', 'октября', 'ноября', 'декабря', 'января', 'февраля', 'марта', 'апреля', 'мая'];
var lastActive;

// Установить для данного элемента информацию об ученике в заголовке
function setUpHeader(elem) {
  var card = elem.find('.card');
  // Получение имени ученика и даты, за которую будет выставлена оценка
  var person = elem.siblings('td:first').children('.subject').text();
  var date = $('th:eq(' + elem.index().toString(10) + ') p').text();
  elem.children('p').addClass('mark');

  card.children('.card-header').text(person + '\n' + date + ' ' + monthMap[months.indexOf($('#month-switch').text().split(/\s+/g)[0])]);
}

// Активация всплывающих окон
$('td.popover').click(function() {
  $(this).toggleClass('active');
  if ($(this).hasClass('active')) {
    $('.table.hide-md td:nth-child(n+2):hover').css('border', 'inherit');
  }
  else {
    $('.table.hide-md td:nth-child(n+2):hover').css('border', '2px solid #3d8b40');
  }
  if (lastActive !== undefined && !lastActive.is($(this))) {
    lastActive.removeClass('active');
  }
  lastActive = $(this);
  setUpHeader($(this));
});

// Фикс для того, чтоб окно не закрывалось по нажатию на него
$('.popover .popover-container').click(function(event) {
  event.stopPropagation();
});

// Выставление оценки и закрытие окна
$('td.popover button').click(function(event) {
  event.preventDefault();
  $(this).parents('.popover-container').prev().text($(this).prev().val());
  $(this).parents('.popover').removeClass('active');
});

// Активация всплывающих окон в заголовке таблицы
$('th div.popover').click(function() {
  $(this).toggleClass('active');
  if (lastActive !== undefined && !lastActive.is($(this))) {
    lastActive.removeClass('active');
  }
  lastActive = $(this);
});

// Выставление темы и закрытие окна в заголовке таблицы
$('th div.popover button').click(function(event) {
  event.preventDefault();
  $(this).parents('.popover').removeClass('active');
});

// Переключение между учениками по нажатию клавиши Tab
$('table.hide-md').keydown(function(event) {
  var code = event.keyCode || event.which;
  if (code === 9) {
    event.preventDefault();
    var active = $('td.active');
    if (active.length) {
      var nextRow = active.parent().next();
      if (!nextRow.length) {
        nextRow = active.parent().siblings().first();
      }
      var nextCell = nextRow.children('td:eq(' + active.index().toString(10) + ')');
      nextCell.addClass('active');
      lastActive = nextCell;
      setUpHeader(nextCell);
      active.removeClass('active');
    }
  }
});

// Фикс для того, чтоб модальное окно не закрывалось при нажатии
$('.modal .modal-container').click(function(event) {
  event.stopPropagation();
});

// Установить дату, для которой будет выставляться оценка
function setUpModal(elem) {
  var modal = elem.children('.modal');
  var date = elem.children('p').text();

  modal.find('.card-subtitle').text(date + ' ' + monthMap[months.indexOf($('#month-switch').text().split(/\s+/g)[0])]);
}

// Установить в заголовке модального окна информацию об ученике
function setUpModalMark(elem) {
  var modal = elem.children('.modal');
  // Получение имени ученика и даты, за которую будет выставлена оценка
  var person = elem.siblings('td:first').attr('data-tooltip');
  var date = $('th:eq(' + elem.index().toString(10) + ') p').text();

  modal.find('h6:first-child').text(person);
  modal.find('.card-subtitle').text(date + ' ' + monthMap[months.indexOf($('#month-switch').text().split(/\s+/g)[0])]);
}

// Активация модального окна
$('th.modal-trigger').click(function() {
  var modal = $(this).children('.modal');
  modal.toggleClass('active');
  if (lastActive !== undefined && !lastActive.is(modal)) {
    lastActive.removeClass('active');
  }
  lastActive = modal;
  setUpModal($(this));
});

// Закрытие окна
$('th.modal-trigger .card-header button, td.modal-trigger .card-header button').click(function(event) {
  event.preventDefault();
  $(this).parents('.modal').removeClass('active');
});

// Выставление темы урока и закрытие окна
$('th.modal-trigger .card-body button').click(function(event) {
  event.preventDefault();
  $(this).parents('.modal').removeClass('active');
  $(this).parents('th').addClass('topic-set');
});

// Активация модального окна выставления оценок
$('td.modal-trigger').click(function() {
  var modal = $(this).children('.modal');
  modal.toggleClass('active');
  if (lastActive !== undefined && !lastActive.is(modal)) {
    lastActive.removeClass('active');
  }
  lastActive = modal;
  setUpModalMark($(this));
});

// Выставление оценки и закрытие окна
$('td.modal-trigger .card-body button').click(function(event) {
  event.preventDefault();
  $(this).parents('.modal').prev().text($(this).prev().val());
  $(this).parents('.modal').removeClass('active');
});