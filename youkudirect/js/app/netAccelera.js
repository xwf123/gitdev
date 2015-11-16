/*登录和退出*/
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
/*
会员加速模块
 */
require(['jquery', 'artDialog', 'slider', 'state'], function($, dialog, slider, state) {

    // 添加
    $(function() {

        // 渲染模板设置
        var tempSet = {
            failure: [
                '<div class="dialog-small-title">尊敬的用户：您所使用的宽带不在加速范围</div>',
                '<div class="dialog-box">',
                '<dl>',
                '<dt>覆盖省份</dt>',
                '<dd>电信光纤用户：北京、重庆、上海、天津、甘肃、贵州、海南、河北、河南、黑龙江、湖南、吉林、辽宁、内蒙古、宁夏、青海、山东、山西（仅太原市）、陕西、四川、西藏、新疆、云南、浙江</dd> ',
                '<dd>电信全部用户：安徽、福建、湖北、江苏、江西</dd> ',
                '<dd>联通全部用户：北京</dd> ',
                '</dl>',
                '<div class="dialog-btn">',
                '电信暂不支持企业用户；联通暂不支持后付费50M/100M宽带用户、预付费用户、201用户和企业宽带用户。<Br>如有问题可垂询：400-810-3568',
                '</div>',
                '</div>'
            ].join(''),
            success: [
                '<div class="dialog-success-title">尊敬的会员，已为你开启会员宽带加速服务。<Br>尽情的享受美好的视频吧！</div>',
                '<div class="dialog-success-btn">温馨提示：请勿分享会员账号！如分享您将有可能无法享受会员加速服务！</div>',
                '<div class="dialog-success-time">3秒后自动关闭</div>'
            ].join(''),
            onsuccess: [
                '<div class="dialog-title">尊敬的会员<Br>已为你开启会员宽带加速服务</div>'
            ].join(''),
            noauthority: [
                '<div class="dialog-title">您还没有宽带加速特权<Br>推荐您立即开通优酷土豆黄金会员尊享智能提速<Br><div class="target-button"><a href="http://cps.youku.com/redirect.html?id=000146a0" target="_blank">开通会员</a></div></div>'
            ].join(''),
            repaire: [
                '<div class="dialog-title">宽带加速服务维护中….<Br>暂时无法使用</div>'
            ].join('')
        }

        // 添加事件回调
        var eventFailure = function(tempObj) {
            var d = dialog({
                fixed: true,
                title: '温馨提示',
                width: 560,
                height: 242,
                content: tempObj.failure
            });
            d.showModal();
        };
        var eventSuccess = function(tempObj) {
            var d = dialog({
                fixed: true,
                width: 505,
                height: 184,
                content: tempObj.success
            });
            d.showModal();
            setTimeout(function() {
                d.close().remove();
            }, 3000);
        };

        var eventOnSuccess = function(tempObj) {
            var d = dialog({
                fixed: true,
                title: '温馨提示',
                width: 360,
                height: 142,
                content: tempObj.onsuccess
            });
            d.showModal();
        };

        var noAuthority = function(tempObj) {
            var d = dialog({
                fixed: true,
                title: '温馨提示',
                width: 360,
                height: 142,
                content: tempObj.noauthority
            });
            d.showModal();
        };

        var eventFailureInfo = function(code) {
            var d = dialog({
                fixed: true,
                title: '温馨提示',
                width: 360,
                height: 142,
                content: '<div id="dialog-con">加速失败，建议您稍后重试<Br>(<span class="error-code">' + code + '</span>)</div>'
            });

            d.showModal();
        };

        var repaireFailureInfo = function(tempObj) {
            var d = dialog({
                fixed: true,
                title: '温馨提示',
                width: 360,
                height: 142,
                content: tempObj.repaire
            });
            d.showModal();
        };

        var notregionFailure = function(url, msg) {
            var d = dialog({
                fixed: true,
                title: '温馨提示',
                width: 360,
                height: 142,
                content: '<div class="dialog-title">' + msg + '<Br><div class="target-button"><a href="' + url + '" target="_blank">去设置</a></div></div>'
            });
            d.showModal();
        }
        var noturlregionFailure = function(msg) {
            var d = dialog({
                fixed: true,
                title: '温馨提示',
                width: 360,
                height: 142,
                content: '<div class="dialog-title">' + msg + '</div>'
            });
            d.showModal();
        }

        var operator_busyFailureInfo = function(code) {
            var d = dialog({
                fixed: true,
                title: '温馨提示',
                width: 360,
                content: '<div id="dialog-con">抱歉，运营商系统服务繁忙<br>请您稍后再试。('+code+')</div>'
            });
            d.showModal();
        };


        var operator_not_rangeFailureInfo = function(msg) {
            if (msg === "") {
                var d = dialog({
                    fixed: true,
                    title: '温馨提示',
                    width: 360,
                    content: '<div id="dialog-con">抱歉，您的宽带线路暂不支持提速。</div>'
                });
            } else {
                var d = dialog({
                    fixed: true,
                    title: '温馨提示',
                    width: 360,
                    content: '<div id="dialog-con">抱歉，您的宽带线路暂不支持提速。<a href="#" class="check-more">查看详情</a><br><div class="more-msg" style="display:none;padding-top:10px;">' + msg + '</div></div>'
                });
            }
            d.showModal();
            $('.check-more').on('click', function(e) {
                e.preventDefault();
                $('.more-msg').show();
            });
        };


        /*查询宽带加速*/
        var speedCheck = function() {
            $.post(ACTION_SET.request_url).done(function(res) {
                res = $.parseJSON(res);
                state.callback(res, {
                    success: function() {
                        $('.details-loading').hide();
                        eventSuccess(tempSet);
                        $('#speedup-info').html('已成功开启宽带加速服务');
                    },
                    fail: function() {
                        $('.details-loading').hide();
                        $('.start-speed').show();
                        if (res.type === 'area') {
                            eventFailure(tempSet);
                        } else if (res.type === 'repeat_submit') {
                            eventOnSuccess(tempSet);
                        } else if (res.type === 'speedup_fail') {
                            eventFailureInfo(res.code)
                        } else if (res.type === 'repaire') {
                            repaireFailureInfo(tempSet);
                        } else if (res.type === 'operator_busy') {
                            operator_busyFailureInfo(res.result.operator_error_code);
                        } else if (res.type === 'operator_not_range') {
                            operator_not_rangeFailureInfo(res.result.operator_error_msg);
                        } else if (res.type === 'no_service') {
                            noAuthority(tempSet);
                        } else if (res.type === 'share_limit') {
                            if (res.result.url === "") {
                                noturlregionFailure(res.result.msg);
                            } else {
                                notregionFailure(res.result.url, res.result.msg);
                            }
                        }
                    }
                });
            });

        };



        // 绑定事件
        var startSpeed = $('.start-speed')
        startSpeed.on('click', function(e) {
            $('.start-speed').hide();
            $('.details-loading').show();
            e.preventDefault();
            speedCheck();
        });
        $('.recommend-online').slider({
            // moveItems: 2,
            width: 967,
            // height: 300,
            itemWidth: 200,
            gutter: 20
        });
    });
});
