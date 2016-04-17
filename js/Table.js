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
        // this.model.bind('add',()=>this.add());
        // this.render();
        // console.log(options.tpl);
    }
    PersonView.prototype.add = function () {
        console.log('add');
    };
    // initialize() {
    //     this.render();
    // }
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
    // model = Person;
    function AllPersonCollection(options) {
        _super.call(this, options);
        for (var str in options) {
            this[str] = options[str];
        }
        // this.model = Person;
        // this.url = 'http://front-desk.ca/mi/callcenter/dashboard2/getagents?date=2016-03-15T7:58:34';
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
        for (var str in options) {
            this[str] = options[str];
        }
        PersonView.template = _.template($('#row-template').html());
        // this.setElement($("#tableone"), true);
        // this.tagName = 'tbody';
        //this.className = 'body-scroll';
        //this.id = 'mainbody';
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
// var person = new Person();
// var options = new TableViewOptions();
// var personView = new PersonView ( options );
var opt = {
    model: Person,
    url: 'http://front-desk.ca/mi/callcenter/dashboard2/getagents?date=2016-03-15T7:58:34'
};
var allPersonCollection = new AllPersonCollection(opt);
var allPersonView = new AllPersonView({
    collection: allPersonCollection,
    tagName: 'tbody',
    className: 'body-scroll',
    id: 'mytable'
});
$('#tableone').append(allPersonView.el);
allPersonCollection.fetch();
//     tagName: 'tr',
//     className: 'myline',
//     id: function() {
//         return this.model.get('id');
//     },
//
//     template:  template('row-template'),
//
//     render: function() {
//         this.$el.html( this.template(this.model.toJSON()) );
//         return this;
//     }
// });
//# sourceMappingURL=Table.js.map