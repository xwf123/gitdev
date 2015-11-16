define(['jquery'], function($) {
    var nav = {
        /*子导航箭头背景*/
        navIcon: {
            width: 126
        },
        /*边界探测*/
        isEdges: function(mainMenuOffsetLeft, mainMenuWidth, subnavWidth) {
            return mainMenuOffsetLeft + 0.5 * mainMenuWidth + 0.5 * subnavWidth > window.innerWidth;
        },
        setSubmenuPosition: function(mainMenuItem) {
            var subNav = mainMenuItem.find('.sub-nav'),
                navIcon = subNav.find('.nav-icon'),
                subMenu, subMenuWidth, mainMenuWidth, mainMenuOffsetLeft = 0,
                left = 0,
                subMenuBgPositionLeft = 'center',
                _this = this;
            if (!subNav.length) {
                return;
            }
            subMenu = subNav.find('ul');
            mainMenuWidth = mainMenuItem.outerWidth();
            mainMenuOffsetLeft = mainMenuItem.offset().left;
            subMenuBgPositionLeft = mainMenuOffsetLeft + 0.5 * mainMenuWidth;

            if (!subMenu.data('width')) {
                subMenuWidth = subMenu.outerWidth();
                subMenu.data('width', subMenuWidth);
            } else {
                subMenuWidth = subMenu.data('width');
            }
            if (this.isEdges(mainMenuOffsetLeft, mainMenuWidth, subMenuWidth)) {
                left = window.innerWidth - subMenuWidth;
            } else {
                left = mainMenuItem.offset().left - subMenuWidth * 0.5 + mainMenuItem.outerWidth() * 0.5;
            }
            navIcon.css({
                'left': subMenuBgPositionLeft - _this.navIcon.width / 2 + 'px'
            });
            subMenu.css({
                'left': left + 'px'
            });

            return this;
        },
        /*
         * 悬浮在主菜单，显示子菜单效果
         */
        eventHandler: function(mainMenuItem) {
            mainMenuItem.hover(function() {
                var subnav = $(this).find('.sub-nav');
                subnav.removeClass('hide').addClass('show');
            }, function() {
                var subnav = $(this).find('.sub-nav');
                subnav.removeClass('show').addClass('hide');
            });
            return this;
        },
        repainEachNav: function(mainMenuItem) {
            var _this = this;
            $.each(mainMenuItem, function(index, ele) {
                _this.setSubmenuPosition($(ele));
            });
            return this;
        },
        getActiveMainMenuTag: function(mainMenuItem) {
            return mainMenuItem.filter('.active').data('tag');
        },
        init: function() {
            var _this = this,
                mainMenuItem = $('.main-nav-item');
            this.repainEachNav(mainMenuItem);
            mainMenuItem.filter('.active').find('.sub-nav').addClass('show');
            if (this.getActiveMainMenuTag(mainMenuItem) === 'index') {
                this.eventHandler(mainMenuItem);
            }
            $(window).resize(function() {
                _this.repainEachNav(mainMenuItem);
            });
        }
    };
    return nav;
});
