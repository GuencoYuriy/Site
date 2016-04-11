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

	App.Models.Person = Backbone.Model.extend ({
		defaults: {
			id: 0,
			fa: '',
			name: '',
			time: 0,
			aux: '',
			color: '',
			time_color: ''
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

	window.TableOne = App;
}());