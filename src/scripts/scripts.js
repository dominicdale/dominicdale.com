$(function(){
  figure = $('.gallery figure');
  wrapper = $('.wrapper');
  overlay = $('.overlay');

  figure.click(function(){
    wrapper.toggleClass("shrink");
    overlay.toggleClass("slide");
  })

  $('.close').click(function(){
    overlay.toggleClass("slide");
    wrapper.toggleClass("shrink");
  })
})
