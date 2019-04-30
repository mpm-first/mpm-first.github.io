jQuery(function($) {

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
    $win.on('scroll', burger);

    //
    // Video player
    //
    var player_config = {
      controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
      debug: true
    };
    var player = new Plyr('#player', player_config);
    var $video_anchor = $('#home .video-anchor');
    
    $video_anchor.on('click.home', function(event) {
      $('#video').show();
      player.play();
    })

});