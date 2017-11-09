
function slider(opts) {
    this.opts = $.extend(true, {  //$.extend(boolean,{},{} )如果boolean:true代表合并，false代表覆盖
        container: null,
        imgClass: '',
        litterBarClass: '',
        autoPlay: false
    }, opts);
    this.current = 0;
    this.list = this.opts.container.find(this.opts.imgClass);
    this.list.hide().eq(0).show();
    this.len = this.list.length;
    this.litterbar = this.opts.container.find(this.opts.litterBarClass);
    this.init();
}

slider.prototype = { //slider对象实例共享
    init: function() {
        var me = this;
        this.litterbar.eq(0).addClass("on");
        this.opts.container.mouseover(function() {
            clearTimeout(me.timer);
        });
        //向右
        this.opts.container.find(".prev").click(function() {
            me.prev();
        });
        //向左
        this.opts.container.find(".next").click(function() {
            me.next();
        });
        //小圆点导航
        this.opts.container.find(me.opts.litterBarClass).click(function(evt) {
            var index = $(this).index();
            me.switchTo(index);
        });
        //自动播放
        if (this.opts.autoPlay) {
            this.opts.container.mouseout(function() {
                me.play();
            });
            me.play();
        }
    },
    //自动播放
    play: function() {
        var me = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function() {
            me.next(function() {
                me.play();
            });
        }, 1000);
    },
    prev: function(callback) {
        var current = this.current - 1;
        if (current === -1) {
            this.current = current = this.len - 1;
        }
        this.switchTo(current, callback);
    },
    next: function(callback) {
        var current = this.current + 1;
        if (current === this.len) {
            this.current = current = 0;
        }
        this.switchTo(current, callback);
    },

    switchTo: function(current, callback) {
        this.current = current;
        this.list.hide();
        this.list.eq(current).show();
        this.litterbar.removeClass("on");
        this.litterbar.eq(current).addClass('on');
        callback && callback();
    }
};
var container = $(".pro-box");
var sliderInstance = new slider({
    container: container,
    imgClass: container.find(".pro-img li"),
    autoPlay: true,
    litterBarClass: container.find('.btn-dot li'),
});

