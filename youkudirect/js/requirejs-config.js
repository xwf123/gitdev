// 为requirejs 模块名做全局配置
// 此处配置与打包配置无关（官方解释）
// 打包配置，需要重写，写在了gruntfile.js中
// 请保持两处命名一致
// 此处只需要放置libs通用库和utils组件

/*global require,requirejs*/
var staticURL = 'js/';
// var staticURL = './js/';
require.config({
    baseUrl: staticURL,
    paths: {
        'jquery': 'libs/jquery-1.8.2',
        'handlebars': 'libs/handlebars',
        'runtime': 'libs/handlebars.runtime-latest',
        'easySwitch': 'utils/slider/dist/easySwitch',
        'popup': 'utils/dialog/dist/popup',
        'dialog-config': 'utils/dialog/dist/dialog-config',
        'artDialog': 'utils/dialog/dist/dialog',
        'resize': 'utils/resize/dist/resize',
        'baseLogin': 'http://login.youku.com/jsapi/login',
        'loginStart': 'utils/login/dist/loginStart',
        'state': 'utils/state/dist/state',
        'citys': 'utils/citys/dist',
        'slider': 'utils/slider/dist/slider',
        'lazyload': 'utils/lazyload/dist/jquery.lazyload',
        'vcode': 'utils/vcode/dist/vcode',
        'helpers': 'utils/handlebarsHelpers/dist',
        'pops': 'http://static.youku.com/paymentcenter/pops/build/js/utils/pop/pop',
        'payBefore': 'http://static.youku.com/paymentcenter/payBefore/build/js/utils/payBefore/dist/payBefore',
        'nav': 'utils/nav/dist/nav',
        'fullSlide':'utils/slider/dist/fullSlide'
        // 'payBefore':'http://leweiming.static.youku.com/payBefore/build/js/utils/payBefore/dist/payBefore'
    }
});
// 非AMD模块配置
requirejs.config({
    baseUrl: staticURL,
    shim: {
        'jquery': {
            exports: 'jQuery'
        },
        'underscore': {　　　　　　　　
            exports: '_'　　　　　　
        },
        'baseLogin': {　　　　　　　　
            deps: ['jquery']
        },
        'lazyload': {
            deps: ['jquery']
        }
    }
});
