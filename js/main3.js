///<reference path="../typings/jquery.d.ts"/>
///<reference path="../typings/underscore.d.ts"/>
///<reference path="../typings/backbone-global.d.ts"/>



class VOAgent{
    stamp:number;
    id:number;
    fa:string;
    name:string;
    time:number;
    aux:string;
}
class AgentModel extends Backbone.Model{

    defaults():VOAgent{
        return {
            stamp:0,
            id:3,
            fa:'',
            name:'',
            time:0,
            aux:''
        }
    }
}

class AgentsC extends Backbone.Collection<AgentModel>{

    model = AgentModel;
    data:any;

    constructor(options:any){
        super(options)
        this.url = options.url
        this.parse = (res)=>{
            this.data = res;

            var stamp = Date.now();
            _.map(res.result.list,function(item:any){
                item.stamp = stamp;
                item.icon = 'fa fa-'+item.fa;

            });
            //console.log(res.result.list.length);
          //  console.log(res);
            return res.result.list
        }
    }
    //parse:(data)=>{ }
}


class Row extends Backbone.View<AgentModel>{
    template:(data:any)=>string;
    model:AgentModel;
    constructor(options:any){
        super(options);
        this.template = _.template($('#row-template').html());
        this.model.bind('change', ()=>this.render());
        this.model.bind('destroy',()=>this.destroy());
        this.model.bind('remove',()=>this.remove());
        this.model.bind('add',()=>this.add());
    }

    render() {

        //console.log(this.model);
        this.$el.html(this.template(this.model.toJSON()));

        return this;
    }

    remove():Row{
        this.$el.fadeOut(()=>{
            super.remove();
        })
        return this;

    }
    add():void{
console.log('add');
    }
    destroy():void{
        //console.log('destroy');
    }




}

class AppModel extends Backbone.Model{

    
}


class TableView extends Backbone.View<AppModel>{
    collectionAgentsC;
    constructor(){
        super();
       this.setElement($("#TableList"), true);
      var collection = new AgentsC({url:'http://callcenter.front-desk.ca/service/getagents?date=2016-03-15T7:58:34'})
       // collection.bind('reset', this.render);
      this.collection = collection;
        this.collection.bind('remove',(evt)=>{
            //console.log('remove',evt);
        },this);

        this.collection.bind("add",(evt)=>{
            this.addRow(evt)
      },this);

        this.render = function(){
            //console.log(this);
            return this;
        }
      collection.fetch();
       setInterval(()=> {
            this.collection.fetch();

        }, 5000);
    }

    addRow(model:AgentModel):void{
      //  console.log('add',model);
        var row = new Row({model:model,tagName:'tr'});
        this.$el.append(row.render().el);
    }
    render():TableView{

       // console.log('render');

        return this;
    }



}

class TableScroll extends TableView {
    $container:JQuery;
    $scroll:JQuery
    height:number;
    constructor (){
        super();
        this.$container = $('#TableContainer')
        this.$scroll = this.$container.children(0);
        this.height = this.$container.height();
        this.$container.on('mouseover',(evt)=>{
            this.stopScroll();
        })
        this.$container.on('mouseout',(evt)=>{
    this.startScroll();
        })
    }
    timer:number;
    stopScroll():void{
       clearInterval(this.timer);
        this.timer = 0;
    }
    startScroll():void{
        if(this.timer !==0)return;
        this.timer = setInterval(()=>this.scrollUp(),2000);
    }
    currentScroll:number = 0;
    scrollUp():void{
        var h = this.$el.children(1).height();
        this.currentScroll +=h;
        this.$scroll.animate({scrollTop:this.currentScroll});

        console.log('current : '+ this.currentScroll+'   height '+this.$el.height());
        if(this.currentScroll>=this.$el.height()) this.scrollBack()
    }
    scrollBack():void{
        this.currentScroll = 0;
        this.$container.animate({scrollTop:0});
    }
  /*  addRow(model:AgentModel):void{
        console.log(this.$el.height());
     /!*   var h:number = this.$el.height();
        if(this.height < h){
            var row = new Row({model:model,tagName:'tr'});
            this.$el.append(row.render().el);
        }*!/
        console.log((this.$el.children().length))
       // console.log('add new',model);

    }
*/

}
