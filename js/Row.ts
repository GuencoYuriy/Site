/**
 * Created by yrik6 on 18.04.2016.
 */
///<reference path="../typings/jquery.d.ts"/>
///<reference path="../typings/underscore.d.ts"/>
///<reference path="../typings/backbone-global.d.ts"/>
    
module Table {
    interface People {
        id:number;
        fa:string;
        name:string;
        time:number;
        aux:string;
        color:string;
        time_color:string;
    }

    export class Person extends Backbone.Model{
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

    export class PersonView extends Backbone.View<Person> {
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
}
