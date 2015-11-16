var secret_key = "Gu5vJHC2i9BCM1MNU4aSzr8eR8dNwXdu";

require(['jquery', 'slider','loginStart'], function($, slider,lgs) {
lgs.start();
    $(function() {
         // $('.aboutcolumn, .introduction').hide();
        // getCookie('__ysuid');
        function getCookie(objName){
            var arrStr = document.cookie.split(";");
            for(var i = 0;i < arrStr.length;i ++){
              var temp = arrStr[i].split("=");
              // console.log(temp[0],objName);
              if($.trim(temp[0])===$.trim(objName)){
                return temp[1];
               }
            }
            return false;
        };
        //分享
        // var oUrl = window.location.href;
        // var enurl=window.location.href;
        var enurl='http://vip.youku.com/?c=play&a=index';
        var oUrl =encodeURIComponent(enurl);
        var oTitle = "我正在享受优酷黄金会员直播间，海量大片为你量身定制，快来加入“会员一起看”！";
        var oSource = '优酷网';
        var oHref = $(".shareico a");
        var oApiarr = [
                'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + oUrl,
                'http://v.t.sina.com.cn/share/share.php?appkey=2684493555&url=' + oUrl + '&title=' + oTitle + '&source=' + oSource,
                'http://connect.qq.com/widget/shareqq/index.html?title='+ oTitle+"&url=" + oUrl,
                'http://v.youku.com/v_wechatShare/?url=' + oUrl,
                'http://tieba.baidu.com/f/commit/share/openShareApi?url=' + oUrl,
                'http://www.douban.com/share/service?name=' + oUrl
        ];
        function fxUrl() {
            for (var i = 0; i < oApiarr.length; i++) {
                oHref[i].href = oApiarr[i];
            }
        }
        fxUrl();

        var tudou_paibo = {
            liveId: 57,
            liveChannel: 1,
            duration: 99,
            hasad: "0",
            iid: 227794766,
            icode: "wg3el4RTnlA",
            playerId: "tdap",
            uid: "118864617",
            pageVars: "icode%3DIsSTl1tSa0k",
            // hasWatermark: true,
            streamType: "live",
            loopPlay: true,
            hasDanmu: false,
            openDanmu: true,
            skin: "skin/tdtv_live_orange.swf"
        };
        //优酷排播配置参数:
        var youku_paibo = {
            liveId: 1,
            liveChannel: 351,
            duration: 99,
            hasad: "0",
            playerId: "ykap",
            iid: 860000000,
            icode: "tk8tNwMFiGQ",
            uid: 789361471,
            // pageVars: "iid%3D210236966%26icode%3DzHk-6FZem58%26vcode%3D",
            // pageVars: "vcode%3DXNTUxMDQ1Nzk2",
            pageVars: "vcode%3DXMTI5NDQ3MDQ2MA",
            // hasWatermark: true,
            loopPlay: true,
            hasDanmu: true,
            openDanmu: true,
            skin: "skin/tdtv_live_blue.swf"
        };
        // uid赋值解析uid
        var uidval = $("#uid").val();
        var objuid = $.parseJSON(uidval);
        if(objuid){
           youku_paibo.uid=objuid;
         }
         // alert(youku_paibo.uid)
        //需要传入flash的参数
        var flashvars = youku_paibo;
        var params = {
            menu: "false",
            scale: "noScale",
            allowFullscreen: "true",
            allowFullScreenInteractive: "true",
            allownetworking: "all",
            allowScriptAccess: "always",
            bgcolor: "#000000",
            wmode: "opaque" // can cause issues with FP settings & webcam
            // wmode: "direct"
        };
        var attributes = {
            id: "CustomPlayer"
        };
        //可以使用任意js动态嵌入flash代码，或者使用<object>标签静态嵌入播放器。
        TDswf.insert(
            "http://www.tudou.com/player/custom/v.swf",
            "player_container", "1150px", "444px", "10.2.0",
            "js/swfupdata.swf",
            flashvars, params, attributes
        );
        //HtmlToSwf.SetVariable('player.data.vcode ','XMTMxMTc2NzI3Ng== ');
        //播放器回调Demo
        //接口WIKI:http://wiki.corp.tudou.com:8080/confluence/pages/viewpage.action?pageId=33397425
        var player;
        window.onPlayerStatusChange = function(info) {
            switch (info.code) {
                case "Api.Is.Ready":
                    player = document.getElementById("CustomPlayer");
                    player.addEventListener("Player.Status.Change", "onPlayerStatusChange");
                    break;
                case "Player.Is.Ready":
                    //alert(player.get("data").id);
                    //解析字符串
                   function No_service(){
                        $('.mask-mobile').html("");
                        $('.mask-mobile, .maskx').show();
                        $('.mask-mobile').html(Innerhtml2);
                        $('.aboutcolumn, .introduction').hide();
                        closemark();
                        player.style.display="none";
                        $('.contentbox').html("<h2>当前页面是黄金会员专享，请<a href='http://cps.youku.com/redirect.html?id=000148ee' target='_blank'>开通黄金会员</a>后观看!</h2>");
                        $('.contentbox h2').css({color:"#ffffff","font-size":"20px","margin-top":"250px","margin-left":"370px"})
                        $('.contentbox h2 a').css({cursor:"pointer",display:"inline","text-decoration":"underline"})
                    }

                    function If_login(){
                        $('.mask-mobile').html("");
                        $('.mask-mobile, .maskx').show();
                        $('.mask-mobile').html(Innerhtml1);
                        $('.aboutcolumn, .introduction').hide();
                        closemark();
                        // lgs.start();
                        $(".tologin").css({cursor:"pointer",display:"inline-block"});
                        $('.tologin').on('click',function(){
                            lgs.trigger();
                        })
                        player.style.display="none";
                        $('.contentbox').html("<h2>当前页面是黄金会员专享，请<a class='l_login'>登录</a>会员帐号后观看!</h2>");
                        $('.contentbox h2').css({color:"#ffffff","font-size":"20px","margin-top":"250px","margin-left":"370px"})
                        $('.contentbox h2 a').css({cursor:"pointer",display:"inline","text-decoration":"underline"})
                        $('.l_login').on('click',function(){
                            lgs.trigger();
                        })
                    }
                var inputval = $("#result").val();
                var objvalue = $.parseJSON(inputval);
                if (objvalue.type === "login") {
                    If_login();
                }
                if (objvalue.type === "no service") {
                    No_service();
                }
                    //简介描述信息
                    $.ajax({
                        type: 'get',
                        url: popsConfig.descAction,
                        data: 'videoid=' + player.get("data").id+"&guid="+getCookie('__ysuid'),
                        dataType: 'json',
                        success: function(data) {
                            // console.log(333333);
                            if (data.code == 20000) {
                                var deschtml = "";
                                deschtml += "<div class='lead'></div>" +
                                    "<div class='img'><img src='" + data.result.thumburl + "'/></div>" +
                                    "<div class='introduction-desc'>" +
                                    "<h2><span><img src='http://r2.ykimg.com/051000005625E27167BC3D18950BFA35'/></span><span class='title'>" + data.result.title + "</span></h2>" +
                                    "<dl>" +
                                    "<dt>导    演：" + data.result.directors + "</dt>" +
                                    "<dt>主要演员：" + data.result.actors + "</dt>" +
                                    "<dd>剧情简介：" + data.result.desc + "</dd>" +
                                    "</dl>" +
                                    "</div>";
                                $('.aboutcolumn, .introduction').show();
                                $(".introduction .section").html(deschtml);
                                if(data.result.directors===""||data.result.actors===""){
                                    $(".introduction .section dl dt").html("");
                                }
                                //关联项目接口
                                var infobox = "";
                                if(data.result.list.length>0){
                                    $.each(data.result.list, function() {
                                    infobox += "<li class='slider-item'>" +
                                        "<div class=slider-info-box'>" +
                                        "<a href=" + this['play_link'] + "  target='_blank'><img data-original=" + this['sthumburl'] + " src=" + this['sthumburl'] + " width='200' height='300' alt='' ></a>" +
                                        "<div class='info'>" +
                                        "<h2>" + this['title'] + "</h2>" +
                                        "<p class='txt'>" + this['sub_title'] + "</p>" +
                                        "<a class='v-url' href=" + this['play_link'] + "  target='_blank'>" + this['title'] + "</a>" +
                                        "</div>" +
                                        "</div>" +
                                        "</li>"
                                    });
                                    $('.slider-box').html(infobox);
                                    $('.coming-movie').slider({
                                        // moveItems: 2,
                                        width: 1190,
                                        height: 300,
                                        itemWidth: 200,
                                        gutter: 20
                                    });
                                }
                            }
                            else{
                                 $('.aboutcolumn, .introduction').hide();
                            }    
                            // log推送
                            $('.slider-item').on('click', function() {
                                var index = $(this).index();
                                // 随机数
                            var randnum = "";
                            var letter = "";
                            var chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
                            for (var i = 0; i < 3; i++) {
                                randnum += Math.floor(Math.random() * 10);
                            }
                            for (var j = 0; j < 5; j++) {
                                var id = Math.floor(Math.random() * 52);
                                letter += chars[id];
                            }
                            var rand = randnum + letter;
                            var logurl = data.result.list[index].send_log_url + "&rand=" + rand;
                            var i5 = new Image(),imgSrc;
                            imgSrc = logurl;
                            i5.src = imgSrc ;
                            i5.onload = function() { 
                                 _yVoid();
                               
                            };
                            function _yVoid() { return; }
                                //logdate ajax
                            });

                            if (data.type === "params") {
                                //console.log("参数错误！")
                            }
                            if (data.type === "get_info_fail") {
                                //console.log("获取视频推荐信息失败")
                            }

                        }
                    });

                    break;
            }
        };
        //弹层关闭
        var closemark = function() {
            $('.okbtn, .closetop').on('click', function() {
                $('.mask-mobile, .maskx').hide();
            })
        };
                    
        var Innerhtml1 = ""; //当前页面会黄金会员专享，请登录会员帐号后观看
        Innerhtml1 += "<p class='closetop'>×</p>";
        Innerhtml1 += "<h2>当前页面是黄金会员专享，请登录会员帐号后观看.</h2>";
        Innerhtml1 += "<div class='firstpage'><a href='http://www.youku.com/' target='_blank'>优酷首页</a></div>";
        Innerhtml1 += "<div class='btnlogin tologin'><a href='javascript:'>登录</a></div>";
        var Innerhtml2 = ""; //当前页面会黄金会员专享，请登录会员帐号后观看
        Innerhtml2 += "<p class='closetop'>×</p>";
        Innerhtml2 += "<h2>当前页面是黄金会员专享，请登录会员帐号后观看.</h2>";
        Innerhtml2 += "<div class='firstpage'><a href='http://www.youku.com/' target='_blank'>优酷首页</a></div>";
        Innerhtml2 += "<div class='open-member'><a href='http://cps.youku.com/redirect.html?id=000148ee' target='_blank'>开通黄金会员</a></div>";
        var Innerhtml3 = ""; //已绑定好手机号订阅成功
        Innerhtml3 += "<p class='closetop'>×</p>";
        Innerhtml3 += "<p>订阅成功</p>";
        Innerhtml3 += "<p class='color9'>节目单更新后，会以短信的形式发送到您的手机。</p>";
        Innerhtml3 += "<div class='btnlogin okbtn'><a>确定</a></div>";
        var Innerhtml4 = ""; //重复订阅提示
        Innerhtml4 += "<p class='closetop'>×</p>";
        Innerhtml4 += "<p>您已订阅过，请在手机短信查收节目单</p>";
        Innerhtml4 += "<div class='btnlogin okbtn setmtop'><a>确定</a></div>";
        var Innerhtml6 = ""; //表单
        Innerhtml6 += "<p class='closetop'>×</p>";
        Innerhtml6 += "<ul>";
        Innerhtml6 += "<p>绑定手机号后，节目单会在更新后以短信的方式推送给您</p>" + "<li>" +
            "<span class='wid1'>手机号:</span>" +
            "<span class='wid2'>" +
            "<input type='text'  class='texwid' id='mobile' >" +
            "<div class='errorbox' id='error_a'>！请输入正确的手机号</div>" +
            "</span>" +
            "</li>" +
            "<li>" +
            "<span class='wid1'>验证码:</span>" +
            "<span class='wid2'>" +
            "<input type='text' class='texwid2' value=''>" +
            "<input type='button' class='waitcode' id='waitcode' value='获取验证码'>" +
            "<div class='errorbox' id='error_b'>！验证码输入错误</div>" +
            "</span>" +
            "</li>" +
            "<div class='btnlogin'><a href='javascript:;' id='bindtel'>确定订阅</a></div>" +
            "</ul>";
        //订阅
        $(".subscribe").on("click", function() {
            var suburl = popsConfig.subscribeAction;
            $.ajax(suburl, {
                type: 'get',
                dataType: 'json'
            }).done(function(mobiledata) {
                if (mobiledata.code == 20000) { //订阅成功
                    $('.mask-mobile').html("");
                    $('.mask-mobile').html(Innerhtml3);
                    $('.mask-mobile, .maskx').show();
                    closemark();
                } 
                else if(mobiledata.type ==="login"){//没有登录
                    $('.mask-mobile').html("");
                    $('.mask-mobile, .maskx').show();
                    $('.mask-mobile').html(Innerhtml1);
                    closemark();
                    $('.aboutcolumn, .introduction').hide();
                    // lgs.start();
                    $(".tologin").css({cursor:"pointer",display:"inline-block"});
                    $('.tologin').on('click',function(){
                        lgs.trigger();
                    })
                    player.style.display="none";
                    $('.contentbox').html("<h2>当前页面是黄金会员专享，请<a class='l_login'>登录</a>会员帐号后观看!</h2>");
                    $('.contentbox h2').css({color:"#ffffff","font-size":"20px","margin-top":"250px","margin-left":"370px"});
                    $('.contentbox h2 a').css({cursor:"pointer",display:"inline","text-decoration":"underline"});
                    $('.l_login').on('click',function(){
                        lgs.trigger();
                    })
                  return false;  
                }
                else if(mobiledata.type ==="no service"){//不是黄金会员
                    // No_service();
                    $('.mask-mobile').html("");
                    $('.mask-mobile, .maskx').show();
                    $('.mask-mobile').html(Innerhtml2);
                    closemark();
                    player.style.display="none";
                    $('.contentbox').html("<h2>当前页面是黄金会员专享，请<a href='http://cps.youku.com/redirect.html?id=000148ee' target='_blank'>开通黄金会员</a>后观看!</h2>");
                    $('.contentbox h2').css({color:"#ffffff","font-size":"20px","margin-top":"250px","margin-left":"370px"});
                    $('.contentbox h2 a').css({cursor:"pointer",display:"inline","text-decoration":"underline"});
                    $('.aboutcolumn, .introduction').hide();
                    return false;
                }
                
                else if(mobiledata.type ==="operate_fail"){
                    $('.mask-mobile').html(Innerhtml4);
                    $('.mask-mobile p').eq(1).html("操作失败，请重试。");
                    $('.mask-mobile, .maskx').show();
                    closemark();
                    //alert("订阅失败！");//系统繁忙，请重新订阅！
                }
                else if (mobiledata.type === "subscribe_repeat") { //您已订阅过，请在手机短信查收节目单
                    $('.mask-mobile').html("");
                    $('.mask-mobile').html(Innerhtml4);
                    $('.mask-mobile, .maskx').show();
                    closemark();
                    return false;
                } else if (mobiledata.type === "no_bind_mobile") { //未绑定手机号
                    $('.mask-mobile').html("");
                    $('.mask-mobile').html(Innerhtml6);
                    $('.mask-mobile, .maskx').show();
                    closemark();
                    //验证手机号
                    var checkIsMobile = function(mobile) {
                        if (mobile == '') {
                            //alert('手机号码不能为空');
                            $("#error_a").show().html("手机号码不能为空");
                            return false;
                        }
                        if (isNaN(mobile) || (mobile.length != 11)) {
                            // alert('请输入正确的手机号码');
                            $("#error_a").show().html("请输入正确的手机号码");
                            return false;
                        }
                        var reg = /^1[3|4|5|7|8][0-9](\d{8})$/;
                        if (!reg.test(mobile)) {
                            $("#error_a").show().html("请输入正确的手机号码");
                            return false;
                        }
                        $("#error_a").hide();
                        return true;
                    };
                    //发送验证码倒计时间
                    var time = function(textcode, wait, maxwait) {
                        if (wait == 0) {
                            $("#waitcode").css("color", "#ff1800");
                            $('#waitcode').attr("disabled", false);
                            $('#waitcode').attr("value", "发送验证码");
                            wait = maxwait;
                        } else {
                            $("#waitcode").css("color", "#807e7e");
                            $("#waitcode").attr("disabled", true);
                            $("#waitcode").attr("value", "重新发送(" + wait + "s)");
                            wait--;
                            setTimeout(function() {
                                time(textcode, wait, maxwait)
                            }, 1000)
                        }
                    };
                    //获取验证码
                    var get_code = function() {
                        var textcode = $("#waitcode");
                        var mobile = $("#mobile").val();
                        if (!checkIsMobile(mobile)) {
                            return false;
                        }
                        //发送验证码接口
                        var sendurl = popsConfig.sendcodeAction + "&mobile=" + mobile;
                        $.ajax(sendurl, {
                            type: 'get',
                            dataType: 'json'
                        }).done(function(code) {
                            if (code.code == 20000) { //发送验证码
                                time(textcode, 60, 60);
                            } else if (code.type === "params") {
                                //console.log("参数错误!");
                                 return false;
                            }
                            else if (code.type === "mobile_is_bind") {
                                $('.mask-mobile').html(Innerhtml4);
                                $('.mask-mobile p').eq(1).html("您的手机号已绑定过，请确认。!");
                                $('.mask-mobile, .maskx').show();
                                closemark();
                                return false;
                            } 
                            else if (code.type === "send_sms_fail") {
                                $('.mask-mobile').html(Innerhtml4);
                                $('.mask-mobile p').eq(1).html("发送失败！");
                                $('.mask-mobile, .maskx').show();
                                closemark();
                                return false;
                            }
                            else if (code.type === "send_sms_busy") {
                                $('.mask-mobile').html(Innerhtml4);
                                $('.mask-mobile p').eq(1).html("今日验证次数已达上限！");
                                $('.mask-mobile, .maskx').show();
                                closemark();
                                return false;
                            }
                            
                        });
                    };
                    //绑定手机号
                    var bindmobile = function() {
                        var mobile = $("#mobile").val();
                        if (!checkIsMobile(mobile)) {
                            return false;
                        }
                        var code = $(".texwid2").val();
                        if (code == "") {
                            $("#error_b").show().html("！请输入正确的验证码");
                            return false;
                        }
                        //绑定手机接口
                        var blink = popsConfig.binkMoileAction + "&mobile=" + mobile + "&code=" + code;
                        $.ajax(blink, {
                            type: 'get',
                            dataType: 'json'
                        }).done(function(bind) {
                            if (bind.code == 20000) { //绑定成功
                                $('.mask-mobile').html("");
                                $('.mask-mobile').html(Innerhtml3);
                                $('.mask-mobile, .maskx').show();
                                closemark();
                            }
                            else if(bind.type ==="params"){
                                //console.log("参数错误!")
                            }
                            else if(bind.type ==="verify_sms_fail"){
                                // $('.mask-mobile').html("<p>验证失败，请重新验证。</p>");
                                $('.mask-mobile').html(Innerhtml4);
                                $('.mask-mobile p').eq(1).html("验证失败，请重新验证。(" + bind.result.error_code + ")");
                                $('.mask-mobile, .maskx').show();
                                closemark();
                                return false;
                            }
                            else if(bind.type ==="bind_mobile_fail"){//$result['result']['error_code'] = $ret;
                                $('.mask-mobile').html(Innerhtml4);
                                $('.mask-mobile p').eq(1).html("绑定失败，请重试。("+bind.result.error_code +")");
                                $('.mask-mobile, .maskx').show();
                                closemark();
                                return false;
                            }
                            else if(bind.type ==="bind_mobile_used"){
                                $('.mask-mobile').html("");
                                // $('.mask-mobile').html("<p>您的手机号已绑定过，请确认。</p>");
                                $('.mask-mobile').html(Innerhtml4);
                                $('.mask-mobile p').eq(1).html("您的手机号已绑定过，请确认。");
                                $('.mask-mobile, .maskx').show();
                                closemark();
                                return false;
                            }
                            else if(bind.type ==="operate_fail"){
                                $('.mask-mobile').html("");
                                // $('.mask-mobile').html("<p>操作失败，请重试。</p>");
                                $('.mask-mobile').html(Innerhtml4);
                                $('.mask-mobile p').eq(1).html("操作失败，请重试。");
                                $('.mask-mobile, .maskx').show();
                                closemark();
                                return false;
                                //alert("订阅失败！");//系统繁忙，请重新订阅！
                            }
                            else if(bind.type ==="verify_sms_error"){
                                $("#error_b").show().html("验证码错误");
                                return false;
                                //alert("订阅失败！");//系统繁忙，请重新订阅！
                            }
                            else if(bind.type ==="subscribe_repeat"){
                                $('.mask-mobile').html("");
                                $('.mask-mobile').html(Innerhtml4);
                                $('.mask-mobile, .maskx').show();
                                closemark();
                                return false;
                            }
                        });
                    };
                    $('#waitcode').on("click", function() {
                        get_code();
                    });
                    $('#bindtel').on("click", function() {
                        bindmobile();
                    })
                } 
            })
            
        });
       
    });
});
