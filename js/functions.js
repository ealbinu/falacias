/*---------Main---------*/

var interval = undefined;
var currentSlider;
$(document).ready(function () {
		//interval = setInterval(getNext, 2000);
    $('.js-next-btn').on('click', getNext);
    $('.js-prev-btn').on('click', getPrev);
	});

	function getNext() {
	    var $curr = $('.o-slideshow .js-wrapper-container:visible'),
	        $next = ($curr.next().length) ? $curr.next() : $('.o-slideshow .js-wrapper-container').first();
      transition($curr, $next);
      slideActions($next);
	}

	function getPrev() {
	    var $curr = $('.o-slideshow .js-wrapper-container:visible'),
	        $next = ($curr.prev().length) ? $curr.prev() : $('.o-slideshow .js-wrapper-container').last();
	    transition($curr, $next);
      slideActions($next);
	}

	function transition($curr, $next) {
	    clearInterval(interval);
	    $next.css('z-index', 2).fadeIn('fast', function () {
	        $curr.hide().css('z-index', 0);
	        $next.css('z-index', 1);
	    });
      currentSlider = $next;
}

$ (document).ready(function() {
	/*$('.js-next-btn').click(function(){
	   $(this).parent().next().show();//hide parent and show next
	});

	$('.js-back-btn').click(function(){
	   $(this).parent().prev().show();//hide parent and show previous
	});*/

  slideActions($('.o-slideshow .js-wrapper-container:visible'));

  $('.u-evaluation .u-options .answer').click(function(){
    var _this = $(this);
    _this.addClass('u-clicked').removeClass('answer');
    if(_this.is('[data-ok]')){
      currentSlider.removeAttr('data-hide-next');
      _this.parent().next('.u-feedback').show();
    } else {
      _this.addClass('animated shake');
      setTimeout(function(){ _this.removeClass('u-clicked animated shake')},1000);
      _this.addClass('answer');
      _this.parent().next('.u-feedback').find('.error').show();
    }


    slideActions(currentSlider);
  });




  $('.u-evaluation .u-complete .u-check').click(function(){
    var _this = $(this);
    var okay = false;


    _this.closest('.u-complete').find('.select select').each(function(){
      if( $(this).val()!='ok' ){
        okay = false;
        return false;
      } else {
        okay = true;
      }
    });
    if(okay){
      currentSlider.removeAttr('data-hide-next');
      _this.parent().next('.u-feedback').show();
    } else {
      $('.select').addClass('animated shake');

      _this.addClass('animated shake');
      setTimeout(function(){
        _this.removeClass('animated shake');
        $('.select').removeClass('animated shake');
        $('.select select').val('');
      },1000);
    }


    slideActions(currentSlider);
  });

  $('[data-modal]').click(function(){
    $($(this).attr('data-modal')).toggle();
  });

  $('.modal .close').click(function(){
    $(this).closest('.modal').hide();
  });

  $('.u-remember .btn').click(function(){
    $(this).next('.content').toggle();
    $(this).toggleClass('active');
  });

  $('.u-again .btn').click(function(){
    $(this).closest('.u-feedback').hide();
    $(this).closest('.u-feedback').find('.result div').hide();
    $(this).closest('.u-evaluation').find('.u-clicked').removeClass('u-clicked');
    $(this).closest('.u-evaluation').find('.u-options div').addClass('answer');
    $(this).closest('.u-evaluation').find('.u-complete select').val('');
  });

});



// ATTR[data-hide-next] en slide para ocultar prev o next
function slideActions(slide){
  $('.o-navbar-btn .js-next-btn').toggle(!slide.is('[data-hide-next]'));
  $('.o-navbar-btn .js-prev-btn').toggle(!slide.is('[data-hide-prev]'));

}
