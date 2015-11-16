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
 *iframe 高度自适应
 *==========
 */
require(['jquery'], function($) {
    $(function() {
        document.domain = 'youku.com';
        // 计算页面的实际高度，iframe自适应会用到
        function calcPageHeight(doc) {
            return $(doc).find('body').outerHeight();
        }
        var iframe = document.getElementById('frame_content');

        function reinitIframe() {
            try {
                var height = calcPageHeight(iframe.contentDocument || iframe.document);
                iframe.height = height;
            } catch (ex) {}
        }
        iframe.onload = function() {
            reinitIframe();
            window.scrollTo(0, 0);
        };
        setInterval(reinitIframe, 200);
    });
});
