var delay = 5000;
var transition = 1000;
var crtImage = $('.visible');
var nextImage;

// definire interval animatie
var interval = setInterval(rotate, delay);

function rotate(){
  crtImage = $('.visible');
  nextImage = crtImage.next();

  //verific daca poza urmatoare nu exista
  //daca nu exista, poza urmatoare este prima poza
  if(nextImage.length == 0){
    nextImage = $('.slide img').first();
  }

  nextImage.addClass('next');

  //definesc animatia
  crtImage.animate({
    'opacity':'0'
  }, transition, function(){
    crtImage.removeClass('visible');
    nextImage.removeClass('next').addClass('visible');
    // fac poza curenta vizibila din nou pentru ciclul urmator de animatie
    crtImage.css('opacity', '1');
    // schimb link-ul curent
    var crtLink = $('.current');
    var nextLink = crtLink.next();
    if(nextLink.length == 0){
      nextLink = $('.controls a').first();
    }
    crtLink.removeClass('current');
    nextLink.addClass('current');
  });
}

// adaug evenimente mouse enter/leave
$('.slide img').on('mouseenter', function(){
  //intrerup animatia
  clearInterval(interval);
});
$('.slide img').on('mouseleave', function(){
  //repornesc animatia
  interval = setInterval(rotate, delay);
});

$('.controls a').on('click', changeImage);

function changeImage(e){
  // dezactivez functionalitatea implicita a link-ul
  e.preventDefault();
  $('.current').removeClass('current');
  $(this).addClass('current');

  //aflu pe ce bulina s-a dat click
  var slide = $(this).data('slide') - 1;

  // opresc orice animatie in desfasurare
  crtImage.stop();
  crtImage.css('opacity', '1');

  // selectez imaginea corespunzatoare
  crtImage = $($('.slide img').get(slide));
  // elimin class visible de la imaginea acutala
  //si adaug clasa pozei selectate anterior
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
