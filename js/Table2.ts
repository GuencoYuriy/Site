/**
 * Created by yrik6 on 17.04.2016.
 */
///<reference path="../typings/jquery.d.ts"/>
///<reference path="../typings/underscore.d.ts"/>
///<reference path="../typings/backbone-global.d.ts"/>
///<reference path="Row.ts"/>

module Table {
    export class AllPersonCollection extends Backbone.Collection<Person> {
        constructor(options:any) {
            super(options);
            for (var str in options) this[str] = options [str];
        }

        parse(response):any {
            console.log(response.total);
            var stamp: string = response.stamp.replace(' ', 'T');
            console.log(this.url);
            this.url = 'http://callcenter.front-desk.ca/service/getagents?date=' + stamp;
            console.log(this.url);
            return response.result.list;
        }
    }

    export class AllPersonView extends Backbone.View<Person> {
        // options = {
        //     model: null,
        //     tagName: 'tr',
        //     className: 'myline'
        // }
        private options:any;

        constructor(options:any) {
            super(options);
            this.options = options;
            this.collection.bind("add", this.ModelAdded, this);
        }

        ModelAdded(person):any {
            var rowOpt = this.options.optionsRow;
            rowOpt.model = _.clone(person); //TODO Надо развязать
            rowOpt.id = rowOpt.model.get('id');
            // console.log(rowOpt.id);
            var row:PersonView = new PersonView(rowOpt);
            this.$el.append(row.render().el);

            $("#" + row.model.get('id') + " .picture i").addClass("animated rubberBand").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                function () {
                    $("#" + row.model.get('id') + " .picture i").removeClass("animated rubberBand");
                }
            );
            
            
            return this;
        }

        // render():any {
        //     // console.log(this.model);
        //     this.$el.empty();
        //     // this.collection.each(function(person){
        //     //     var personView = new PersonView ( {model: person} );
        //     //     this.$el.append(personView.render().el);
        //     // }, this);
        //     return this;
        // }
    }
}

$(document).ready (function () {
    var allPersonCollection = new Table.AllPersonCollection({
        model: Table.Person,
        // url: 'http://front-desk.ca/mi/callcenter/dashboard2/getagents?date=2016-03-15T7:58:34'
        url: 'http://callcenter.front-desk.ca/service/getagents?date=2016-03-15T7:58:34'
    })

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
    }

    var allPersonView = new Table.AllPersonView(options);
    options.collection.fetch();
    setInterval(function(){
        options.collection.fetch();
    }, 10000);
    $('#tableone').append(allPersonView.el);
})