'use strict'


	if ($(window).width() < 768) {
		$(function() {
			var $menu_popup = $('.menu-popup');
			
			$(".menu-triger, .menu-close").click(function(){
				$menu_popup.slideToggle(300, function(){
					if ($menu_popup.is(':hidden')) {
						$('body').removeClass('body_pointer');
					} else {
						$('body').addClass('body_pointer');
					}					
				});  
				return false;
			});			
			
			$(document).on('click', function(e){
				if (!$(e.target).closest('.menu').length){
					$('body').removeClass('body_pointer');
					$menu_popup.slideUp(300);
				}
			});
		});
	}


var sel1 =  document.querySelectorAll('input[type=radio]')[0];
var sel2 =  document.querySelectorAll('input[type=radio]')[1];
var sel3 =  document.querySelectorAll('input[type=radio]')[2];
var sel4 =  document.querySelectorAll('input[type=radio]')[3];
$(document).ready(function (){
    $(':radio').click(function (){
        if (this.checked) {
            $(`#${this.value}`).css('display', 'block');
			$(`.textradio[id!='${this.value}']`).css('display', 'none');		
        }
    });       
        sel1.checked = true;
        $(sel1).click();
         
});


function changeText() {
	if (sel1.checked == true) {
		sel2.checked = true;
		$(sel2).click();
	} else if (sel2.checked == true) {
		sel3.checked = true;
		$(sel3).click();
	} else if (sel3.checked == true) {
		sel4.checked = true;
		$(sel4).click();
	} else {
		sel1.checked = true;
		$(sel1).click();
	}
}

setInterval(changeText, 5000);

$('.click-for-video').click(function() {
	this.style.display = 'none';
	$('div.youtube').css('display', 'block');
	$('iframe.youtube').prop('src', 'https://www.youtube.com/embed/dQw4w9WgXcQ?;autoplay=1&;controls=0&;showinfo=0');
  });


  var multiItemSlider = (function () {
	return function (selector) {
	  var
		_mainElement = document.querySelector(selector), // основный элемент блока
		_sliderWrapper = _mainElement.querySelector('.slider__wrapper'), // обертка для .slider-item
		_sliderItems = _mainElement.querySelectorAll('.slider__item'), // элементы (.slider-item)
		_sliderControls = _mainElement.querySelectorAll('.slider__control'), // элементы управления
		_sliderControlLeft = _mainElement.querySelector('.slider__control_left'), // кнопка "LEFT"
		_sliderControlRight = _mainElement.querySelector('.slider__control_right'), // кнопка "RIGHT"
		_wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
		_itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента
		_positionLeftItem = 0, // позиция левого активного элемента
		_transform = 0, // значение трансформации .slider_wrapper
		_step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
		_items = [], // массив элементов
		_interval = 0,
        _config = {
            isCycling: true, // автоматическая смена слайдов
            direction: 'right', // направление смены слайдов
            interval: 5000, // интервал между автоматической сменой слайдов
            pause: true // устанавливать ли паузу при поднесении курсора к слайдеру
        };

  
	  // наполнение массива _items
	  _sliderItems.forEach(function (item, index) {
		_items.push({ item: item, position: index, transform: 0 });
	  });
	  
		
		
	  

	  var position = {
		getItemMin: function () {
		  var indexItem = 0;
		  _items.forEach(function (item, index) {
			if (item.position < _items[indexItem].position) {
			  indexItem = index;
			}
		  });
		  return indexItem;
		},
		getItemMax: function () {
		  var indexItem = 0;
			_items.forEach(function (item, index) {
			  if (item.position > _items[indexItem].position) {
				indexItem = index;
			  }
			});
		  return indexItem;
		},
		getMin: function () {
		  return _items[position.getItemMin()].position;
		},
		getMax: function () {
		  return _items[position.getItemMax()].position;
		}
	  }
  
	  var _transformItem = function (direction) {
		var nextItem;
		if (direction === 'right') {
		  _positionLeftItem++;
		  if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
			nextItem = position.getItemMin();
			_items[nextItem].position = position.getMax() + 1;
			_items[nextItem].transform += _items.length * 100;
			_items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
			changeItemRight();
		  }
		  _transform -= _step;
		}
		if (direction === 'left') {
		  _positionLeftItem--;
		  if (_positionLeftItem < position.getMin()) {
			nextItem = position.getItemMax();
			_items[nextItem].position = position.getMin() - 1;
			_items[nextItem].transform -= _items.length * 100;
			_items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
			changeItemLeft();
		  }
		  _transform += _step;
		  
		}
		_sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
		
	  }
	  
	  var _cycle = function (direction) {
		if (!_config.isCycling) {
		  return;
		}
		_interval = setInterval(function () {
		  _transformItem(direction);
		}, _config.interval);
		
	  }

	  // обработчик события click для кнопок "назад" и "вперед"
	  var _controlClick = function (e) {
		if (e.target.classList.contains('slider__control')) {
		  e.preventDefault();
		  var direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
		  _transformItem(direction);
		  
		}
	  };
  
	  var _setUpListeners = function () {
		// добавление к кнопкам "назад" и "вперед" обработчика _controlClick для события click
		_sliderControls.forEach(function (item) {
		  item.addEventListener('click', _controlClick);
		});
		if (_config.pause && _config.isCycling) {
            _mainElement.addEventListener('mouseenter', function () {
              clearInterval(_interval);
            });
            _mainElement.addEventListener('mouseleave', function () {
              clearInterval(_interval);
              _cycle(_config.direction);
            });
          }
	  }
  
	  // инициализация
	  _setUpListeners();
	  _cycle(_config.direction);
	  

	  return {
		
		right: function () { // метод right
		  _transformItem('right');
		},
		left: function () { // метод left
		  _transformItem('left');
		}
	  }
	  
	}
  }());
  
var slider = multiItemSlider('.slider') 

$(document).ready(function(){
		  $('.slider3 img').css("width", "60px");
	  });

function changeItemRight() {
	if ($(".slider3 img").css("width") == "60px") {
		$('.slider3 img').css("width", "45px");
		$('.quote3').css("display", "none");
		$('.quote4').css("display", "block");
		$('.slider4 img').css("width", "60px");
	} else if ($(".slider4 img").css("width") == "60px") {
		$('.slider4 img').css("width", "45px");
		$('.quote4').css("display", "none");
		$('.quote5').css("display", "block");
		$('.slider5 img').css("width", "60px");
	} else if ($(".slider5 img").css("width") == "60px") {
		$('.slider5 img').css("width", "45px");
		$('.quote5').css("display", "none");
		$('.quote1').css("display", "block");
		$('.slider1 img').css("width", "60px");
	} else if ($(".slider1 img").css("width") == "60px") {
		$('.slider1 img').css("width", "45px");
		$('.quote1').css("display", "none");
		$('.quote2').css("display", "block");
		$('.slider2 img').css("width", "60px");
	} else if($(".slider2 img").css("width") == "60px") {
		$('.slider2 img').css("width", "45px");
		$('.quote2').css("display", "none");
		$('.quote3').css("display", "block");
		$('.slider3 img').css("width", "60px");
	}
}
function changeItemLeft() {
	if ($(".slider3 img").css("width") == "60px") {
		$('.slider3 img').css("width", "45px");
		$('.quote3').css("display", "none");
		$('.quote2').css("display", "block");
		$('.slider2 img').css("width", "60px");
	} else if ($(".slider2 img").css("width") == "60px") {
		$('.slider2 img').css("width", "45px");
		$('.quote2').css("display", "none");
		$('.quote1').css("display", "block");
		$('.slider1 img').css("width", "60px");
	} else if ($(".slider1 img").css("width") == "60px") {
		$('.slider1 img').css("width", "45px");
		$('.quote1').css("display", "none");
		$('.quote5').css("display", "block");
		$('.slider5 img').css("width", "60px");
	} else if ($(".slider5 img").css("width") == "60px") {
		$('.slider5 img').css("width", "45px");
		$('.quote5').css("display", "none");
		$('.quote4').css("display", "block");
		$('.slider4 img').css("width", "60px");
	} else if($(".slider4 img").css("width") == "60px") {
		$('.slider4 img').css("width", "45px");
		$('.quote4').css("display", "none");
		$('.quote3').css("display", "block");
		$('.slider3 img').css("width", "60px");
	}
}
