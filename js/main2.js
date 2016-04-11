//хэлпер шаблона
var template = function(id) {
	return _.template( $('#' + id).html() );
};

var Person = Backbone.Model.extend ({
	defaults: {
		id: 0,
		name: '',
		time: 0,
		aux: ''
	},
});

var PersonView = Backbone.View.extend ({
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

var AllPersonCollection = Backbone.Collection.extend ({
	model: Person,
	url: 'http://front-desk.ca/mi/callcenter/dashboard2/getagents?date=2016-03-15T7:58:34',
	parse: function(response) {
		// console.log(response);
    	return response.result.list;
    },

	initialize: function() {
		// console.log(this.url);
	}

});

var AllPersonView = Backbone.View.extend ({
	tagName: 'tbody',
	className: 'body-scroll',
	id: 'mainbody',


	initialize: function() {
		this.model.bind('reset', this.render, this);
		
		// this.collection.fetch();


	 	this.model.fetch({
			success: function (collection, response) {
		    	console.log(collection.toJSON());
		  	}
		});



		// this.collection = new AllPersonCollection([
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
		// 	},
		// 	{
		// 		id: 4,
		// 		name: 'Alla',
		// 		time: 400,
		// 		aux: '80'
		// 	},
		// 	{
		// 		id: 5,
		// 		name: 'Petro',
		// 		time: 500,
		// 		aux: 'temp'
		// 	}

		// ]);	
	},

	render: function(){
		console.log(this.model.models);
		// this.model.each(function(person){
		//  	var personView = new PersonView ( {model: person} );
		//  	this.$el.append(personView.render().el);
		// }, this);

		return this;
	}
});


var collection = new AllPersonCollection();
var allPersonView = new AllPersonView ({model: collection});

// $('#tableone').append(allPersonView.render().el);