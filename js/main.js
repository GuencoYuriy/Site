(function() {
	var App = {
		Models: {},
		Views: {},
		Collections: {}
	};
 
	//хэлпер шаблона
	var template = function(id) {
		return _.template( $('#' + id).html() );
	};

	window.TableOne = App;

	App.Models.Person = Backbone.Model.extend ({
		defaults: {
			id: 0,
			name: '',
			time: 0,
			aux: ''
		},
	});

	App.Views.PersonView = Backbone.View.extend ({
		initialize: function() {
			this.render();
		},

		tagName: 'tr',
		className: 'myline',
		id: function() {
		    return this.model.get('id');
		},

		template:  template('row-template'),

		render: function() {
			this.$el.html( this.template(this.model.toJSON()) );
			return this;
		}
	});

	App.Collections.AllPersonCollection = Backbone.Collection.extend ({
		model: App.Models.Person,
		url: 'http://front-desk.ca/mi/callcenter/dashboard2/getagents?date=2016-03-15T7:58:34',
		parse: function(response) {
			// console.log(response);
	    	return response.result.list;
	    },

		initialize: function() {
			// console.log(this.url);
		}
		});

		App.Views.AllPersonView = Backbone.View.extend ({
			tagName: 'tbody',
		className: 'body-scroll',
		id: 'mainbody',


		initialize: function() {
			this.model.bind('reset', this.render, this);
		 	this.model.fetch({
		 		reset: true
			});
		},

	render: function(){
		this.$el.empty();
		console.log(this.model.models);
		this.model.each(function(person){
		 	var personView = new App.Views.PersonView ( {model: person} );
		 	this.$el.append(personView.render().el);
		}, this);

		return this;
	}
	});

	// var personCollection = new App.Collections.AllPersonCollection([
	// 	{
	// 		id: 1,
	// 		name: 'Andrey',
	// 		time: 100,
	// 		aux: '20'
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Yura',
	// 		time: 200,
	// 		aux: '40'
	// 	},
	// 	{
	// 		id: 3,
	// 		name: 'Sergey',
	// 		time: 300,
	// 		aux: '60'
	// 	}
	// ]);
	
	// window.collection22 = new App.Collections.AllPersonCollection();
	// window.allPersonView22 = new App.Views.AllPersonView ({model: collection22});
	
	// setInterval(function(){
	// 	collection22.fetch({reset: true});
	// }, 5000);

	// $('#tableone').append(allPersonView22.render().el);

 
}());