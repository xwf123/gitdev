require(['jquery', 'loginStart'], function($, lgs) {
    $(function() {
        lgs.start();
    });
});
/*
 *==========
 *导航初始化
 *==========
 */
require(['jquery', 'nav'], function($, nav) {
    $(function() {
        nav.init();
    });
});
/*导航跟随*/
require(['jquery'], function($) {

    // 添加
    $(function() {

        var nav = $('.button-nav-bg,.button-nav');

        var topmenu_top = nav.offset().top;
        reset_topmenu_top(nav, topmenu_top);
        $(window).scroll(function() {
            reset_topmenu_top(nav, topmenu_top);
        });
    });

    function reset_topmenu_top(nav, topmenu_top) {
        var document_scroll_top = $(document).scrollTop();
        if (document_scroll_top > topmenu_top) {
            nav.css('top', document_scroll_top);
        }
        if (document_scroll_top <= topmenu_top) {
            nav.css('top', topmenu_top);
        }
    }

    $('.button-lnav-list li').eq(0).on('click', 'a', function(ev) {
        ev.preventDefault();
        var href = $(this).attr('href');
        var pos = $(href).offset().top;
        $('html,body').animate({
            scrollTop: pos
        }, 1000);
    });
    $('.button-lnav-list li').eq(1).on('click', 'a', function(ev) {
        ev.preventDefault();
        var href = $(this).attr('href');
        var pos = $(href).offset().top;
        $('html,body').animate({
            scrollTop: pos - 80
        }, 1000);
    });
    $('.button-lnav-list li').eq(2).on('click', 'a', function(ev) {
        ev.preventDefault();
        var href = $(this).attr('href');
        var pos = $(href).offset().top;
        $('html,body').animate({
            scrollTop: pos - 60
        }, 1000);
    });
    $('.button-rnav-list li').eq(0).on('click', 'a', function(ev) {
        ev.preventDefault();
        var href = $(this).attr('href');
        var pos = $(href).offset().top;
        $('html,body').animate({
            scrollTop: pos + 30
        }, 1000);
    });
    $('.button-rnav-list li').eq(1).on('click', 'a', function(ev) {
        ev.preventDefault();
        var href = $(this).attr('href');
        var pos = $(href).offset().top;
        $('html,body').animate({
            scrollTop: pos - 40
        }, 1000);
    });
});
