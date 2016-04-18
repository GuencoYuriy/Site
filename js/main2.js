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
	

	initialize: function () {  
        // this.model.on('change', this.render, this);
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
	
	initialize: function() {
		this.model.bind('reset', this.render, this);

	 	this.model.fetch({
	 		reset: true
		});
	},

	render: function(){
		this.$el.empty();
		this.model.each(function(person){
		 	var personView = new PersonView ( {model: person} );
		 	this.$el.append(personView.render().el);
		}, this);

		return this;
	}
});


var collection = new AllPersonCollection({});
var allPersonView = new AllPersonView ({model: collection, tagName: 'tbody',
	className: 'body-scroll',
	id: 'mainbody'});

setInterval(function(){
    collection.fetch({reset: true});
}, 5000);

$('#tableone').append(allPersonView.render().el);