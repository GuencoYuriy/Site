/**
 * Created by yrik6 on 16.04.2016.
 */
///<reference path="../typings/jquery.d.ts"/>
///<reference path="../typings/underscore.d.ts"/>
///<reference path="../typings/backbone-global.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var library = (function () {
    function library() {
    }
    library.gettamplate = function (id) {
        return _.template($('#' + id).html());
    };
    return library;
}());
var Person = (function (_super) {
    __extends(Person, _super);
    function Person() {
        _super.apply(this, arguments);
    }
    Person.prototype.defaults = function () {
        return {
            stamp: 0,
            id: 0,
            fa: '',
            name: '',
            time: 0,
            aux: ''
        };
    };
    return Person;
}(Backbone.Model));
var PersonView = (function (_super) {
    __extends(PersonView, _super);
    function PersonView(options) {
        _super.call(this, options);
    }
    PersonView.prototype.add = function () {
        console.log('add');
    };
    PersonView.prototype.render = function () {
        this.$el.html(PersonView.template(this.model.toJSON()));
        return this;
    };
    return PersonView;
}(Backbone.View));
// class TableViewOptions implements Backbone.ViewOptions<Person> {
//     tpl: any;
//     constructor(){
//
//         // super();
//         this.id = this.get('id');
//         // this.tpl = library.gettamplate('row-template');
//         this.tpl = _.template( $('#row-template').html() );
//     }
//     tagName: 'tr';
//     className: 'myline';
//     model: this;
// }
var AllPersonCollection = (function (_super) {
    __extends(AllPersonCollection, _super);
    function AllPersonCollection(options) {
        _super.call(this, options);
        for (var str in options)
            this[str] = options[str];
    }
    AllPersonCollection.prototype.parse = function (response) {
        console.log(response);
        return response.result.list;
    };
    return AllPersonCollection;
}(Backbone.Collection));
var AppModel = (function (_super) {
    __extends(AppModel, _super);
    function AppModel() {
        _super.apply(this, arguments);
    }
    return AppModel;
}(Backbone.Model));
var AllPersonView = (function (_super) {
    __extends(AllPersonView, _super);
    function AllPersonView(options) {
        _super.call(this, options);
        PersonView.template = _.template($('#row-template').html());
        this.collection.bind("add", this.ModelAdded, this);
        /* this.listenTo(options.collection,'add',function (ddd) {
            console.log(ddd)
         })*/
    }
    AllPersonView.prototype.ModelAdded = function (person) {
        console.log(person);
        var row = new PersonView({
            model: person,
            tagName: 'tr' });
        this.$el.append(row.render().el);
        return this;
    };
    AllPersonView.prototype.render = function () {
        console.log(this.model);
        this.$el.empty();
        this.collection.each(function (person) {
            var personView = new PersonView({ model: person });
            this.$el.append(personView.render().el);
        }, this);
        return this;
    };
    return AllPersonView;
}(Backbone.View));
var opt1 = {
    model: Person,
    url: 'http://front-desk.ca/mi/callcenter/dashboard2/getagents?date=2016-03-15T7:58:34'
};
var allPersonCollection = new AllPersonCollection(opt1);
var opt2 = {
    collection: allPersonCollection,
    tagName: 'tbody',
    className: 'body-scroll',
    id: 'mytable'
};
var allPersonView = new AllPersonView(opt2);
$('#tableone').append(allPersonView.el);
allPersonCollection.fetch();
//# sourceMappingURL=Table3.js.map