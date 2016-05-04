///<reference path="../base.ts"/>
module movingtext{
  export  class MovingTextRow{       
        private interval:number=200000;       
        private width:number;
        private isFirstTime:boolean=true;
        private separator="&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
        $el:JQuery;
        url:string;
        requestParams:any;
        messages:Array<string>;
      private position:number =0;
      private speed:number=1;


      isRuning:boolean

        constructor(options:any){
            for(var str in options)this[str]=options[str];
            this.$el=$(options.selector);
            this.width = this.$el.width();
            this.start();
           this.loadData();
        }


      private onScrollEnd():void{
          this.render();
          this.stop();
          this.position = 0;
          setTimeout(()=>{
              this.start();
              this.scroll();
          },5000);
      }
      private prev:number;
      scroll():void{
          if(this.isRuning)requestAnimationFrame(()=>{  this.scroll(); });
          this.$el.scrollLeft(this.position+=this.speed);
          var w = this.$el.scrollLeft();
          if(this.prev ==w)this.onScrollEnd();
          this.prev = w;
          //console.log(w +'  '+ this.width);
      }
        start():void {
            this.isRuning = true
        }

      loadData():void{
          $.get(this.url,this.requestParams,(result)=>{
              this.messages=result.list;
             // console.log(this.messages);

              if (this.isFirstTime){
                  this.render();
                  this.isFirstTime=false;
                  this.scroll();
              }
          });
      }

         stop(){
             this.isRuning = false;
        }

        private render(){
            console.log('render    ');
            var mov =  $('<div>');
            var p1  = $('<p>').width(this.width+10).css('display','inline-block').appendTo(mov);
            var p2  = $('<p>').html(this.messages.join(this.separator)).appendTo(mov);
            var p3  = $('<p>').width(this.width+10).css('display','inline-block').appendTo(mov);
            this.$el.empty();
            this.$el.append(mov);
        }
       
    }
}
var MTROptions={
    selector:"#MovingText",
    url:"http://callcenter.front-desk.ca/service/crawl",
    requestParams:{a:"get"},
    interval:25000,
    speed:1
}
var movingTextRow = new movingtext.MovingTextRow(MTROptions);