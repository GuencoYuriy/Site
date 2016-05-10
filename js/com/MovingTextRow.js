///<reference path="../base.ts"/>
var movingtext;
(function (movingtext) {
    var MovingTextRow = (function () {
        function MovingTextRow(options) {
            this.interval = 200000;
            this.isFirstTime = true;
            this.separator = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
            this.position = 0;
            this.speed = 1;
            for (var str in options)
                this[str] = options[str];
            this.$el = $(options.selector);
            this.width = this.$el.width();
            this.start();
            this.loadData();
        }
        MovingTextRow.prototype.onScrollEnd = function () {
            var _this = this;
            this.render();
            this.stop();
            this.position = 0;
            setTimeout(function () {
                _this.start();
                _this.scroll();
            }, 5000);
        };
        MovingTextRow.prototype.scroll = function () {
            var _this = this;
            if (this.isRuning)
                requestAnimationFrame(function () { _this.scroll(); });
            this.$el.scrollLeft(this.position += this.speed);
            var w = this.$el.scrollLeft();
            if (this.prev == w)
                this.onScrollEnd();
            this.prev = w;
            //console.log(w +'  '+ this.width);
        };
        MovingTextRow.prototype.start = function () {
            this.isRuning = true;
        };
        MovingTextRow.prototype.loadData = function () {
            var _this = this;
            $.get(this.url, this.requestParams, function (result) {
                _this.messages = result.list;
                // console.log(this.messages);
                if (_this.isFirstTime) {
                    _this.render();
                    _this.isFirstTime = false;
                    _this.scroll();
                }
            });
        };
        MovingTextRow.prototype.stop = function () {
            this.isRuning = false;
        };
        MovingTextRow.prototype.render = function () {
            console.log('render    ');
            var mov = $('<div>');
            var p1 = $('<p>').width(this.width + 10).css('display', 'inline-block').appendTo(mov);
            var p2 = $('<p>').html(this.messages.join(this.separator)).appendTo(mov);
            var p3 = $('<p>').width(this.width + 10).css('display', 'inline-block').appendTo(mov);
            this.$el.empty();
            this.$el.append(mov);
        };
        return MovingTextRow;
    }());
    movingtext.MovingTextRow = MovingTextRow;
})(movingtext || (movingtext = {}));
var MTROptions = {
    selector: "#MovingText",
    url: "http://callcenter.front-desk.ca/service/crawl",
    requestParams: { a: "get" },
    interval: 25000,
    speed: 1
};
var movingTextRow = new movingtext.MovingTextRow(MTROptions);
//# sourceMappingURL=MovingTextRow.js.map