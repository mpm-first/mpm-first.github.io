jQuery(function($) {

  var hash = window.location.hash;
  if (hash.trim()) window.location = window.location.href.replace(hash, "");

  var $win = $(window);
  var $doc = $(document);
  var $html = $('html');
  var $body = $('body');

  //
  // Toggles the footer to display as
  // a fixed overlay menu
  //
  $('.burger').click(function(event) {
    event.preventDefault();
    if ($body.hasClass('opened'))
      return $body.removeClass('opened');
    $body.addClass('opened');
  });

  //
  // Hides the burger if we're scrolled near the footer
  // since the footer is our main navigation
  //
  function burger(event) {
    var scrolled   = $win.scrollTop() + $win.height();
    var til_footer = $doc.height() - $win.height();
    var has_class  = $body.hasClass('bottom');
    if (scrolled >= til_footer && !has_class)
      return $body.addClass('bottom');
    else if (scrolled < til_footer && has_class)
      return $body.removeClass('bottom');
  }
  $win.on('scroll.burger', burger);

  //
  // Video player
  //
  if (!!$('#player').length) {
    var player_config = {
      controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
      debug: true
    };
    var player = new Plyr('#player', player_config);
    var $video_anchor = $('#home .video-anchor');
    
    $video_anchor.on('click.home', function(event) {
      $('#video').show();
      player.play();
    });
  }

  //
  // Clients scroll
  //
  var $work = $('#work');
  var $slider_wrapper = $('.slider-wrapper', $work);
  var $slider = $('.slider', $slider_wrapper);
  var work_offset;
  var work_threshold;

  function clients_scroll(event) {

    var distance = $win.scrollTop();
    var left_scroll = distance - work_offset;
        left_scroll = (left_scroll > 0) ? left_scroll : 0;
        left_scroll = (left_scroll <= $slider_wrapper.width()) ? left_scroll : $win.width();

    if (distance >= work_offset && distance < work_threshold) {
      $slider_wrapper.removeClass('docked').addClass('fixed');
      return $slider.css('left', '-' + left_scroll + 'px');
    }

    if (distance >= work_threshold) {
      $slider_wrapper.removeClass('fixed').addClass('docked');
      return $slider.css('left', '-' + left_scroll + 'px');
    }

    if ($slider_wrapper.hasClass('fixed') || $slider_wrapper.hasClass('docked'))
      $slider_wrapper.removeClass('fixed').removeClass('docked');
      return $slider.css('left', '0px');
  }

  function clients_values() {
    work_offset = $work.offset().top;
    work_threshold = work_offset + $work.height() - $win.height();
  }

  $win.on('scroll.clients', clients_scroll);
  $win.on('resize.clients', clients_values);
  clients_values();


});