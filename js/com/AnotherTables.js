/**
 * Created by yrik6 on 06.05.2016.
 */
///<reference path="../base.ts"/>
var TablesAny;
(function (TablesAny) {
    var AnotherTables = (function () {
        function AnotherTables(options) {
            for (var str in options)
                this[str] = options[str];
            this.delay = (isNaN(this.delay) || (this.delay < 10)) ? 20000 : this.delay * 1000;
            this.inicializeTable();
        }
        AnotherTables.prototype.inicializeTable = function () {
            var _this = this;
            this.sendGetQueryTableStats();
            this.sendGetQueryTableMetrics();
            setTimeout(function () { return _this.inicializeTable(); }, this.delay);
        };
        AnotherTables.prototype.sendGetQueryTableStats = function () {
            $.ajax({
                type: "GET",
                url: "http://front-desk.ca/mi/callcenter/dashboard2/realStatus.php?date=2016-03-15T7:58:34",
                dataType: "json",
                success: function (obj) {
                    var temp = obj.result;
                    $("#waiting").text(temp.waiting.value);
                    $("#oldest").text(temp.oldest);
                    $("#answered").text(temp.answered);
                }
            });
        };
        AnotherTables.prototype.sendGetQueryTableMetrics = function () {
            $.ajax({
                type: "GET",
                url: "http://front-desk.ca/mi/callcenter/dashboard2/daylyMetric",
                dataType: "json",
                success: function (obj) {
                    var temp = obj.result;
                    $("#received").text(temp.received);
                    $("#abandcalls").text(temp.abandcalls);
                    $("#abandrate").text(temp.abandrate);
                    $("#abandrate").css('color', temp.abandrate_color);
                    $("#avgaband").text(temp.avgaband);
                    $("#avgspeed").text(temp.avgspeed);
                    $("#avghandl").text(temp.avghandl);
                }
            });
        };
        return AnotherTables;
    }());
    TablesAny.AnotherTables = AnotherTables;
})(TablesAny || (TablesAny = {}));
//# sourceMappingURL=AnotherTables.js.map