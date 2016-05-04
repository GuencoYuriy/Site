/**
 * Created by yrik6 on 18.04.2016.
 */
///<reference path="../../typings/jquery.d.ts"/>
///<reference path="../../typings/underscore.d.ts"/>
///<reference path="../../typings/backbone-global.d.ts"/>
    
module Table {
    interface People {
        id:number;
        fa:string;
        fa_old:string;
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
                fa_old: '',
                name: '',
                time: 0,
                aux: '',
                color: '',
                time_color: ''
            }
        }
    }

    export class PersonView extends Backbone.View<Person> {
        static template:any = _.template( $('#row-template2').html() );
        $icon: JQuery;
        $name: JQuery;
        constructor (options: any) {
            super(options);
        }
    
        initialize(): any {
            this.id = this.model.get('id');
            // console.log(this.id);
            this.model.on('change:fa', this.icon, this);
            // this.model.on('change', this.render, this);
            this.model.on('remove', this.remove, this);
        }
    
        remove (): PersonView  {
            this.$el.remove();
            return this;
        }
    
        render (): PersonView {
            if (!this.$icon) {
                this.$el.html( PersonView.template(this.model.toJSON()) );
                this.$icon = this.$el.find(".picture i");
                this.$name = this.$el.find(".name");
            }
            // this.$el.html( this.template(this.model.toJSON()) );
            return this;
        }
    
        icon (): PersonView {
            var id = this.$icon;
            // var id = this.model.get('id');
            var fa = this.model.get('fa');
            var color = this.model.get('color');
            id.addClass("animated bounceOut").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                function () {
                    id.removeClass().addClass("fa animated rubberBand fa-" + fa).css({"color":color}).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                        function () {
                            id.removeClass("animated rubberBand");
                        }
                    );
                }
            );
            return this;
        }
    }
}
