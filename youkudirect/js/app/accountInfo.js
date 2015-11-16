/*
 * 我的账户页
 */
/*global VIP_TYPE_CONFIG:true*/
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
require(['jquery', 'slider'], function($, slider) {
    $(function() {
        $('#J-m-slide').slider({
            width: 860,
            height: 110,
            itemWidth: 200,
            gutter: 20
        });
    });
});
require(['jquery', 'lazyload'], function($, lazyload) {
    $(function() {
        $('img').lazyload({
            container: $('.present-lists')
        });
    });
});
// 会员到期进度条
require(['jquery'], function($) {
    $(function() {
        var $barContainer = $('#J-dateline-bar');

        var vipbarSet = {
            baseWidth: 550, //有效宽度550px
            dom: {
                vip: $barContainer.find('.vip-bar'),
                light_vip: $barContainer.find('.light-vip-bar'),
                noad_vip: $barContainer.find('.noad-bar')
            },
            // 计算会员总长度
            total: function(config) {
                var prop, result = 0;
                for (prop in config) {
                    if (config.hasOwnProperty(prop)) {
                        result += config[prop];
                    }
                }
                return result;
            },
            // 会员比例分配
            percentSet: function(config) {
                var percentResult = {},
                    t = this.total(config);

                percentResult.light_vip = config.light_vip; //轻会员比例要么为1，要么为0，为
                percentResult.vip = config.vip / t; //会员比例为其值所占比
                percentResult.noad_vip = (config.vip + config.noad_vip) / t; //与会员比例叠加
                return percentResult;
            },
            // 设置会员类型的宽度
            setBarWidth: function(config) {
                var percentInfo = this.percentSet(config),
                    prop;
                for (prop in config) {
                    if (config.hasOwnProperty(prop)) {
                        if (!percentInfo[prop]) {
                            this.dom[prop].hide();
                        }
                        this.dom[prop].css('width', this.baseWidth * percentInfo[prop] + 'px');
                    }
                }
            }
        };

        vipbarSet.setBarWidth(VIP_TYPE_CONFIG);
    });
});
// 续费服务关闭
// require(['jquery', 'artDialog', 'state'], function($, dialog, state) {
//     var $closeService = $('#J-close-service');

//     // 公用提示模板
//     var dTitle = '温馨提示',
//         dFailCont = ['<p>操作失败，建议您重新尝试</p>'].join('');
//     // 绑定类型对应的提示模板设置
//     var bindTpl = {
//         webpay: {
//             init: {
//                 title: dTitle,
//                 content: ['<div class="desc">',
//                 '<p>关闭连续包月服务后，您将无法继续享受连续包月会员的多项专属特区内，确认关闭吗？</p>',
//                 '</div>'].join(''),
//                 okValue: '确认',
//                 cancelValue: '再考虑一下'
//             },
//             success: {
//                 title: dTitle,
//                 content: ['<div class="desc">',
//                 '<p>成功关闭连续包月服务，欢迎有需要时继续开通</p>','</div>'].join('')
//             }
//         },
//         tel: {
//             init: {
//                 title: dTitle,
//                 content: ['<h2>您开通的为手机话费连续包月服务，需通过运营商取消</h2>',
//                     '<div class="desc">',
//                     '<p>移动用户：发送qx#20167到1065880030</p>',
//                     '<p>联通用户：发送QYS到10665106</p>',
//                     '</div>'
//                 ].join('')
//             }
//         },
//         all: {
//             init: {
//                 title: dTitle,
//                 content: ['<div class="desc">',
//                 '<p>关闭连续包月服务后，您将无法继续享受连续包月会员的多项专属特区内，确认关闭吗？</p>',
//                 '</div>'].join(''),
//                 okValue: '确认',
//                 cancelValue: '再考虑一下'
//             },
//             success: {
//                 title: dTitle,
//                 content: ['<h2>已成功关闭支付宝、微信连续包月服务</h2>',
//                     '<div class="desc">',
//                     '<p>手机话费连续包月服务需通过运营商取消</p>',
//                     '<p>移动用户：发送qx#20167到1065880030</p>',
//                     '<p>联通用户：发送QYS到10665106</p>',
//                     '</div>'
//                 ].join('')
//             }

//         }
//     };
//     // 确认关闭服务请求
//     var closeService = function(dialogObj) {
//         $.post(ACTION_SET.closeService).done(function(res) {
//             state.callback(res, {
//                 success: function(res) {
//                     var result = res.result,
//                         dialogSet = bindTpl[result.type].success;
//                     // 销毁第一个弹层
//                     // 创建并显示成功浮层
//                     // 关闭浮层后，刷新当前页面
//                     dialogObj.close().remove();
//                     var d = dialog({
//                         // width: 400,
//                         title: dialogSet.title,
//                         content: '<div class="close-service-success">' + dialogSet.content + '</div>',
//                         onclose: function() {
//                             location.reload(true);
//                         }
//                     });
//                     d.showModal();

//                 },
//                 fail: function(res) {
//                     var d = dialog({
//                         // width: 400,
//                         content: '<div class="close-service-fail">' + dFailCont + '</div>'
//                     });
//                     d.showModal();
//                     setTimeout(function(){
//                         d.close().remove();
//                     },2000);
//                 }
//             });
//         });
//     };
//     // 关闭服务初始化弹框
//     var closeInit = function(type) {
//         var dialogSet = bindTpl[type].init,
//             d;
//         console.log(dialogSet);
//         // 非电话绑定
//         if (type !== 'tel') {
//             // console.log('not tel');
//             d = dialog({
//                 // width: 400,
//                 title: dialogSet.title,
//                 content: '<div class="close-service-init">' + dialogSet.content + '</div>',
//                 okValue: dialogSet.okValue,
//                 cancelValue: dialogSet.cancelValue,
//                 ok: function() {
//                     closeService(this);
//                 },
//                 cancel: function() {

//                 }
//             });
//             d.showModal();
//         } else {
//             d = dialog({
//                 // width: 400,
//                 title: dialogSet.title,
//                 content: '<div class="close-service-init">' + dialogSet.content + '</div>'
//             });
//             d.showModal();
//         }

//     };


//     $closeService.on('click', function(e) {
//         e.preventDefault();
//         console.log($(this).data('type'));
//         closeInit($(this).data('type'));
//     });
// });
