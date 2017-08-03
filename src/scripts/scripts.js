$(function(){

  // variables
  body = $('body');
  figure = $('.gallery figure');
  overlay = $('.overlay');
  overlayContent = $('.overlay .overlay-content');
  overlayLoading = $('.overlay .overlay-loading');
  overlayClose = $('.overlay .close');


  // Click on gallery item
  figure.click(function(){
    body.toggleClass('gallery-active');
    overlay
      .toggleClass('slide')
      .scrollTop(0)
      .css('background-color', $(this).data('color'));
    overlayLoading.toggleClass('active');
    overlayContent.load($(this).data('url'), function(){
      setTimeout(function(){
        overlayLoading.removeClass('active');
        overlayContent.addClass('active');
      }, 1500)
    });
  });


  // Close gallery overlay
  overlayClose.click(function(){
    body.toggleClass('gallery-active');
    overlay.toggleClass('slide');
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
