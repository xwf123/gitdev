/*
 * author:leweiming
 * gmail:xmlovecss 艾特 gmail dot com
 */
define(['jquery'], function($) {
    var my = {},
        constructorFunName = 'EfullSlide',
        pluginName = 'fullSlide';

    my[constructorFunName] = function(container, options) {
        // var imgEle;
        this.container = container;
        var settings = $.extend({}, $.fn[pluginName].defaults, options);

        for (var props in settings) {
            if (settings.hasOwnProperty(props)) {
                this[props] = settings[props];
            }
        }
        // 获取图片宽高
        // imgEle = container.find('.' + this.switchItemName + ' img').eq(this.startIndex);
        // 显示才能获取宽高
        // imgEle.parents('.' + this.switchItemName).addClass('prev');
        this.width = this.containerWidth;
        this.height = this.containerHeight;

        // 获取图片个数
        this.itemsLen = this.container.find('.' + this.switchItemName).length;
        // 全局timer，动画状态判断
        this.timer = null;
        this.isAnimating = false;


        // 初始化
        this.init();
    };
    my[constructorFunName].prototype = {
        constructor: my[constructorFunName],
        // 滚动初始化
        init: function() {
            var self = this;
            this.setContainerStyle();
            this.isPlayNumber && this.renderPlayNumber();
            this.isDirbtn && this.renderDirectionBtn();
            // 自动播放
            this.autoSwitch();
            // 悬浮停止配置
            this.isHoverPause && this.container.on('mouseover', function() {
                self.stopSwitch();
            }).on('mouseout', function() {
                self.autoSwitch();
            });
        },
        // 设置图片列表ul宽高
        setContainerStyle: function() {
            this.container.css({
                'width': this.width,
                'height': this.height
            });
        },
        // 若有分页，或者前进，后退按钮
        // 需要创建一个外层包含框
        createSwitchWrapper: function() {
            if (!this.isSwitchWrapperCreated) {
                this.isSwitchWrapperCreated = true;
                return '<div class="' + this.switchWrapperName + '" style="width:' + this.width + ';height:' + this.height + '"></div>';
            } else {
                return false;
            }
        },
        // 创建分页
        createPlayNumber: function() {
            var i = 0,
                j = this.itemsLen,
                tmp = '<div class="' + this.switchNumberName + '">';
            for (; i < j; i++) {
                if (i === this.startIndex) {
                    tmp += '<a href="#" class="current">' + (i + 1) + '</a>';
                } else {
                    tmp += '<a href="#">' + (i + 1) + '</a>';
                }
            }
            tmp += '</div>';
            return tmp;
        },
        // 渲染
        renderPlayNumber: function() {
            var switchWrapper = this.createSwitchWrapper(),
                self = this;
            if (switchWrapper) {
                this.container.wrap(switchWrapper);
            }
            this.container.parent().append(self.createPlayNumber());
            this.playNumberEvent();

        },
        // 绑定数字播放事件
        playNumberEvent: function() {
            var self = this;

            this.container.parent().find('.' + this.switchNumberName).on('click', 'a', function(e) {
                e.preventDefault();
                self.gotoIndex($(this).index(), self.startIndex, '');
            });
        },
        // play number
        playNumber: function(index) {
            this.container.parent().find('.' + this.switchNumberName).find('a').eq(index).addClass('current').siblings().removeClass('current');
        },
        gotoIndex: function(index, prevIndex, directionFlag) {
            // 停止轮播
            this.stopSwitch();

            this.scroll(index, prevIndex, directionFlag);
            this.autoSwitch();
        },

        // create next,prev button
        createDirectionBtn: function() {
            return '<div class="switch-play-btn"><a href="#" class="' + this.prevBtnName + '">上一张</a><a href="#" class="' + this.nextBtnName + '">下一张</a></div>';
        },
        // render next,prev button
        renderDirectionBtn: function() {
            var switchWrapper = this.createSwitchWrapper(),
                self = this;

            if (switchWrapper) {
                this.container.wrap(switchWrapper);
            }
            this.container.parent().append(self.createDirectionBtn());
            this.prevBtnEvent();
            this.nextBtnEvent();
        },
        // 上一张按钮事件
        prevBtnEvent: function() {
            var self = this,
                clickIndex;

            this.container.parent().find('.' + this.prevBtnName).on('click', function(e) {
                e.preventDefault();
                clickIndex = self.getPrev(self.startIndex);
                self.gotoIndex(clickIndex, self.startIndex, -1);
            });
        },
        // 下一张按钮事件
        nextBtnEvent: function() {
            var self = this,
                clickIndex;
            this.container.parent().find('.' + this.nextBtnName).on('click', function(e) {
                e.preventDefault();
                clickIndex = self.getNext(self.startIndex);
                self.gotoIndex(clickIndex, self.startIndex, 1);
            });
        },
        // get direction
        // 传入跳转后的下标，跳转之前的下标
        getDirection: function(gotoIndex, prevIndex) {
            var res = gotoIndex - prevIndex;
            if (res >= 1) {
                // 正向跳转
                return 1;
            } else if (res < 0) {
                // 负向跳转
                return -1;
            } else {
                // 根本就没有跳转么
                return 0;
            }
        },
        // get 前一张
        getPrev: function(index) {
            return (index === 0) ? (this.itemsLen - 1) : (index - 1);
        },
        // 获取下一张
        getNext: function(index) {
            return (index + 1 === this.itemsLen) ? 0 : (index + 1);
        },

        // 滚动回调
        scroll: function(index, prevIndex, directionFlag) {
            if (index === prevIndex) {
                return;
            }
            if (this.isAnimating) {
                return;
            }

            this.isAnimating = true;

            // 更改开始的下标
            // 这句相当关键，动画状态正在运动时，就不能让startIndex更改了，而放置的最佳位置，就是这里
            this.startIndex = index;
            var self = this,
                container = this.container,
                currentEle = container.find('.' + this.switchItemName).eq(index),
                prevEle = container.find('.' + this.switchItemName).eq(prevIndex),
                promiseCurrent,
                promisePrev;
            // 先移除current next类
            // container.find('.' + this.switchItemName).removeClass('current prev');


            // fade 效果
            promiseCurrent = currentEle.stop(true, true).css({
                'backgroundImage': 'url(' + currentEle.data('img') + ')',
                'backgroundColor': currentEle.data('bg'),
            }).fadeIn(self.effectDuration).promise();
            promisePrev = prevEle.stop(true, true).fadeOut(self.effectDuration).promise();

            // 效果这里控制，本来使用key/value来进行控制，这样代码显得优雅
            self.isPlayNumber && self.playNumber(index);
            $.when(promiseCurrent, promisePrev).done(function() {
                self.isAnimating = false;

            });
        },
        // 触发自动滚动
        autoSwitch: function() {
            var self = this,
                prevIndex;
            var startEle = this.container.find('.' + this.switchItemName).eq(this.startIndex);
            startEle.css({
                'backgroundImage': 'url(' + startEle.data('img') + ')',
                'backgroundColor': startEle.data('bg'),
            }).fadeIn(this.effectDuration);
            this.timer = setInterval(function() {
                prevIndex = self.startIndex;
                self.startIndex = self.getNext(self.startIndex);
                self.scroll(self.startIndex, prevIndex, 1);
            }, self.intervalTime);
        },
        // 阻止滚动
        stopSwitch: function() {
            var self = this;
            if (this.timer) {
                clearInterval(self.timer);
                self.timer = null;
            }
        }
    };
    $.fn[pluginName] = function(opts) {
        // 可初始化并自定义属性及函数
        if (typeof opts === 'string') {
            if (opts === 'api') {
                return $(this).data('plugin-' + pluginName);
            } else {
                throw new Error('error string ,here supports "api" only!');
            }
        }
        return this.each(function() {
            var that = $(this),
                s1 = new my[constructorFunName](that, opts);

            if (!that.data('plugin-' + pluginName)) {
                return that.data('plugin-' + pluginName, s1);
            }

        });

    };
    $.fn[pluginName].defaults = {
        switchWrapperName: 'switch-wrapper',
        switchItemName: 'switch-item',
        switchNumberName: 'switch-number',
        prevBtnName: 'switch-prev',
        nextBtnName: 'switch-next',
        effect: 'moveEffect', // fadeEffect or moveEffect
        moveDirection: 'left', //left or top
        containerWidth: 0,
        containerHeight: 0,
        isHoverPause: true,
        isPlayNumber: true,
        isDirbtn: true,
        startIndex: 0,
        intervalTime: 3000,
        effectDuration: 800
    };

    return constructorFunName;
});
