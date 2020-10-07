
/*
  [JS Index]

  ---

  Template:  Ner - Personal Portfolio Template.
  Template URL: http://nero-per.bitballoon.com
  Author:  design_grid
  Version: 1.0
*/


$(function () {

  "use strict";

  var wind = $(window);


  /* smooth scroll
  -------------------------------------------------------*/
  $.scrollIt({

    easing: 'swing',      // the easing function for animation
    scrollTime: 900,       // how long (in ms) the animation takes
    activeClass: 'active', // class given to the active nav element
    onPageChange: null,    // function(pageIndex) that is called when page is changed
    topOffset: -63

  });


  /* navbar scrolling background and change logo
  -------------------------------------------------------*/
  wind.on("scroll",function () {

      var bodyScroll = wind.scrollTop(),
          navbar = $(".navbar");

      if(bodyScroll > 150){

          navbar.addClass("nav-scroll");
          $('.navbar-brand img').attr('src','img/logo.png');


      }else{

          navbar.removeClass("nav-scroll");
          $('.navbar-brand img').attr('src','img/logo-2.png');

      }

  });

    function headHover() {
      if($(document).width() > 991) {
        $('.navbar .dropdown').hover(function() {
          $(this).find('.dropdown-menu').first().stop(true, true).delay(100).fadeIn();
        }, function() {
          $(this).find('.dropdown-menu').first().stop(true, true).delay(100).fadeOut()
        });
      } else {
          $(".navbar .dropdown").click('hover');
      }
  }

  headHover();



    $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
    if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass('show');


    $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
      $('.dropdown-submenu .show').removeClass("show");
    });


    return false;
  });



  /* sections background image from data background
  -------------------------------------------------------*/
  $( ".cover-bg" ).each(function() {
    var attr = $(this).attr('data-image-src');

    if (typeof attr !== typeof undefined && attr !== false) {
      $(this).css('background-image', 'url('+attr+')');
    }

  });


  /* typejs
  -------------------------------------------------------*/
  $('.header .caption h2 span').typed({
    strings: ["Designer","freelancer","Photographer","Web developer"],
    loop: true,
    startDelay: 1000,
    backDelay: 2000
  });


  /* progress bar
  -------------------------------------------------------*/
  wind.on('scroll', function () {
      $(".bar span").each(function () {
          var bottom_of_object =
          $(this).offset().top + $(this).outerHeight();
          var bottom_of_window =
          $(window).scrollTop() + $(window).height();
          var myVal = $(this).attr('data-width');
          if(bottom_of_window > bottom_of_object) {
            $(this).css({
              width : myVal
            });
          }
      });
  });


  /* Owl Caroursel testimonial
  -------------------------------------------------------*/
  $('.testimonial .owl-carousel').owlCarousel({
    loop:true,
    autoplay:true,
    items:1,
    margin:30,
    dots: false,
    nav: true,
    navText:['<span> <i class="jam jam-angle-left"></i> </span>',
        '<span> <i class="jam jam-angle-right"></i> </span>'],
  });


  // init the validator
  // validator files are included in the download package
  // otherwise download from http://1000hz.github.io/bootstrap-validator

  $('#contact-form').validator();


  // when the form is submitted
  $('#contact-form').on('submit', function (e) {

      // if the validator does not prevent form submit
      if (!e.isDefaultPrevented()) {
          var url = "contact.php";

          // POST values in the background the the script URL
          $.ajax({
              type: "POST",
              url: url,
              data: $(this).serialize(),
              success: function (data)
              {
                  // data = JSON object that contact.php returns

                  // we recieve the type of the message: success x danger and apply it to the
                  var messageAlert = 'alert-' + data.type;
                  var messageText = data.message;

                  // let's compose Bootstrap alert box HTML
                  var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';

                  // If we have messageAlert and messageText
                  if (messageAlert && messageText) {
                      // inject the alert to .messages div in our form
                      $('#contact-form').find('.messages').html(alertBox);
                      // empty the form
                      $('#contact-form')[0].reset();
                  }
              }
          });
          return false;
      }
  });


});


$(window).on("load",function (){

  /* Preloader
  -------------------------------------------------------*/
  $("#preloader").fadeOut(500);


  /* isotope
  -------------------------------------------------------*/
  var $gallery = $('.gallery').isotope({});
  $('.gallery').isotope({

      // options
      itemSelector: '.item-img',
      transitionDuration: '0.5s',

  });


  $(".gallery .single-image").fancybox({
    'transitionIn'  : 'elastic',
    'transitionOut' : 'elastic',
    'speedIn'   : 600,
    'speedOut'    : 200,
    'overlayShow' : false
  });


  /* filter items on button click
  -------------------------------------------------------*/
  $('.filtering').on( 'click', 'button', function() {

      var filterValue = $(this).attr('data-filter');

      $gallery.isotope({ filter: filterValue });

      });

  $('.filtering').on( 'click', 'button', function() {

      $(this).addClass('active').siblings().removeClass('active');

  });

})
