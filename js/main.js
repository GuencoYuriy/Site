(function() {
	window.App = {
		Models: {},
		Views: {},
		Collections: {}
	};
 
	//хэлпер шаблона
	window.template = function(id) {
		return _.template( $('#' + id).html() );
	};

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
		model: App.Models.Person
	});

	App.Views.AllPersonView = Backbone.View.extend ({
		tagName: 'tbody',
		className: 'body-scroll',
		id: 'mainbody',

		initialize: function() {
			// console.log(this.collection);	
		},

		render: function(){
			this.collection.each(function(person){
				var personView = new App.Views.PersonView ( {model: person} );
				this.$el.append(personView.render().el);
			}, this);

			return this;
		}
	});

	var personCollection = new App.Collections.AllPersonCollection([
		{
			id: 1,
			name: 'Andrey',
			time: 100,
			aux: '20'
		},
		{
			id: 2,
			name: 'Yura',
			time: 200,
			aux: '40'
		},
		{
			id: 3,
			name: 'Sergey',
			time: 300,
			aux: '60'
		}
	]);

	var allPersonView = new App.Views.AllPersonView ({collection: personCollection});

 
	$('#tableone').append(allPersonView.render().el);
 
}());