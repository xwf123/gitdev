/*
 * author:leweiming
 * description: slider
 * gmail:xmlovecss 艾特 gmail dot com
 */
define(['jquery', 'lazyload'], function($, lazyload) {
    var my = {},
        constructorFunName = 'Slider',
        pluginName = 'slider';

    my[constructorFunName] = function(container, options) {
        var settings = $.extend(true, {}, $.fn[pluginName].defaults, options);

        for (var prop in settings) {
            if (settings.hasOwnProperty(prop)) {
                this[prop] = settings[prop];
            }
        }
        // dom初始化
        this.container = container;
        this.body = this.container.find(this.domSelector.body);
        this.box = this.container.find(this.domSelector.box);
        this.prevBtn = this.container.find(this.domSelector.prevBtn);
        this.nextBtn = this.container.find(this.domSelector.nextBtn);

        // 若存在宽度设置，使用该宽度
        // 否则，请设置每次挪动的个数
        this.width = this.width || (this.itemWidth + this.gutter) * this.moveItems - this.gutter;
        // 全局动画标志
        this.isAnimating = false;
        // 初始化
        this.init();
    };
    my[constructorFunName].prototype = {
        constructor: my[constructorFunName],
        // 滚动初始化
        init: function() {
            this.render().handler();
            this.btnShowHide();
            this.lazyloadImg();
            return this;
        },
        lazyloadImg:function(){
            this.container.find('img').lazyload({
            });
        },
        // 事件处理器
        handler: function() {
            var _this = this;
            this.prevBtn.on('click', function(e) {
                e.preventDefault();
                _this.move('right');
                // _this.lazyloadImg();
            });
            this.nextBtn.on('click', function(e) {
                e.preventDefault();
                _this.move('left');
                 // _this.lazyloadImg();
            });
            // 快捷键绑定
            // 前进后退
            /*$(window).on('keyup.' + pluginName, function(e) {
                switch (e.keyCode) {
                    case 37:
                        _this.move('right');
                        break;
                    case 39:
                        _this.move('left');
                        break;
                }
            });*/
            return this;
        },
        // 渲染
        render: function() {
            this.body.css({
                width: this.width + 'px',
                height: this.height + 'px'
            });
            this.container.find(this.domSelector.item).css({
                width: this.itemWidth + 'px',
                height: this.height + 'px'
            });
            return this;
        },
        // 水平偏移值获取
        getOffset: function() {
            return Math.abs(parseInt(this.box.css('left'), 10));
        },
        // 图片总数
        getAllItems: function() {
            return this.container.find(this.domSelector.item).length;
        },
        // 一屏最多容纳的个数
        maxItems: function() {
            var max = (this.width + this.gutter) / (this.itemWidth + this.gutter);
            return Math.floor(max);
        },
        // 首屏
        toStart: function() {
            return this.getOffset() === 0;
        },
        endOffset: function() {
            // 判断是否到轮播的结尾
            // 分两种情况：1.首屏没有填满；2.超过首屏，总宽度减去首屏的宽度，如果等于left偏移量，则到了结尾
            var allItemOffset = this.getAllItems() * (this.itemWidth + this.gutter) - this.gutter;
            return (allItemOffset - this.width);

        },
        // 末屏
        toEnd: function() {
            if (this.getAllItems() <= this.maxItems()) {
                return true;
            } else {
                if (this.getOffset() === this.endOffset()) {
                    return true;
                }
            }
            return false;
        },
        // 向右需要挪动的个数
        prevItems: function() {
            var restItems = (this.getOffset() + this.gutter) / (this.itemWidth + this.gutter);

            if (restItems <= 0) {
                return 0;

            }
            // 如果剩余的挪动个数超过了单屏最大个数，则挪动一个单屏
            // 否则使用start作为标志
            restItems = restItems > this.maxItems() ? this.maxItems() : 'start';
            // 如果设置不是最大挪动个数（为用户设定的挪动个数）
            if (this.moveItems !== 'max' && restItems !== 'start') {
                return this.moveItems;
            } else {
                // 否则挪动剩余的个数
                return restItems;
            }
        },

        // 向左需要挪动的个数
        nextItems: function() {
            var restItems = this.getAllItems() - (this.getOffset() + this.gutter) / (this.itemWidth + this.gutter) - this.maxItems();
            if (restItems <= 0) {
                return 0;
            }

            restItems = (restItems > this.maxItems()) ? this.maxItems() : 'end';

            if (this.moveItems !== 'max' && restItems !== 'end') {
                return this.moveItems;
            } else {
                return restItems;
            }
        },

        // 挪动的距离
        moveUnits: function(items) {
            if (!items || typeof items === 'string') {
                return false;
            }
            items = Math.floor(items);
            return items * (this.itemWidth + this.gutter);
        },
        btnShowHide: function() {
            this.toStart() ? this.prevBtn.hide() : this.prevBtn.show();
            this.toEnd() ? this.nextBtn.hide() : this.nextBtn.show();

        },
        // 挪动
        move: function(direction) {
            var to = 0,
                _this = this;
            if (direction === 'left') {
                if (isNaN(this.nextItems())) {
                    // to end position
                    to = (this.itemWidth + this.gutter) * this.getAllItems() - this.gutter - this.width;
                } else {
                    to = this.getOffset() + this.moveUnits(this.nextItems());
                }
            } else if (direction === 'right') {
                if (isNaN(this.prevItems())) {
                    // to start position
                    to = 0;
                } else {
                    to = this.getOffset() - this.moveUnits(this.prevItems());
                }
            }
            if (!this.isAnimating) {
                this.isAnimating = true;
                $.when(this.animate(to)).then(function() {
                    _this.isAnimating = false;
                    _this.btnShowHide();
                    _this.lazyloadImg();
                });
            }

            return this;
        },
        animate: function(to) {
            return this.box.animate({
                'left': -to + 'px'
            }, this.duration).promise();
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
    // 默认参数配置
    $.fn[pluginName].defaults = {
        // dom配置，若样式定义存在冲突，可以更改此处dom和样式即可
        domSelector: {
            wrapper: '.m-slider', // slider最外层
            box: '.slider-box', // slider 列表
            item: '.slider-item', // slider 列表项
            body: '.inner', // slider内层
            move: '.move', // 前后左右包裹层
            prevBtn: '.move .prev', // 前一个
            nextBtn: '.move .next' // 下一个
        },
        // 注意，一次移动指定个数时，一屏包含的个数应当是整数，而不是半个
        moveItems: 'max', //默认每次挪动单屏里容纳的最大个数
        duration: 400, //动画持续时间
        // width: 960, // 一屏展示的容器总宽度
        height: 300, // 一屏展示的总高度
        itemWidth: 200, // 单个展示图的宽度
        gutter: 10 // 展示图的右间距
    };

    /*if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
        define(function() {
            return constructorFunName;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = constructorFunName;
    } else {
        window.constructorFunName = constructorFunName;
    }*/
});
