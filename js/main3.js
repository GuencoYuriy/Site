// window.TableOne = App;

window.collection22 = new TableOne.Collections.AllPersonCollection();
window.allPersonView22 = new TableOne.Views.AllPersonView ({model: collection22});
    
    setInterval(function(){
        collection22.fetch({reset: true});
    }, 5000);

$('#tableone').append(allPersonView22.render().el);