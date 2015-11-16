/*
 *--------------
 *会员中心首页
 * author: leweiming
 * date: 2015/7/16
 *---------------
 */
/*global Vip:true,popsConfig:true,payBeforeConfig:true*/
/*
 *==========
 *登录退出
 *==========
 */
require(['jquery',
    'loginStart'
], function($, login) {
    $(function() {
        login.start();
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
/*
 *==========
 *懒加载
 *==========
 */
require(['jquery', 'lazyload',

], function($, lazyload) {
    $(function() {
        $('img').lazyload();
    });
});
/*
 *==========
 *领取福利
 *==========
 */
require(['jquery', 'lazyload',
    'tpl/index/tpl-index',
    'helpers/compare', 'state'
], function($, lazyload, tplIndex, compare, state) {
    $(function() {
        var welfareTpl = Vip['index/welfare'],
            $container = $('#J-today-welfare').find('.bd');
        var getRequest = function(renderCallback) {
            $.getJSON('http://mini.cron.youku.com/vipactive/active/index.php?c=welfare&a=getList&callback=?').done(function(res) {
                renderCallback(res);
            });
        };
        var render = function(res) {
            state.callback(res, {
                success: function(res) {
                    // 只取前三组数据
                    res.result.splice(3);
                    $container.html(welfareTpl(res));
                    $container.find('img').lazyload();
                }
            });
        };
        getRequest(render);
    });
});
/*
 *==========
 *轮播
 *==========
 */
require(['jquery', 'fullSlide','slider'
], function($, fullSlide,slider) {

    $(function() {
        $('.switch-list').fullSlide({
            effect: 'fadeEffect', // fadeEffect or moveEffect
            moveDirection: 'left', //left or top 
            containerWidth: '100%',
            containerHeight: '470px',
            isHoverPause: true,
            isPlayNumber: true,
            isDirbtn: true,
            startIndex: 0,
            intervalTime: 4000,
            effectDuration: 800
        });
    });
    $(function() {
        $('.lastest-online').slider({
            // moveItems: 2,
            width: 1190,
            height: 300,
            itemWidth: 200,
            gutter: 20
        });
        $('.coming-movie').slider({
            // moveItems: 2,
            width: 1190,
            height: 337,
            itemWidth: 200,
            gutter: 20
        });
    });
});
/*
 *==========
 *特权切换功能
 *==========
 */
require(['jquery'], function($) {
    $(function() {
        $('.privilege-menu').on('click', 'a', function(e) {
            e.preventDefault();
            var index = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            var $menuCont = $(this).parents('.privilege').find('.privilege-list');
            $menuCont.eq(index).show().siblings().hide();
        });
    });
});
/*
 *==========
 *推送消息弹框
 *==========
 */
require(['jquery', 'pops'], function($, Pops) {
    $(function() {
        new Pops(popsConfig);
    });
});
/*
 *==========
 *购买页前置
 *==========
 */
require(['jquery', 'payBefore'], function($, payBefore) {
    $(function() {
        var cpsRequest = function() {
            var img = document.createElement('img');
            img.src = 'http://cps.youku.com/redirect.html?id=00014696';
            $(img).load(function() {
                $(this).remove();
            });
        };
        var initPayBefore = function(config) {
            cpsRequest();
            payBefore.init(config.data, config.payInfo);
        };
        $('.pay-btn').on('click', function(e) {
            e.preventDefault();
            initPayBefore(payBeforeConfig);
        });
    });
});
