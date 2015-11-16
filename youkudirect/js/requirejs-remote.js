/*
 *---------------
 * 此代码只适用于异步加载外链的js资源
 * 这些js无法被打包到当前页面的js文件中
 */

/*global require,requirejs*/
require.config({
    paths: {
        'baseLogin': 'http://login.youku.com/jsapi/login',
        'pops': 'http://static.youku.com/paymentcenter/pops/build/js/utils/pop/pop',
        // 'payBefore': 'http://leweiming.static.youku.com/payBefore/build/js/utils/payBefore/dist/payBefore'
        'payBefore': 'http://static.youku.com/paymentcenter/payBefore/build/js/utils/payBefore/dist/payBefore'
    }
});
