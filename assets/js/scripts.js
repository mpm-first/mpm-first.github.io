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

  // var num = 0;
  // var $work = $('#home #work');
  // var $panels = $('.panel', $work);

  // $('.trigger').on('click', function(event) {

  //   event.preventDefault();

  //   var $t = $(this);
  //   var offset = $work.offset().top;

  //   if ($t.hasClass('next')) {
  //     num = (num + 1 > $panels.length - 1) ? $panels.length - 1 : num + 1;
  //     window.scrollTo(0, offset + ($win.width() * num));
  //   } else {
  //     num = (num - 1 < 0) ? 0 : num - 1;
  //     window.scrollTo(0, offset + ($win.width() * num));
  //   }
  // });

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
  var work_offset;
  var work_threshold;
  var is_mobile = false;
  var $work = $('#work');
  var $slider_wrapper = $('.slider-wrapper', $work);
  var $slider = $('.slider', $slider_wrapper);
  var $panels = $('.panel', $slider);

  $work.addClass('has-panels panels-'+$panels.length);

  function clients_scroll(event) {

    if (is_mobile || $work.hasClass('panels-1')) {
      return $slider_wrapper.removeClass('fixed').removeClass('docked');
    }

    clients_values();

    var distance = $win.scrollTop();

    var max_scroll = ($panels.length - 1) * $win.width();
    var left_scroll = distance - work_offset;
        left_scroll = (left_scroll > 0) ? left_scroll : 0;
        left_scroll = (left_scroll <= max_scroll) ? left_scroll : max_scroll;

    if (distance >= work_offset && distance < work_threshold) {
      $slider_wrapper.removeClass('docked').addClass('fixed');
      return $slider.css('left', '-' + left_scroll + 'px');
    }

    if (distance >= work_threshold) {
      $slider_wrapper.removeClass('fixed').addClass('docked');
      return $slider.css('left', '-' + left_scroll + 'px');
    }

    if ($slider_wrapper.hasClass('fixed') || $slider_wrapper.hasClass('docked')) {
      $slider_wrapper.removeClass('fixed').removeClass('docked');
      return $slider.css('left', '0px');
    }
  }

  function clients_values() {
    is_mobile = $win.width() < 1280;
    work_offset = $work.offset().top;
    work_threshold = work_offset + $work.height() - $win.height();

    if (is_mobile) {
      $work.addClass('is-mobile');
      $slider.css('left', '0');
    } else {
      $work.removeClass('is-mobile');
    }
  }

  if (!!$('#home').length) {
    $win.on('scroll.clients', clients_scroll);
    $win.on('resize.clients', clients_values);
    clients_values();
  }


});