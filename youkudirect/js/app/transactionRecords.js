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

/*查询详情*/

require(['jquery', 'state', 'artDialog'], function($, state, dialog) {

    // 添加
    $(function() {
        var clicktag = 0;

        // 添加事件回调
        var onCheckInfo = function(result) {
            var d = dialog({
                fixed: true,
                title: '交易详情',
                width: 600,
                height: 150,
                content: '<div class="content-p-title">交易号：<span class="p-num">' + result.pay_id + '</span></div><div class="content-p-box"><table cellspacing="0" cellpadding="0" border="0"><thead><tr><th class="u-name">服务名称</th><th class="u-time">交易完成时间</th><th class="u-method">支付方式</th><th class="u-money">实付金额</th></tr></thead><tbody><tr><td>' + result.product_name + '</td><td>' + result.successtime + '</td><td>' + result.pay_channel_name + '</td><td> ' + result.pay_price + '</td></tr></tbody></table></div>'
            });
            d.showModal();
        };

        // 绑定事件
        var checkInfo = $('.check-on');
        checkInfo.on('click', function(e) {
            if (clicktag === 0) {
                clicktag = 1;
                e.preventDefault();
                var pk_order = $(this).find('input').val();
                $.post(ACTION_SET.tradeDetail, {
                    pk_order: pk_order
                }).done(function(res) {
                    state.callback(res, {
                        success: function(res) {
                            onCheckInfo(res.result);
                        },
                        fail: function(res) {
                            var d = dialog({
                                fixed: true,
                                title: '温馨提示',
                                width: 300,
                                height: 80,
                                // height: 100,
                                content: '<div class="dialog-title">' + res.result.msg + '</div>'
                            });
                            d.showModal();
                        }
                    });
                });

                setTimeout(function() {
                    clicktag = 0;
                }, 3000);
            }

        });
    });
});
