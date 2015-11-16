/*global YOUKU:true*/
/*登录退出启动程序*/
define(['jquery', 'baseLogin'], function($, login) {
    //miniheader login
    var btn = {
        login: $('.J-login'),
        out: $('.J-logout')
    };
    // 登录
    var frameLogin = function() {
        YOUKU.login(function() {
            window.location.reload();
        });
    };

    // 登出
    var frameLogout = function() {
        YOUKU.logout(function() {
            window.location.reload();
        });
    };
    var start = function() {
        btn.login.on('click', function(e) {
            e.preventDefault();
            frameLogin();
        });
        btn.out.on('click', function(e) {
            e.preventDefault();
            frameLogout();
        });
    };

    var triggerLogin = function() {
        start();
        btn.login.trigger('click');
    };
    return {
        start: start,
        trigger: triggerLogin,
        login: frameLogin,
        logout: frameLogout
    };
});
