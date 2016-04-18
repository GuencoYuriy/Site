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
    function PersonView(options) {
        _super.call(this, options);
        this.template = _.template($('#row-template').html());
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
var AllPersonCollection = (function (_super) {
    __extends(AllPersonCollection, _super);
    function AllPersonCollection(options) {
        _super.call(this, options);
        for (var str in options)
            this[str] = options[str];
    }
    AllPersonCollection.prototype.parse = function (response) {
        return response.result.list;
    };
    return AllPersonCollection;
}(Backbone.Collection));
var AllPersonView = (function (_super) {
    __extends(AllPersonView, _super);
    function AllPersonView(options) {
        _super.call(this, options);
        this.options = options;
        this.collection.bind("add", this.ModelAdded, this);
        this.collection.fetch();
    }
    AllPersonView.prototype.ModelAdded = function (person) {
        var rowOpt = this.options.optionsRow;
        rowOpt.model = person;
        var row = new PersonView(rowOpt);
        this.$el.append(row.render().el);
        return this;
    };
    AllPersonView.prototype.render = function () {
        // console.log(this.model);
        this.$el.empty();
        // this.collection.each(function(person){
        //     var personView = new PersonView ( {model: person} );
        //     this.$el.append(personView.render().el);
        // }, this);
        return this;
    };
    return AllPersonView;
}(Backbone.View));
var allPersonCollection = new AllPersonCollection({
    model: Person,
    url: 'http://front-desk.ca/mi/callcenter/dashboard2/getagents?date=2016-03-15T7:58:34'
});
var options = {
    collection: allPersonCollection,
    tagName: 'tbody',
    className: 'body-scroll',
    id: 'mytable',
    optionsRow: {
        model: null,
        tagName: 'tr',
        className: 'myline'
    }
};
var allPersonView = new AllPersonView(options);
$('#tableone').append(allPersonView.el);
// allPersonCollection.fetch(); 
//# sourceMappingURL=Table2.js.map