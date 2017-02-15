$(function(){
  figure = $('.gallery figure');
  wrapper = $('.wrapper');

  figure.click(function(){
    wrapper.toggleClass("shrink");
    $(this).toggleClass("active");
  })
})
