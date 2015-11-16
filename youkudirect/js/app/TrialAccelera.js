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
require(['jquery', 'artDialog', 'state', 'loginStart'], function($, dialog, state, lgs) {

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
                content: tempObj.onsuccess
            });
            d.showModal();
        };

        var noAuthority = function(tempObj) {
            var d = dialog({
                fixed: true,
                title: '温馨提示',
                width: 360,
                content: tempObj.noauthority
            });
            d.showModal();
        };

        var eventFailureInfo = function(code) {
            var d = dialog({
                fixed: true,
                title: '温馨提示',
                width: 360,
                content: '<div id="dialog-con">加速失败，建议您稍后重试<Br>(<span class="error-code">' + code + '</span>)</div>'
            });
            d.showModal();
        };


        var repaireFailureInfo = function(tempObj) {
            var d = dialog({
                fixed: true,
                title: '温馨提示',
                width: 360,
                content: tempObj.repaire
            });
            d.showModal();
        };

        var notregionFailure = function(url, msg) {
                var d = dialog({
                    fixed: true,
                    title: '温馨提示',
                    width: 360,
                    content: '<div class="dialog-title">' + msg + '<Br><div class="target-button"><a href="' + url + '" target="_blank">去设置</a></div></div>'
                });
                d.showModal();
            }
            //a
        var notregionFailure = function(url, msg) {
            var d = dialog({
                fixed: true,
                title: '温馨提示',
                width: 360,
                content: '<div class="dialog-title">' + msg + '<Br><div class="target-button"><a href="' + url + '" target="_blank">去设置</a></div></div>'
            });
            d.showModal();
        }


        var dialogMsg = function(msg) {
            var d = dialog({
                fixed: true,
                title: '温馨提示',
                width: 360,
                content: '<div class="dialog-title">' + msg + '</div>'
            });
            d.showModal();
        };

        var dialogMsgCode = function(msg, code) {
            var d = dialog({
                fixed: true,
                title: '温馨提示',
                width: 360,
                content: '<div id="dialog-con">' + msg + '<br>请您稍后再试。(' + code + ')</div>'
            });
            d.showModal();
        };

        var operator_busyFailureInfo = function(code) {
            var d = dialog({
                fixed: true,
                title: '温馨提示',
                width: 360,
                content: '<div id="dialog-con">抱歉，运营商系统服务繁忙<br>请您稍后再试。(' + code + ')</div>'
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


        var existService = function(url, msg) {
            var d = dialog({
                fixed: true,
                title: '温馨提示',
                width: 360,
                content: '<div class="dialog-title">' + msg + '<Br><div class="target-button"><a href="' + url + '" target="_blank">立即去加速</a></div></div>'
            });
            d.showModal();
        };


        var usedNumLimit = function(url, msg) {
            var d = dialog({
                fixed: true,
                title: '温馨提示',
                width: 360,
                content: '<div class="dialog-title">' + msg + '<Br><div class="target-button"><a href="' + url + '" target="_blank">立即开通</a></div></div>'
            });
            d.showModal();
        };

        var speedupFail = function(code) {
            var d = dialog({
                fixed: true,
                title: '温馨提示',
                width: 360,
                content: '<div id="dialog-con">加速失败<br>请您稍后再试。(' + code + ')</div>'
            });
            d.showModal();
        };





        /*查询宽带加速*/

        var netInfoCheck = function() {
            $('.speed-button').attr('disabled', true).text('检测中...');
            $.post(ACTION_SET.net_info_url).done(function(res) {
                res = $.parseJSON(res);
                state.callback(res, {
                    success: function() {
                        $('.speed-button').removeAttr('disabled').text('点击加速');
                        if (res.result.op_type === '1') {
                            checkSuccess(res.result.num);
                            $('#net_code').attr('value', res.result.dial_acct);
                            $('#op_type').attr('value', res.result.op_type);
                            $('#op_sign').attr('value', res.result.op_sign);
                        } else if (res.result.op_type === '2') {
                            var get_task_url = '' + ACTION_SET.ajax_get_task + '&op_sign=' + res.result.op_sign + '&task_id=' + res.result.task_id + '&op_type=' + res.result.op_type + '';
                            $.post(get_task_url).done(function(res) {
                                res = $.parseJSON(res);
                                state.callback(res, {
                                    success: function() {
                                        checkSuccess(res.result.num);
                                        $('#net_code').attr('value', res.result.dial_acct);
                                        $('#op_type').attr('value', res.result.op_type);
                                        $('#op_sign').attr('value', res.result.op_sign);
                                    },
                                    fail: function() {
                                        if (res.type === 'area') {
                                            eventFailure(tempSet);
                                        } else if (res.type === 'login') {
                                            lgs.start();
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
                                        } else if (res.type === 'speedup_busy') {
                                            dialogMsg(res.result.msg);
                                        } else if (res.type === 'operator_error_sign') {
                                            dialogMsg(res.result.msg);
                                        } else if (res.type === 'share_limit') {
                                            if (res.result.url === "") {
                                                dialogMsg(res.result.msg);
                                            } else {
                                                notregionFailure(res.result.url, res.result.msg);
                                            }
                                        } else if (res.type === 'get_speedup_num_fail') {
                                            dialogMsg(res.result.msg);
                                        } else if (res.type === 'used_num_limit') {
                                            usedNumLimit(res.result.url, res.result.msg);
                                        }
                                    }
                                });
                            });
                        }
                    },
                    fail: function() {
                        $('.speed-button').removeAttr('disabled').text('点击加速');
                        if (res.type === 'area') {
                            eventFailure(tempSet);
                        } else if (res.type === 'login') {
                            lgs.start();
                        } else if (res.type === 'repeat_submit') {
                            eventOnSuccess(tempSet);
                        } else if (res.type === 'operator_error_sign') {
                            dialogMsg(res.result.msg);
                        } else if (res.type === 'repaire') {
                            repaireFailureInfo(tempSet);
                        } else if (res.type === 'operator_busy') {
                            operator_busyFailureInfo(res.result.operator_error_code);
                        } else if (res.type === 'operator_not_range') {
                            operator_not_rangeFailureInfo(res.result.operator_error_msg);
                        } else if (res.type === 'no_service') {
                            noAuthority(tempSet);
                        } else if (res.type === 'speedup_busy') {
                            dialogMsg(res.result.msg);
                        } else if (res.type === 'share_limit') {
                            if (res.result.url === "") {
                                dialogMsg(res.result.msg);
                            } else {
                                notregionFailure(res.result.url, res.result.msg);
                            }
                        } else if (res.type === 'get_speedup_num_fail') {
                            dialogMsg(res.result.msg);
                        } else if (res.type === 'ip_fail') {
                            dialogMsgCode(res.result.msg, res.result.speedup_error_code);
                        } else if (res.type === 'used_num_limit') {
                            usedNumLimit(res.result.url, res.result.msg);
                        } else if (res.type === 'exist_service') {
                            existService(res.result.url, res.result.msg);
                        }
                    }
                });
            })
        }

        var checkSuccess = function(num) {


            dialog({
                fixed: true,
                title: '检测成功',
                width: 360,
                content: '<div id="dialog-con">您剩余的加速次数为<span>' + num + '</span>次</div>',
                okValue: '立即加速',
                ok: function() {
                    var op_type = $('#op_type').val(),
                        op_sign = $('#op_sign').val(),
                        dial_acct = $('#net_code').val();
                    $.post(ACTION_SET.ajax_do_speedup, {
                        op_type: op_type,
                        op_sign: op_sign,
                        dial_acct: dial_acct
                    }).done(function(res) {
                        res = $.parseJSON(res);
                        state.callback(res, {
                            success: function(res) {
                                setTimeout(function() {
                                    $('.trial-pointer').addClass('pointer');
                                    $('.speed-button').attr('disabled', true).text('已加速');
                                }, 3000);
                                eventSuccess(tempSet);
                            },
                            fail: function(res) {
                                if (res.type === 'area') {
                                    eventFailure(tempSet);
                                } else if (res.type === 'login') {
                                    lgs.start();
                                } else if (res.type === 'repeat_submit') {
                                    eventOnSuccess(tempSet);
                                } else if (res.type === 'operator_error_sign') {
                                    dialogMsg(res.result.msg);
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
                                        dialogMsg(res.result.msg);
                                    } else {
                                        notregionFailure(res.result.url, res.result.msg);
                                    }
                                } else if (res.type === 'get_speedup_num_fail') {
                                    dialogMsg(res.result.msg);
                                } else if (res.type === 'exist_service') {
                                    existService(res.result.url, res.result.msg);
                                } else if (res.type === 'used_num_limit') {
                                    usedNumLimit(res.result.url, res.result.msg);
                                } else if (res.type === 'speedup_fail') {
                                    speedupFail(res.result.speedup_error_code);
                                }
                            }
                        });
                    });
                }
            }).show();

        }

        $('.speed-button').on('click', function(e) {
            e.preventDefault();
            netInfoCheck();
        });




    });
});
