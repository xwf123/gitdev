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
/*添加观影券*/
require(['jquery', 'artDialog', 'vcode', 'state', 'slider'], function($, dialog, vcode, state, slider) {

    // 添加
    $(function() {

        var clicktag = 0;

        var $ticketAdd = $('.vip-ticket-add a'),
            $couponNum = $('.vip-coupon-num a');


        /*添加观影券*/

        var addTicket = function() {

            var d = dialog({
                fixed: true,
                title: '添加观影券',
                width: 360,
                height: 180,
                content: '<div class="content-ticket-box"><ul><li><label>观影券：</label><input type="text" value="" class="ticket-coupon" id="ticket-coupon"></li><li><label>验证码：</label><input type="text" value="" class="ticket-code" id="ticket-code"><img id="J-CaptchaImg" src=""></li></ul><div id="code-error"></div><div class="ticket-button"><button type="submit" id="add-Tbutton">提交</button></div></div>'
            });
            d.showModal();

            var $vcodeImg = $('#J-CaptchaImg'),
                $addTj = $('#add-Tbutton'),
                $frmError = $('#code-error');

            var renderVcode = function(url) {
                $vcodeImg.attr('src', url);
            };

            var initVcodeImg = vcode.init('ticket');

            renderVcode(initVcodeImg);

            $vcodeImg.on('click', function(e) {
                e.preventDefault();
                renderVcode(vcode.refresh());
            });

            //renderVcode();

            /*提交*/
            var checkfrm = {
                code: function() {
                    return $.trim($('#ticket-coupon').val()) !== '';
                },
                vcode: function() {
                    return $.trim($('#ticket-code').val()) !== '';
                }
            };

            $addTj.on('click', function(e) {
                e.preventDefault();
                if (!checkfrm.code()) {
                    $frmError.html('请输入您的观影券').show();
                    return;
                }
                if (!checkfrm.vcode()) {
                    $frmError.html('请输入验证码').show();
                    return;
                }
                if (clicktag === 0) {
                    clicktag = 1;
                    $frmError.html('').hide();
                    $addTj.attr('disabled', true).text('提交中...');


                    $.post(ACTION_SET.ticket_bind_url, {
                        tcode: $.trim($('#ticket-coupon').val()),
                        captcha: $.trim($('#ticket-code').val())
                    }).done(function(res) {
                        state.callback(res, {
                            success: function(res) {
                                var d = dialog({
                                    title: '温馨提示',
                                    fixed: true,
                                    width: 300,
                                    height: 80,
                                    content: '<div class="dialog-title">' + res.result.msg + '</div>'
                                });
                                d.showModal();
                                setTimeout(function() {
                                    d.remove();
                                    window.location.href = res.result.url;
                                }, 3000);
                            },
                            fail: function(res) {
                                $addTj.removeAttr('disabled').text('提交');
                                $frmError.html(res.result.msg).show();
                                renderVcode(vcode.refresh());
                            }
                        });
                    });

                    setTimeout(function() {
                        clicktag = 0;
                    }, 2000);
                }
            });

        };

        $ticketAdd.on('click', function() {
            if (clicktag === 0) {
                clicktag = 1;
                addTicket();
                setTimeout(function() {
                    clicktag = 0;
                }, 3000);
            }
        });
        var clicktab = function() {
            /*交互*/
            $('#coupon-video-list li').on('click', function() {
                $('#coupon-video-list li').removeClass('current');
                $(this).addClass('current');
                var videoid = $(this).find('input').val();
                $('#on-video-id').attr('value', videoid);
                $('.confirm-name').html('《' + $(this).find('p').text() + '》');
            });
        };

        /*观看列表*/
        var couponList = function(tcode) {
            $.post(ACTION_SET.ticket_shows_url, {
                tcode: tcode
            }).done(function(res) {
                state.callback(res, {
                    success: function(res) {
                        var d = dialog({
                            fixed: true,
                            width: 600,
                            title: '定向观影券可选列表',
                            // height: 100,
                            content: ['<div class="coupon-video-list">',
                                '<ul id="coupon-video-list">',
                                '</ul><div id="on-movieid">确认使用定向观影券观看<span class="confirm-name">《' + res.result[0].showname + '》</span></div><input type="hidden" value="' + res.result[0].psid + '" id="on-video-id"><input type="hidden" value="' + tcode + '" id="on-video-code"></div>'
                            ].join(''),
                            button: [{
                                value: '提交',
                                callback: function() {

                                    $.post(ACTION_SET.ticket_consume_url, {
                                        tcode: $('#on-video-code').val(),
                                        psid: $('#on-video-id').val()
                                    }).done(function(res) {
                                        state.callback(res, {
                                            success: function(res) {
                                                var d = dialog({
                                                    fixed: true,
                                                    width: 300,
                                                    height: 85,
                                                    content: '<div class="dialog-title">购买成功<Br>即将为您播放影片 </div>'
                                                });
                                                d.showModal();
                                                setTimeout(function() {
                                                    d.remove();
                                                    window.location.href = res.result.url;
                                                }, 3000);
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
                                }
                            }],
                        });
                        $.each(res.result, function(i) {
                            var listShow = '';
                            if (i === 0) {
                                listShow += '<li class="current"><a href="javascript:;"></a><div class="post_bg"></div><div class="video-direct-pic" style="background:url(' + res.result[i].show_vthumburl + ');background-size:cover"></div><p>' + res.result[i].showname + '</p><input type="hidden" value="' + res.result[i].psid + '"></li>';
                            } else {
                                listShow += '<li><a href="javascript:;"></a><div class="post_bg"></div><div class="video-direct-pic" style="background:url(' + res.result[i].show_vthumburl + ');background-size:cover"></div><p>' + res.result[i].showname + '</p><input type="hidden" value="' + res.result[i].psid + '"></li>';
                            }
                            $('#coupon-video-list').append(listShow);
                        });
                        d.showModal();
                        clicktab();
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

        };
        $couponNum.on('click', function() {
            if (clicktag === 0) {
                clicktag = 1;
                var tcode = $(this).find('input').val();
                couponList(tcode);
                setTimeout(function() {
                    clicktag = 0;
                }, 3000);
            }
        });

        $('.vip-ticket-free').slider({
            // moveItems: 2,
            width: 1190,
            // height: 300,
            itemWidth: 200,
            gutter: 20
        });
    });
});
