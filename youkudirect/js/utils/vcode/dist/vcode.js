/*
 * 验证码校验
 * author:leweiming
 * date:2014/10/20
 */
define([], function() {
    var vCode = {
        // aid是固定参数，比如是card
        setId: function(aid) {
            this.aid = aid;
            return this;
        },
        removeId: function() {
            this.aid = null;
            return this;
        },
        getCode: function() {
            var timestamp = new Date().getTime();
            return ACTION_SET.capchaHost + '/captcha/get_captcha?aid=' + this.aid + '&timestamp=' + timestamp;
        },
        refresh: function() {
            return this.getCode();
        },
        init: function(aid) {
            this.setId(aid);
            return this.getCode();
        }
    };
    return vCode;
});
