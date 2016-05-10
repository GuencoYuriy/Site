/**
 * Created by yrik6 on 18.04.2016.
 */
///<reference path="../../typings/jquery.d.ts"/>
///<reference path="../../typings/underscore.d.ts"/>
///<reference path="../../typings/backbone-global.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Table;
(function (Table) {
    var Person = (function (_super) {
        __extends(Person, _super);
        function Person() {
            _super.apply(this, arguments);
        }
        Person.prototype.defaults = function () {
            return {
                id: 0,
                fa: '',
                fa_old: '',
                name: '',
                time: 0,
                aux: '',
                color: '',
                time_color: ''
            };
        };
        return Person;
    }(Backbone.Model));
    Table.Person = Person;
    var PersonView = (function (_super) {
        __extends(PersonView, _super);
        function PersonView(options) {
            _super.call(this, options);
        }
        PersonView.prototype.initialize = function () {
            this.id = this.model.get('id');
            // console.log(this.id);
            this.model.on('change:fa', this.icon, this);
            // this.model.on('change', this.render, this);
            this.model.on('remove', this.remove, this);
        };
        PersonView.prototype.remove = function () {
            this.$el.remove();
            return this;
        };
        PersonView.prototype.render = function () {
            if (!this.$icon) {
                this.$el.html(PersonView.template(this.model.toJSON()));
                this.$icon = this.$el.find(".picture i");
                this.$name = this.$el.find(".name");
            }
            // this.$el.html( this.template(this.model.toJSON()) );
            return this;
        };
        PersonView.prototype.icon = function () {
            var id = this.$icon;
            // var id = this.model.get('id');
            var fa = this.model.get('fa');
            var color = this.model.get('color');
            id.addClass("animated bounceOut").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                id.removeClass().addClass("fa animated rubberBand fa-" + fa).css({ "color": color }).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    id.removeClass("animated rubberBand");
                });
            });
            return this;
        };
        PersonView.template = _.template($('#row-template2').html());
        return PersonView;
    }(Backbone.View));
    Table.PersonView = PersonView;
})(Table || (Table = {}));
//# sourceMappingURL=BounceOutRow.js.map