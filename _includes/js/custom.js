function iOSversion(useragent) {
  if (/iP(hone|od|ad|od Touch)/.test(useragent)) {
    // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
    var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
  }
  return false;
}
$(window).on('orientationchange', function(e) {
	window.location.reload();
});

$( document ).ready(function() {


	var useragent = navigator.userAgent;
	//check for old stock Android browser
	//to remove position fixed and background attachment fixed
	if(	(useragent.indexOf("Mozilla/5.0") > -1) &&
		(useragent.indexOf("Android") > -1) &&
		(useragent.indexOf("Chrome") == -1)
	) {
		$('body').addClass('old_Android');
	}

	//check for Android
	//to remove animation
	if(useragent.indexOf("Android") > -1) $('body').addClass('Android');

	//check for old iOS version 
	//to remove position fixed
	var iOS_version = iOSversion(useragent);
	if(iOS_version[0]<5) $('body').addClass('old_iOS');
	if(iOS_version[0]>6) $('body').addClass('new_iOS');

	//check for iOS 
	//to remove background attachment fixed and animation
	var iOS = /(iPad|iPhone|iPod)/g.test(useragent);
	if(iOS) $('body').addClass('iOS');

	//detect browser with Touch Events running on touch-capable device
	if ('ontouchstart' in window) {
	     $('body').addClass('touch');
	}

	if(!$('body').hasClass('old_Android') && !$('body').hasClass('old_iOS')) {
		//if modern browser
	}

	if($('body').hasClass('Android') || $('body').hasClass('iOS')) {
		//no animation
	}
	else {
		//animation
	}

	// init Isotope
	var $grid = $('.grid').isotope({
	  itemSelector: '.item'
	});
	// bind filter button click
	$('.filters-button-group').on( 'click', 'button', function() {
	  var filterValue = $( this ).attr('data-filter');
	  $grid.isotope({ filter: filterValue });
	  $( window ).resize();
	});
	
	if(window.location.hash) {
    // Fragment exists
		$('.button').each(function() {
			var hashFilter = '.'+window.location.hash.substring(1);
			if($(this).attr('data-filter') == hashFilter) {
				$('.filters-button-group').find('.is-checked').removeClass('is-checked');
      	$('.filters-button-group').find('[data-filter="' + hashFilter + '"]').addClass('is-checked');
				$grid.isotope({ filter: hashFilter });
			}
		});
	}

	// change is-checked class on buttons
	$('.button-group').each( function( i, buttonGroup ) {
	  var $buttonGroup = $( buttonGroup );
	  $buttonGroup.on( 'click', 'button', function() {
	    $buttonGroup.find('.is-checked').removeClass('is-checked');
	    $( this ).addClass('is-checked');
	  });
	});

	$( ".vertline.red" ).toggleClass('changed');
	$( ".vertline.red:not(.horizontal)" ).each(function() {
		if($(this).parent().hasClass('overlay')) $(this).css('height','270px');
		else if ($(this).hasClass('category')) $(this).css('height','162px');
		else if ($(this).hasClass('contact')) $(this).css('height','370px');
		else $(this).css('height','250px');
	});
	$( ".vertline.horizontal" ).css('width','300px');
	$( ".vertline.fullheight" ).css('height','calc(100vh - 50px)');
	$( ".vertline > div" ).each(function() {
		$(this).css('opacity','1');
	});

	$('img').one("load", function() {
		$( window ).resize();
	});

  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname && !$(this).hasClass('carousel-control')) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

	$('a').click(function(){
		if($(this).parent().parent().parent().hasClass('offcanvas')) {
			$('body').click();
		}
	});

	$('.navbar-toggle.top').click( function(event) {
		event.preventDefault();
		event.stopPropagation();
		
		var position = $('.verttext').position();
		if(parseInt($(this).find('span:nth-child(2)').css('left'))<300 || $(this).find('span:nth-child(2)').css('left') == 'auto') {
			sessionStorage.menuopen = 'true';
			$('.navbar-nav > li').stop( true, true ).delay(300).animate({
				opacity: 1
  		}, 200, function() {
    		// Animation complete. Menu is now visible.
  		});
			$(this).find('span:nth-child(2)').stop( true, true ).animate({
				left: (position.left - parseInt($('.vertline').css('left')) + 20)
  		}, 600, function() {
    		// Animation complete. Menubar has slid to the right.
  		});
		} else {
			sessionStorage.menuopen = 'false';
			$('.navbar-nav > li:visible').not(':nth-child(4)').stop( true, true ).delay(300).animate({
				opacity: 0
  		}, 200, function() {
    		// Animation complete. Menu is now hidden.
  		});
			$(this).find('span:nth-child(2), :nth-child(4)').stop( true, true ).animate({
    		left: "10"
  		}, 600, function() {
    		// Animation complete. Menubar has slid to the left.
  		});			
		}
	});
	$( window ).resize();
});


$( window ).resize(function() {
	$('body').css('height','auto');
	$('footer').css('position','static');
	if($('body').height() <= $('html').height()) {
		$('body').css('height','100%');
		$('footer').css('position','absolute');
	}
	$('.fullheight').css('height',($('body').height()-50)+'px');
	
	var offset = $( ".fullheight" ).offset();
	if(offset.left < 43) {
		//als links buiten het scherm, zet binnen het scherm
		$('.fullheight, .navbar-toggle.top').css('left', (-($(document).width()-$('.container').width())/2 + 55) +'px');
	} else {
		if($(document).width()>1650) {
			$('.fullheight, .navbar-toggle.top').css('left', '-200px');
		}	else if(($(document).width()-$('.container').width()) > 115) {
			$('.fullheight, .navbar-toggle.top').css('left',(-($(document).width()-$('.container').width())/2 + 55) +'px');
		} else {
			$('.fullheight, .navbar-toggle.top').css('left', '0px');
		}
	}
	var offset = $( ".verttext" ).offset();
	if(offset.right < 43) {
		//als links buiten het scherm, zet binnen het scherm
		$('.verttext').css('right', (-($(document).width()-$('.container').width())/2 + 55) +'px');
	} else {
		if($(document).width()>1650) {
			$('.verttext').css('right', '-200px');
		}	else if(($(document).width()-$('.container').width()) > 115) {
			$('.verttext').css('right',(-($(document).width()-$('.container').width())/2 + 55) +'px');
		} else {
			$('.verttext').css('right', '20px');
		}
	}
	if((640 + $('.verttext').width() + 30) > $(document).height()) {
		$('.verttext').css('top', ($(window).height() - $('.verttext').width() - 50)+'px');
	} else {
		$('.verttext').css('top', '640px');
	}
	$('.verttext').css('opacity','1');


  if(sessionStorage.menuopen == 'true') {
			$('.navbar-nav > li').css('opacity','1');
			var position = $('.verttext').position();
			$('.navbar-toggle.top').find('span:nth-child(2)').css('left',(position.left - parseInt($('.vertline').css('left')) + 20)+'px');
	}
});