$(function(){
  figure = $('.gallery figure');
  wrapper = $('.wrapper');
  overlay = $('.overlay');

  figure.click(function(){
    wrapper.toggleClass("shrink");
    overlay.toggleClass("slide");
    overlay.css('background-color', $(this).data("color"));
    $('.close').toggleClass('active');
    $('.overlay-loading').toggleClass('active');
    $('.overlay-content').load($(this).data("url"), function(){
      $('.overlay-loading').removeClass('active');
    });
  })


  $('.close').click(function(){
    $(this).removeClass('active');
    overlay.toggleClass("slide");
    wrapper.toggleClass("shrink");
    $('.overlay-loading').removeClass('active');
  })

})
