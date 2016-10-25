var delay = 5000;
var transition = 1000;
var crtImage = $('.visible');
var nextImage;

/**
 * we define the animation interval
 */
var interval = setInterval(rotate, delay);

function rotate(){
  crtImage = $('.visible');
  nextImage = crtImage.next();

  /**
   * we check that the next image exist
   * if it does not exist, then the next image will be first
   */
  if(nextImage.length == 0){
    nextImage = $('.slide img').first();
  }

  nextImage.addClass('next');

    /**
     * We define the animation
     */
  crtImage.animate({
    'opacity':'0'
  }, transition, function(){
    crtImage.removeClass('visible');
    nextImage.removeClass('next').addClass('visible');
      /**
       * We make the current image visible again for the next cicle
       */
    crtImage.css('opacity', '1');
      /**
       * We change the current link
       */
    var crtLink = $('.current');
    var nextLink = crtLink.next();
    if(nextLink.length == 0){
      nextLink = $('.controls a').first();
    }
    crtLink.removeClass('current');
    nextLink.addClass('current');
  });
}

/**
 * We add events for mouse enter/leave
 */
$('.slide img').on('mouseenter', function(){
    /**
     * We stop the animation
     */
  clearInterval(interval);
});
$('.slide img').on('mouseleave', function(){
    /**
     * We restart the animation
     */
  interval = setInterval(rotate, delay);
});

$('.controls a').on('click', changeImage);

function changeImage(e){
    /**
     * We disable the default functionality of the link
     */
  e.preventDefault();
  $('.current').removeClass('current');
  $(this).addClass('current');

    /**
     * We find out on what bullet the user cliecked
     */
  var slide = $(this).data('slide') - 1;

    /**
     * We stop any animation in progress
     */
  crtImage.stop();
  crtImage.css('opacity', '1');

    /**
     * We select the proper image
     */
  crtImage = $($('.slide img').get(slide));
    /**
     * We remove visible class from the current image
     * We add the visible class to the previous image
     */
  $('.visible').removeClass('visible');
  crtImage.addClass('visible');

  nextImage = crtImage.next();
  if(nextImage.length == 0){
    nextImage = $('.slide img').first();
  }
  $('.next').removeClass('next');
  nextImage.addClass('next');

  clearInterval(interval);
  interval = setInterval(rotate, delay);
}
