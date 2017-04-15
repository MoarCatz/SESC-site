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

$("td.topic-pvr:nth-last-child(-n+4)").addClass("popover-left");

// Расчет средней оценки за месяц
function getMark(str) {
  var marks = str.match(/([0-9][-+]?)/g);
  if (str.match(/[ну]{1,2}/)) {
    return [];
  }
  if (marks === null) {
    return ['2'];
  }
  return marks;
}

function setAverageMonth(element, avg) {
  var select = element.find('.card-body').find('.col-3:nth-child(2)');
  select.text((Math.round(avg * 100) / 100).toString(10));
  select.addClass(avg >= 4 ? 'good-mark' : 'bad-mark');
}

$('table.hide-md tr').each(function() {
  var total = 0;
  var count = 0;
  var markArray;
  $(this).find('.mark').each(function() {
    markArray = getMark($(this).text());
    total += markArray.reduce((a, b) => a + parseInt(b, 10), 0);
    count += markArray.length;
  });
  if (count) {
    setAverageMonth($(this).find('.subject').next(), total / count);
    setAverageMonth($('.card-header:contains(' + $(this).find('.subject').text() + ')').parent(), total / count);
  }
});

// Переключение между месяцами
var months = ['Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Итоги'];
var years = ['2014-2015', '2015-2016', '2016-2017', '2017-2018'];

function checkBounds() {
  var m_idx = months.indexOf($('#month-switch').text().split(/\s+/g)[0]);
  var y_idx = years.indexOf($('#year-switch').text().split(/\s+/g)[0]);
  if (m_idx === 0 && y_idx === 0) {
    $('#left').addClass('disabled');
  }
  else {
    $('#left').removeClass('disabled');
  }

  if (m_idx === months.length - 1 && y_idx === years.length - 1) {
    $('#right').addClass('disabled');
  }
  else {
    $('#right').removeClass('disabled');
  }
}

$('#month-switch + ul a').click(function() {
  $('#month-switch').text($(this).text()).append('<i class="icon icon-arrow_drop_down"></i>');
  checkBounds();
});

$('#year-switch + ul a').click(function() {
  $('#year-switch').text($(this).text()).append('<i class="icon icon-arrow_drop_down"></i>');
  checkBounds();
});

$('#left').click(function() {
  var m_idx = months.indexOf($('#month-switch').text().split(/\s+/g)[0]);
  var y_idx = years.indexOf($('#year-switch').text().split(/\s+/g)[0]);

  if (m_idx !== 0) {
    $('#month-switch').text(months[m_idx - 1]).append('<i class="icon icon-arrow_drop_down"></i>');
  }
  else {
    $('#month-switch').text(months[months.length - 1]).append('<i class="icon icon-arrow_drop_down"></i>');
    $('#year-switch').text(years[y_idx - 1]).append('<i class="icon icon-arrow_drop_down"></i>');
  }
  checkBounds();
});

$('#right').click(function() {
  var m_idx = months.indexOf($('#month-switch').text().split(/\s+/g)[0]);
  var y_idx = years.indexOf($('#year-switch').text().split(/\s+/g)[0]);

  if (m_idx !== months.length - 1) {
    $('#month-switch').text(months[m_idx + 1]).append('<i class="icon icon-arrow_drop_down"></i>');
  }
  else {
    $('#month-switch').text(months[0]).append('<i class="icon icon-arrow_drop_down"></i>');
    $('#year-switch').text(years[y_idx + 1]).append('<i class="icon icon-arrow_drop_down"></i>');
  }
  checkBounds();
});

checkBounds();
