// $.lazyLoadXT.onload = function() {
//   var $el = $(this);
//   $el
//     .removeClass('lazy-hidden')
//     .addClass('animated fadeIn');
// };

init();


function checkAnchor() {
  $('#content a').each(function() {
    var a = new RegExp('/' + window.location.host + '/');
    if(!a.test(this.href)) {
      $(this).click(function(event) {
      event.preventDefault();
      event.stopPropagation();
      window.open(this.href, '_blank');
      });
    }
  });
  console.log("links checked")
}

function init() {
  console.log('init');
  $(window).lazyLoadXT();
  checkAnchor();
};

$(function(){
  var $body = $('html, body'),
    $loader = $('.loader'),
    content = $('#content').smoothState({
      prefetch: true,
      onStart: {
        duration: 250, // Duration of our animation
        pageCacheSize: 4,
        render: function (url, $container) {
          // toggleAnimationClass() is a public method
          // for restarting css animations with a class
          content.toggleAnimationClass('is-exiting');
          $body.animate({
            scrollTop: 0
          });
        }
      },
      onProgress : {
        duration: 0,
        render: function (url, $container) {
          $loader.addClass('loading');
          console.log('loading');
        }
      },
      onEnd : {
        duration: 0,
        render: function (url, $container, $content) {
          $loader.removeClass('loading');
          $container.html($content).promise().done(function(){
            init();
            // $content.lazyLoadXT();
          })
        }
      }
    }).data('smoothState');

});

