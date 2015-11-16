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