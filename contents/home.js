'use strict';
/*
┌──────┐
│      │
│      │
│  x128│ / consultores de tecnologia&design
└──────┘ / www.x128.com.br
         / contato@x128.com.br
*/

// =============================================================================
self.y256.home = {
	// ————————————————————————————————————————————————————————————————————————————————
	init : function(){
		l.info('y256.home.init' , arguments);
		if( !y256.model || !y256.model.dataset ){
			$.ajax(
				{
					'url': y256.options.api.dataset,
					'dataType': "json",
					'success': y256.home.loadedDataset
				}
			);
		}
	},
	// ————————————————————————————————————————————————————————————————————————————————
	loadedDataset : function(response, status, jqXHR){
		l.info('y256.home.loadedDataset' , arguments);
		//l.log("JSON.stringify(response,null,'	')", JSON.stringify(response,null,'	'));
		if( !y256.model ){ y256.model={}; }
		y256.model.dataset = response;
		//...
	},
	// ————————————————————————————————————————————————————————————————————————————————
};
// =============================================================================
