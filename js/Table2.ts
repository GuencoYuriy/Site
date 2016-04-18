/**
 * Created by yrik6 on 17.04.2016.
 */
///<reference path="../typings/jquery.d.ts"/>
///<reference path="../typings/underscore.d.ts"/>
///<reference path="../typings/backbone-global.d.ts"/>

interface People {
    id:number;
    fa:string;
    name:string;
    time:number;
    aux:string;
    color:string;
    time_color:string;
}

class Person extends Backbone.Model{
    defaults() : People{
        return {
            id: 0,
            fa: '',
            name: '',
            time: 0,
            aux: '',
            color: '',
            time_color: ''
        }
    }
}

class PersonView extends Backbone.View<Person> {
    template:any = _.template( $('#row-template').html() );
    constructor (options: any) {
        super(options);
    }

    initialize(): any {
        this.id = this.model.get('id');
    }

    render (): PersonView {
        this.$el.html( this.template(this.model.toJSON()) );
        return this;
    }
}

class AllPersonCollection extends Backbone.Collection<Person> {
    constructor (options: any) {
        super(options);
        for (var str in options) this[str] = options [str];
    }

    parse(response):any {
        return response.result.list;
    }
}

class AllPersonView extends Backbone.View<Person> {
    // options = {
    //     model: null,
    //     tagName: 'tr',
    //     className: 'myline'
    // }
    private options: any;
    constructor (options: any){
        super(options);
        this.options = options;
        this.collection.bind("add", this.ModelAdded,this);
        this.collection.fetch();
    }

    ModelAdded(person): any{
        var rowOpt = this.options.optionsRow;
        rowOpt.model = person;
        var row: PersonView = new PersonView(rowOpt);
        this.$el.append(row.render().el);
        return this;
    }

    render (): any {
        // console.log(this.model);
        this.$el.empty();
        // this.collection.each(function(person){
        //     var personView = new PersonView ( {model: person} );
        //     this.$el.append(personView.render().el);
        // }, this);
        return this;
    }
}

var allPersonCollection = new AllPersonCollection({
    model: Person,
    url: 'http://front-desk.ca/mi/callcenter/dashboard2/getagents?date=2016-03-15T7:58:34'
})

var options = {
    collection: allPersonCollection,
    tagName:'tbody',
    className:'body-scroll',
    id:'mytable',
    optionsRow:  {
        model: null,
        tagName: 'tr',
        className: 'myline'
    }
}

var allPersonView = new AllPersonView(options);

$('#tableone').append(allPersonView.el);
// allPersonCollection.fetch();