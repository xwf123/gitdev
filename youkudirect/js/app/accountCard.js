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
/*
 * 会员卡激活
 */
require(['jquery', 'vcode', 'state', 'artDialog'], function($, vcode, state, dialog) {
    $(function() {

        var $vcodeImg = $('#J-vcode-img'),
            $switchBtn = $('#J-switch-vcode'),
            $submitBtn = $('#J-submit-btn'),
            $frmError = $('#J-frm-error');

        // 初始获取验证码url
        var initVcodeImg = vcode.init('card');

        var renderVcode = function(url) {
            $vcodeImg.attr('src', url);
        };

        renderVcode(initVcodeImg);

        // 切换验证码
        $switchBtn.on('click', function(e) {
            e.preventDefault();
            renderVcode(vcode.refresh());
        });

        // 表单简单检测
        var checkfrm = {
            pwd: function() {
                return $.trim($('#pwd').val()) !== '';
            },
            vcode: function() {
                return $.trim($('#code').val()) !== '';
            }
        };
        // 请求成功失败回调
        var requestCallback = {
            success: function(res) {
                var d = dialog({
                    fixed: true,
                    width: 300,
                    // height: 100,
                    content: ['<div class="active-card-result">',
                        '<div class="inner">',
                        '<p class="d-success">' + res.result.msg + '</p>',
                        '<p>对话框将在3秒内关闭</p>',
                        '</div>',
                        '</div>'
                    ].join('')
                });
                d.showModal();
                setTimeout(function() {
                    d.remove();
                    window.location.href = res.result.url;
                }, 3000);
            },
            fail: function(res) {
                $submitBtn.removeAttr('disabled').text('激活');
                // $frmError.html('')
                if (res.result.type === 'vcode') {
                    // 验证码错误，刷新验证码
                    $frmError.html('验证码错误，请重新输入').show();
                    renderVcode(vcode.refresh());
                    return;
                }
                var d = dialog({
                    fixed: true,
                    title: '温馨提示',
                    width: 450,
                    // height: 100,
                    content: ['<div class="active-card-result">',
                        '<div class="inner">',
                        '<p class="d-error">' + res.result.msg + '</p>',
                        '</div>',
                        '</div>'
                    ].join(''),
                    onclose: function() {
                        renderVcode(vcode.refresh());
                    }
                });
                d.showModal();
            }
        };
        // 表单提交事件
        $('#J-card-form').on('submit', function(e) {
            e.preventDefault();
            if (!checkfrm.pwd()) {
                $frmError.html('请输入会员卡密码').show();
                return;
            }
            if (!checkfrm.vcode()) {
                $frmError.html('请输入验证码').show();
                return;
            }
            $frmError.html('').hide();
            $submitBtn.attr('disabled', true).text('提交中...');

            $.post(ACTION_SET.activeCard, {
                pwd: $.trim($('#pwd').val()),
                vcode: $.trim($('#code').val())
            }).done(function(res) {
                state.callback(res, {
                    success: function(res) {
                        requestCallback.success(res);
                    },
                    fail: function(res) {
                        requestCallback.fail(res);
                    }
                });
            });
        });

    });
});
