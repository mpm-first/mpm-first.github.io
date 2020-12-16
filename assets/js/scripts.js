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
  if (!!$('#home .player').length) {

    var player_config = {
      controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
      autoplay: true,
      debug: true
    };

    /* TODO - build this object on DOM ready */
    var players = {
      'our-video': null,
      'surgical-reel': null
    };
    
    $('#home .video-anchor').on('click.home', function(event) {

      // This anchor relates to the keys in `players` with the `#`
      var href = $(this).attr('href');

      // Loop over keys in our `players` object to open any new players and close old ones
      // This allows us to have any number of videos
      for (key in players) {

        // If current key in iteration is related to the video anchor clicked
        if (key === href.substring(1)) {

          // If there isn't a player object set yet for the key, instantiate one
          if (!players[key]) players[key] = new Plyr(href+'-player', player_config);

          // Start the video and show this player
          players[key].play();
          $(href).show()

        // Stop and close all other players
        } else if (players[key]) {
          players[key].stop();
          $('#'+key).hide();
        }
      }
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
      console.log('is mobile');
      $slider_wrapper.removeClass('fixed').removeClass('docked');
      return true;
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
      $slider.css('left', 'auto');
    } else {
      $work.removeClass('is-mobile');
    }
  }

  // Bind all of this only on the Homepage
  if (!!$('#home').length) {
    $win.on('scroll.clients', clients_scroll);
    $win.on('resize.clients', clients_values);
    clients_values();
  }

  //
  // Replace video background on home with still image
  //

});