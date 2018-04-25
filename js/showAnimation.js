var checkAnimate=0;
(function($) {

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *     the user visible viewport of a web browser.
     *     only accounts for vertical position, not horizontal.
     */
  
    $.fn.visible = function(partial) {
      
        var $t            = $(this),
            $w            = $(window),
            viewTop       = $w.scrollTop() + 33,
            viewBottom    = viewTop + $w.height(),
            _top          = $t.offset().top,
            _bottom       = _top + $t.height(),
            compareTop    = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;
      
      return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
  
    };
      
  })(jQuery);
 function checkItemThenAddClass()
 {
    $(".animate").each(function(i, el) {
        var el = $(el);
        if (el.visible(true)) {
            el.addClass("come-in"); 
        } else if(el[0].classList.contains("come-in"))
            el[0].classList.remove("come-in");
        });
 }
  $(window).scroll(function(event) {
    if(checkAnimate==0)
        checkItemThenAddClass();
    checkAnimate++;
    checkAnimate=checkAnimate%8;//減少判斷次數 減少卡頓

    
  });
  $(()=>
  {
    checkItemThenAddClass();
  });