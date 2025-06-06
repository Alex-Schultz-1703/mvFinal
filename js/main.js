 AOS.init({
 	duration: 800,
 	easing: 'slide',
 	once: false
 });


let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;



jQuery(document).ready(function($) {

	"use strict";

	
	$(".loader").delay(1000).fadeOut("slow");
  $("#overlayer").delay(1000).fadeOut("slow");	

	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);
        
        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();  
      
    });

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	}; 
	siteMenuClone();


	var sitePlusMinus = function() {
		$('.js-btn-minus').on('click', function(e){
			e.preventDefault();
			if ( $(this).closest('.input-group').find('.form-control').val() != 0  ) {
				$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) - 1);
			} else {
				$(this).closest('.input-group').find('.form-control').val(parseInt(0));
			}
		});
		$('.js-btn-plus').on('click', function(e){
			e.preventDefault();
			$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) + 1);
		});
	};
	// sitePlusMinus();



	var siteSliderRange = function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
	};
	// siteSliderRange();

	
	var siteCarousel = function () {
		if ( $('.nonloop-block-13').length > 0 ) {
			$('.nonloop-block-13').owlCarousel({
		    center: false,
		    items: 1,
		    loop: true,
				stagePadding: 0,
		    margin: 0,
		    autoplay: true,
		    nav: true,
		    smartSpeed: 1000,
				navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
		    responsive:{
	        600:{
	        	margin: 0,
	        	nav: true,
	          items: 2
	        },
	        1000:{
	        	margin: 0,
	        	stagePadding: 0,
	        	nav: true,
	          items: 3
	        },
	        1200:{
	        	margin: 0,
	        	stagePadding: 0,
	        	nav: true,
	          items: 4
	        }
		    }
			});
		}

		$('.slide-one-item').owlCarousel({
	    center: false,
	    items: 1,
	    loop: true,
			stagePadding: 0,
	    margin: 0,
	    smartSpeed: 1000,
	    autoHeight: true,
	    autoplay: true,
	    pauseOnHover: false,
	    nav: true,
	    navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
	  });


	  $('.slide-link').on('click', function(e) {
		e.preventDefault();
		
		// Получаем данные
		const slideIndex = $(this).data('slide');
		const carousel = $('.slide-one-item');
		const section = $('#testimonials-section');
		
		// Рассчитываем позицию для скролла
		const headerHeight = $('.site-navbar').outerHeight() + 20; // Высота хедера + отступ
		const windowHeight = $(window).height();
		const sectionTop = section.offset().top;
		
		// Центрируем карусель в viewport
		const targetScroll = sectionTop - headerHeight - (windowHeight/2 - section.outerHeight()/2);
	
		// Активируем слайд
		carousel.trigger('to.owl.carousel', [slideIndex, 300]);
		
		// Плавный скролл с easing
		$('html, body').stop(true).animate({
			scrollTop: targetScroll
		}, 800, 'easeInOutQuad', function() {
			// Дополнительная коррекция после анимации
			const finalPosition = sectionTop - headerHeight;
			if($(window).scrollTop() < finalPosition) {
				$(this).scrollTop(finalPosition);
			}
		});
	});
	};
	siteCarousel();

	var siteStellar = function() {
		$(window).stellar({
	    responsive: false,
	    parallaxBackgrounds: true,
	    parallaxElements: true,
	    horizontalScrolling: false,
	    hideDistantElements: false,
	    scrollProperty: 'scroll'
	  });
	};
	// siteStellar();



	var siteCountDown = function() {

		$('#date-countdown').countdown('2020/10/10', function(event) {
		  var $this = $(this).html(event.strftime(''
		    + '<span class="countdown-block"><span class="label">%w</span> weeks </span>'
		    + '<span class="countdown-block"><span class="label">%d</span> days </span>'
		    + '<span class="countdown-block"><span class="label">%H</span> hr </span>'
		    + '<span class="countdown-block"><span class="label">%M</span> min </span>'
		    + '<span class="countdown-block"><span class="label">%S</span> sec</span>'));
		});
				
	};
	siteCountDown();

	var siteDatePicker = function() {

		if ( $('.datepicker').length > 0 ) {
			$('.datepicker').datepicker();
		}

	};
	siteDatePicker();

	var siteSticky = function() {
		$(".js-sticky-header").sticky({topSpacing:0});
	};
	siteSticky();

	// navigation
  var OnePageNavigation = function() {
    var navToggler = $('.site-menu-toggle');
   	$("body").on("click", ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a", function(e) {
      e.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        'scrollTop': $(hash).offset().top - 0
      }, 1000, 'easeInOutCirc', function(){
        window.location.hash = hash;
      });

    });
  };
  OnePageNavigation();

  var siteScroll = function() {

  	

  	$(window).scroll(function() {

  		var st = $(this).scrollTop();

  		if (st > 100) {
  			$('.js-sticky-header').addClass('shrink');
  		} else {
  			$('.js-sticky-header').removeClass('shrink');
  		}

  	}) 

  };
  siteScroll();

});


$(document).ready(function () {
	const element = $('#infinite-typing');
	const phrases = element.data('typing');
	let text = '';
	let i = 0;

	function typeWriter() {
		const fullTxt = phrases[0];

		text = fullTxt.substring(0, i + 1);
		element.html(text + '<span class="cursor">|</span>');

		i++;

		if (i < fullTxt.length) {
			setTimeout(typeWriter, 40);
		} else {
			// Печать завершена, убираем курсор
			setTimeout(() => {
				element.html(text); // без курсора
			}, 500); // небольшая задержка перед удалением курсора
		}
	}

	typeWriter();
});


  // Добавить в конец файла
function validateForm() {
  const name = $('input[name="name"]').val().trim();
  const email = $('input[name="email"]').val().trim();
  const message = $('textarea[name="message"]').val().trim();

  if (!name || !email || !message) {
    alert('Пожалуйста, заполните все обязательные поля.');
    return false;
  }

  return true;
}


  // Остановка видео после проигрывания
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('hero-video');
    
    if(video) {
        // Убираем цикличность
        video.removeAttribute('loop');
        
        // Обработчик окончания видео
        video.addEventListener('ended', function() {
            video.pause();
            
            // Для корректной остановки на последнем кадре в некоторых браузерах
            video.currentTime = video.duration;
        });

        // Запуск видео при скролле (если автоплей заблокирован)
        window.addEventListener('scroll', function handler() {
            if(window.scrollY > 100) {
                video.play().catch(() => {});
                window.removeEventListener('scroll', handler);
            }
        }, {once: true});
    }
});


$(document).ready(function() {
    // Для "Наши партнеры"
    $('.load-more-partners').on('click', function() {
        $('#our-team-section .row > .col-md-6.col-lg-15:hidden').slice(0, 3).show();
        if ($('#our-team-section .row > .col-md-6.col-lg-15:hidden').length === 0) {
            $(this).hide(); // Скрываем кнопку, если больше нет скрытых карточек
        }
    });

    // Для "Наши клиенты"
    $('.load-more-clients').on('click', function() {
        $('#clients-section .row > .col-6.col-md-4.col-lg-3:hidden').slice(0, 4).show();
        if ($('#clients-section .row > .col-6.col-md-4.col-lg-3:hidden').length === 0) {
            $(this).hide(); // Скрываем кнопку, если больше нет скрытых карточек
        }
    });
});

 // Обработчики для ссылок в карточке "О компании"
  document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const nextBtn = document.querySelector(".carousel-nav.next");
  const prevBtn = document.querySelector(".carousel-nav.prev");
  const CLICK_THRESHOLD = 5;

  let currentIndex = 0;
  let autoplay;
  let isDragging = false;
  let hasMoved = false;
  let touchMoved = false;
  let startX = 0;
  let touchStartX = 0;
  let prevTranslate = 0;
  let currentTranslate = 0;

  // Центрирование первого слайда
  function applyInitialPadding() {
    const firstSlide = slides[0];
    const container = track.parentElement;
    const slideW = firstSlide.offsetWidth;
    const contW = container.offsetWidth;
    track.style.paddingLeft = `${(contW - slideW) / 2}px`;
  }

  // Перемещение карусели на currentIndex
  function updateCarousel() {
    const slide = slides[currentIndex];
    const slideW = slide.offsetWidth;
    const cont = track.parentElement;
    const contW = cont.offsetWidth;
    const offset = slide.offsetLeft - (contW - slideW) / 2;

    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${offset}px)`;

    slides.forEach((s, i) => {
      s.classList.toggle("current", i === currentIndex);
      s.classList.toggle("prev", i === (currentIndex - 1 + slides.length) % slides.length);
      s.classList.toggle("next", i === (currentIndex + 1) % slides.length);
    });
  }

  function resetAutoplay() {
    clearInterval(autoplay);
    autoplay = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    }, 5000);
  }
  
  



  // Навигация кнопками
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
    resetAutoplay();
  });
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
    resetAutoplay();
  });

  // Drag / Touch-события на track, но игнорируем, если началось по ссылке
  const trackContainer = track.parentElement;
  trackContainer.style.cursor = "grab";
  trackContainer.style.userSelect = "none";

  trackContainer.addEventListener("mousedown", (e) => {
    if (e.target.closest("a.card-tov")) return;
    isDragging = true;
    hasMoved = false;
    startX = e.pageX;
    prevTranslate = getCurrentOffset();
    track.style.transition = "none";
    clearInterval(autoplay);
    trackContainer.style.cursor = "grabbing";
  });

  trackContainer.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const dx = e.pageX - startX;
    if (Math.abs(dx) > CLICK_THRESHOLD) hasMoved = true;
    currentTranslate = prevTranslate + dx;
    track.style.transform = `translateX(${currentTranslate}px)`;
  });

  trackContainer.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    dragEnd(e.pageX);
  });

  trackContainer.addEventListener("mouseleave", (e) => {
    if (!isDragging) return;
    isDragging = false;
    dragEnd(e.pageX);
  });

  trackContainer.addEventListener("touchstart", (e) => {
    if (e.target.closest("a.card-tov")) return;
    isDragging = true;
    touchMoved = false;
    touchStartX = e.touches[0].clientX;
    prevTranslate = getCurrentOffset();
    track.style.transition = "none";
    clearInterval(autoplay);
  });

  trackContainer.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const dx = currentX - touchStartX;
    if (Math.abs(dx) > CLICK_THRESHOLD) touchMoved = true;
    currentTranslate = prevTranslate + dx;
    track.style.transform = `translateX(${currentTranslate}px)`;
  });

  trackContainer.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    isDragging = false;
    dragEnd(e.changedTouches[0].clientX);
  });

  function dragEnd(endX) {
    const dx = endX - startX;
    const slideW = slides[0].offsetWidth;
    if (dx < -slideW / 3 && currentIndex < slides.length - 1) {
      currentIndex++;
    } else if (dx > slideW / 3 && currentIndex > 0) {
      currentIndex--;
    }
    updateCarousel();
    resetAutoplay();
    trackContainer.style.cursor = "grab";
  }

  function getCurrentOffset() {
    const style = window.getComputedStyle(track);
    const matrix = new WebKitCSSMatrix(style.transform);
    return matrix.m41;
  }

  // Обработчик клика/тач по карточке
  document.querySelectorAll("a.card-tov").forEach(card => {
    card.addEventListener("click", function(e) {
      // если до этого был drag/swipe — не обрабатываем клик
      if (hasMoved) {
        hasMoved = false;
        return;
      }
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    });
    card.addEventListener("touchend", function(e) {
      if (touchMoved) {
        touchMoved = false;
        return;
      }
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    });
  });


  

  // Старт
  applyInitialPadding();
  updateCarousel();
  autoplay = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }, 5000);

  window.addEventListener("resize", () => {
    applyInitialPadding();
    updateCarousel();
  });
});

const track = document.querySelector('.carousel-track-container');

track.addEventListener('mousedown', e => {
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  isDragging = false;
});

track.addEventListener('mousemove', e => {
  const dx = Math.abs(e.clientX - dragStartX);
  const dy = Math.abs(e.clientY - dragStartY);
  if (dx > 5 || dy > 5) {
    isDragging = true;
  }
});

track.addEventListener('mouseup', () => {
  setTimeout(() => { isDragging = false; }, 50); // сброс после возможного клика
});

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('atomic-animation');

  // берём реальные размеры контейнера
  function getSize() {
    const rect = container.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  }

  let { width, height } = getSize();

  // 1) Сцена и камера
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000);
  camera.position.set(0, 2, 16);

  // 2) Рендерер с прозрачным фоном
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  // дополнительно явно сбросим цвет фона
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // ... остальной код геометрии, света, анимации тот же, только цвет рёбер синий:

  const radius  = 4,
        subdiv  = 3,
        icoGeom = new THREE.IcosahedronGeometry(radius, subdiv);

  const edgesGeom = new THREE.EdgesGeometry(icoGeom);
  const edgesMat  = new THREE.LineBasicMaterial({ color: 0x007bff, linewidth: 1 });
  const wireframe = new THREE.LineSegments(edgesGeom, edgesMat);
  scene.add(wireframe);

  scene.add(new THREE.AmbientLight(0x404040));
  const light1 = new THREE.PointLight(0xffffff, 1);
  light1.position.set(5, 5, 5);
  scene.add(light1);

  function animate() {
    requestAnimationFrame(animate);
    wireframe.rotation.y += 0.002;
    scene.rotation.x     += 0.001;
    renderer.render(scene, camera);
  }
  animate();

  // При ресайзе перерасчитываем размеры и камеру
  window.addEventListener('resize', () => {
    const size = getSize();
    renderer.setSize(size.width, size.height);
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
  });
});

// -----------------------------------------------------------Рабочий	1
// <- Используем ID секции
// script.js
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-navbar');
    // Собираем обе целевые секции в массив
    const targetSections = Array.from(
      document.querySelectorAll('.ocomp, .forma1')
    );
    let lastScrollY = window.scrollY;
    let rafId = null;
    const offset = 2;

    if (!header || targetSections.length === 0) return;

    // Для одной секции получим её верх и низ в координатах документа
    const getSectionBounds = (el) => {
        const rect = el.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY,
            bottom: rect.bottom + window.scrollY
        };
    };

    const updateHeaderState = () => {
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';

        // Собираем все границы секций
        const bounds = targetSections.map(getSectionBounds);

        // Проверяем, находимся ли мы внутри какой-либо из секций
        const isInAny = bounds.some(b => 
          currentScrollY >= b.top && currentScrollY <= b.bottom
        );

        // Находим самую «верхнюю» и самую «нижнюю» границы для общего поведения вне секций
        const topMin    = Math.min(...bounds.map(b => b.top));
        const bottomMax = Math.max(...bounds.map(b => b.bottom));

        const isAboveAll = currentScrollY < topMin;
        const isBelowAll = currentScrollY > bottomMax + offset;

        if (isInAny) {
            // Внутри любой из целевых секций — прячем
            header.classList.add('site-navbar--hidden');
        } else if (isAboveAll) {
            // Выше всех — показываем только при скролле вверх
            if (scrollDirection === 'up') {
                header.classList.remove('site-navbar--hidden');
            }
        } else if (isBelowAll) {
            // Ниже всех — всегда показываем
            header.classList.remove('site-navbar--hidden');
        } else {
            // Между секциями (или только что вышли) — показываем
            header.classList.remove('site-navbar--hidden');
        }

        lastScrollY = currentScrollY;
        rafId = null;
    };

    window.addEventListener('scroll', () => {
        if (!rafId) rafId = requestAnimationFrame(updateHeaderState);
    }, { passive: true });

    window.addEventListener('resize', () => {
        if (!rafId) rafId = requestAnimationFrame(updateHeaderState);
    }, { passive: true });
});


const mappings = [
  { from: 'main-page1', to: 'ocomp' },
  { from: 'ocomp', to: 'main-page1' },
  { from: 'nclin',      to: 'forma1' },
  { from: 'scroloc',      to: 'tovarr' },
];

window.addEventListener('wheel', function(e) {
  if (e.deltaY <= 0) return; // только скролл вниз

  const y = window.scrollY;
  const H = window.innerHeight;

  for (let {from, to} of mappings) {
    const src = document.getElementById(from);
    const dst = document.getElementById(to);
    if (!src || !dst) continue;

    const top = src.offsetTop;
    const bottom = top + src.offsetHeight;

    if (y >= top - H * 0.1 && y < bottom - H * 0.9) {
      e.preventDefault();
      dst.scrollIntoView({ behavior: 'smooth', block: 'start' });
      break;
    }
  }
}, { passive: false });


document.querySelectorAll('.scroll-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const slideIndex = parseInt(this.dataset.slide, 10);
    const tovarr = document.getElementById('tovarr');
    if (!tovarr) return;

    // 1. Скроллим до секции "Товары"
    tovarr.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // 2. Через 600 мс вызываем переключение карусели
    setTimeout(() => {
      goToSlide(slideIndex);
    }, 600);
  });
});

function goToSlide(index) {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');

  if (!track || slides.length === 0) return;

  const slideWidth = slides[0].offsetWidth;
  track.style.transform = `translateX(-${index * slideWidth}px)`;
}

const fileInput = document.getElementById('file');
    const label = document.querySelector('.custom-file-label1');
    fileInput.addEventListener('change', () => {
      label.textContent = fileInput.files.length
        ? fileInput.files[0].name
        : 'Добавить файл';
    });

document.querySelectorAll("a.card-tov").forEach(card => {
  card.addEventListener("click", function (e) {
    if (isDragging) {
      e.preventDefault(); // отменяем переход, если был drag
      return;
    }

    const href = this.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  });
});