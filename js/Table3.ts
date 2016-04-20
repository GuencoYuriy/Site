/**
 * Created by yrik6 on 16.04.2016.
 */
///<reference path="../typings/jquery.d.ts"/>
///<reference path="../typings/underscore.d.ts"/>
///<reference path="../typings/backbone-global.d.ts"/>


interface People {
    stamp:number;
    id:number;
    fa:string;
    name:string;
    time:number;
    aux:string;
}

class library {
    static gettamplate(id: string): any {
        return _.template( $('#' + id).html() );
    }
}

class Person extends Backbone.Model{
    defaults() : People{
        return {
            stamp:0,
            id: 0,
            fa:'',
            name: '',
            time: 0,
            aux: ''
        }
    }

}

class PersonView extends Backbone.View<Person> {
    options: any;
    static template:any
    constructor (options: any) {  super(options); }

    add(){
        console.log('add');

    }

    render (): PersonView {
        this.$el.html(PersonView.template(this.model.toJSON()) );
        return this;
    }
}


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


class AllPersonCollection extends Backbone.Collection<Person> {

    constructor (options: any) {
        super(options);
        for (var str in options) this[str] = options [str];
    }

    parse(response):any {
        console.log(response);
        
        return response.result.list;
    }
}

class AppModel extends Backbone.Model{


}

class AllPersonView extends Backbone.View<AppModel> {
    constructor (options: any){
        super(options);

        PersonView.template =  _.template( $('#row-template').html() );
        this.collection.bind("add", this.ModelAdded,this);
     /* this.listenTo(options.collection,'add',function (ddd) {
         console.log(ddd)
      })*/

    }

    ModelAdded(person): any{
        console.log(person);
        var row: PersonView = new PersonView({
            model:person,
            tagName:'tr'}
        );
        this.$el.append(row.render().el);
        return this;
    }

    render (): any {
        console.log(this.model);
        this.$el.empty();
        this.collection.each(function(person){
            var personView = new PersonView ( {model: person} );
            this.$el.append(personView.render().el);
        }, this);
        return this;
    }
}



    var opt1: any = {
        model: Person,
        url: 'http://front-desk.ca/mi/callcenter/dashboard2/getagents?date=2016-03-15T7:58:34'
    };


    var allPersonCollection = new AllPersonCollection (opt1);


var opt2 ={
    collection: allPersonCollection,
    tagName:'tbody',
    className:'body-scroll',
    id:'mytable'
}

var allPersonView = new AllPersonView(opt2);

$('#tableone').append(allPersonView.el);
    allPersonCollection.fetch();




