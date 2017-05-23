$(function(){

  // variables

  figure = $('.gallery figure');
  wrapper = $('.wrapper');
  overlay = $('.overlay');
  overlayContent = $('.overlay-content');
  overlayLoading = $('.overlay-loading');


  // Click on gallery item

  figure.click(function(){
    $('body').toggleClass('no-scroll');
    wrapper.toggleClass('shrink');
    overlay.toggleClass('slide');
    overlay.scrollTop(0);
    overlay.css('background-color', $(this).data('color'));
    $('.close').toggleClass('active');
    overlayLoading.toggleClass('active');
    overlayContent.load($(this).data('url'), function(){
      setTimeout(function(){
        overlayLoading.removeClass('active');
        overlayContent.addClass('active');
      }, 1500)
    });
  })


  // Close gallery overlay

  $('.close').click(function(){
    $('body').toggleClass('no-scroll');
    overlay.toggleClass('slide');
    wrapper.toggleClass('shrink');
    overlayLoading.removeClass('active');
    overlayContent.removeClass('active');
  })


  // smooth scrolling

  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 600);
        return false;
      }
    }
  });


})
