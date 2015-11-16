/*
 * 定义一个判断ajax状态的功能函数
 */
define(['loginStart'], function(lgs) {
    var state = {};
    // 错误等级
    // 0为成功
    // 1为系统错误
    // 2为权限错误
    // 3为业务错误
    function getType(obj) {
        if (obj == null) {
            return obj;
        }
        return Object.prototype.toString.call(obj).slice(8, -1);
    }

    state.code = function(st) {
        var keySt = Number(st.slice(-2)),
            result;

        if (keySt === 0) {
            result = 0;
        } else if (0 < keySt && keySt <= 9) {
            result = 1;
        } else if (10 <= keySt && keySt <= 19) {
            result = 2;
        } else if (keySt >= 20) {
            result = 3;
        }
        return result;
    };
    state.validate = function(st) {
        return st.length === 5;
    };
    state.log = function(stRes, msg) {
        if (!msg) {
            return;
        }
        if (stRes === 0) {
            window.console && console.info(msg);
        } else {
            window.console && console.error(msg);
        }
    };
    // 判断权限有问题
    // 触发登录
    state.login = function() {
        lgs.trigger();
        return false;
    };
    // 参数错误，抛错异常，自动跳转到错误页
    state.error = function(url) {
        window.location.href = url;
    };
    // fnObj: {success:function(){},fail:function(){}}
    state.callback = function(response, fnObj) {
        if (getType(response) === 'String') {
            response = JSON.parse(response);
        }
        if (!this.validate(response.code)) {
            this.log('状态码长度不是5位');
        }
        var st = this.code(response.code);
        this.log(st, response.msg);
        if (st === 0) {
            !!fnObj.success && fnObj.success(response);
        } else if (st === 1) {
            if (!fnObj.error) {
                this.error(response.result.url);
                return;
            }
            fnObj.error(response);
        } else if (st === 3) {
            !!fnObj.fail && fnObj.fail(response);
        } else if (st === 2) {
            this.login();
        }
    };
    return state;
});
