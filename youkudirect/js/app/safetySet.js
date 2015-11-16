require(['jquery','loginStart'],function($,lgs){
	$(function(){
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