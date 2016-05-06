/**
 * Created by yrik6 on 17.04.2016.
 */
///<reference path="../../typings/jquery.d.ts"/>
///<reference path="../../typings/underscore.d.ts"/>
///<reference path="../../typings/backbone-global.d.ts"/>
///<reference path="../com/BounceOutRow.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Table;
(function (Table) {
    var AllPersonCollection = (function (_super) {
        __extends(AllPersonCollection, _super);
        function AllPersonCollection(options) {
            _super.call(this, options);
            for (var str in options)
                this[str] = options[str];
        }
        AllPersonCollection.prototype.parse = function (response) {
            console.log(response.total);
            var stamp = response.stamp.replace(' ', 'T');
            console.log(this.url);
            this.url = 'http://callcenter.front-desk.ca/service/getagents?date=' + stamp;
            console.log(this.url);
            return response.result.list;
        };
        return AllPersonCollection;
    }(Backbone.Collection));
    Table.AllPersonCollection = AllPersonCollection;
    var AllPersonView = (function (_super) {
        __extends(AllPersonView, _super);
        function AllPersonView(options) {
            _super.call(this, options);
            this.options = options;
            this.collection.bind("add", this.ModelAdded, this);
        }
        AllPersonView.prototype.ModelAdded = function (person) {
            var rowOpt = this.options.optionsRow;
            rowOpt.model = _.clone(person);
            rowOpt.id = rowOpt.model.get('id');
            // console.log(rowOpt.id);
            var row = new Table.PersonView(rowOpt);
            this.$el.append(row.render().el);
            $("#" + row.model.get('id') + " .picture i").addClass("animated rubberBand").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $("#" + row.model.get('id') + " .picture i").removeClass("animated rubberBand");
            });
            return this;
        };
        return AllPersonView;
    }(Backbone.View));
    Table.AllPersonView = AllPersonView;
})(Table || (Table = {}));
$(document).ready(function () {
    var allPersonCollection = new Table.AllPersonCollection({
        model: Table.Person,
        // url: 'http://front-desk.ca/mi/callcenter/dashboard2/getagents?date=2016-03-15T7:58:34'
        url: 'http://callcenter.front-desk.ca/service/getagents?date=2016-03-15T7:58:34'
    });
    var options = {
        collection: allPersonCollection,
        tagName: 'tbody',
        className: 'body-scroll',
        id: 'mytable',
        optionsRow: {
            model: null,
            tagName: 'tr',
            className: 'myline',
            id: null
        }
    };
    var allPersonView = new Table.AllPersonView(options);
    options.collection.fetch();
    setInterval(function () {
        options.collection.fetch();
    }, 10000);
    $('#tableone').append(allPersonView.el);
});
//# sourceMappingURL=Table2.js.map