//initialize express
exports.version= '1.0';
exports.configure= function(app, express, staticDirectory) {
		app.configure(function() {
		    app.use(express.static(staticDirectory)); 
		    console.log('Static content will be served from directory<'+staticDirectory+'>');
		    
		    
		    //middlewares ==========================================
		    //The order of which middleware are "defined" using app.use() is very important, they are invoked sequentially, thus this defines middleware precedence. For example usually express.logger() is the very first middleware you would use, logging every request:
		    
		    
		    app.use(express.logger('dev')); // log every request to the console
		    console.log('express.logger loaded');
		    
		    //app.use(express.bodyParser()); // have the ability to pull information from html in POST
		    //app.use(express.methodOverride()); // have the ability to simulate DELETE and PUT
		    });
	};