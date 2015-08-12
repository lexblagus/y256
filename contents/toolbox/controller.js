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
self.y256.controller = {
	methodMapped : function(){
		l.info('y256.controller.methodMapped' , arguments);
	},
	methodTriggedByLibLoad : function(){
		l.info('y256.controller.methodTriggedByLibLoad' , arguments);
	},
	methodManual : function(){
		l.info('y256.controller.methodManual' , arguments);
	}
};
// =============================================================================
y256.controller.methodTriggedByLibLoad(); // if not declared at mappings
// =============================================================================
