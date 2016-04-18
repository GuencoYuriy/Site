/**
 * Created by yrik6 on 17.04.2016.
 */
///<reference path="../typings/jquery.d.ts"/>
///<reference path="../typings/underscore.d.ts"/>
///<reference path="../typings/backbone-global.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Person = (function (_super) {
    __extends(Person, _super);
    function Person() {
        _super.apply(this, arguments);
    }
    Person.prototype.defaults = function () {
        return {
            id: 0,
            fa: '',
            name: '',
            time: 0,
            aux: '',
            color: '',
            time_color: ''
        };
    };
    return Person;
}(Backbone.Model));
var PersonView = (function (_super) {
    __extends(PersonView, _super);
    // model: Person;
    function PersonView(options) {
        _super.call(this, options);
        // this.template = options.template;
        // this.model = options.model;
        console.log(this);
        // this.initialize();
    }
    PersonView.prototype.initialize = function () {
        this.id = this.model.get('id');
    };
    PersonView.prototype.render = function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    };
    return PersonView;
}(Backbone.View));
var person = new Person({
    id: 10,
    fa: 'hsagdhs',
    name: 'JJJJ',
    time: 20,
    aux: 'ada',
    color: 'sds',
    time_color: 'sdsd'
});
var options = {
    model: person,
    tagName: 'tr',
    className: 'myline',
    template: _.template($('#row-template').html())
};
var personView = new PersonView(options);
console.log(personView.id);
//# sourceMappingURL=Table4.js.map