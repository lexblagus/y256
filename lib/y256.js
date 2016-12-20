'use strict';
/*
┌─────────┐
│         │
│         │
│         │
│         │
│     x128│ / tecnologia&design
└─────────┘ / www.x128.com.br
            // Possibilidades empolgantes, resultados admiráveis
*/

// =============================================================================
self.y256 = { // y256 is the x128 front end framework
	// ————————————————————————————————————————————————————————————————————————————————
	options : {
		production       : 'blag.us',   // production website (disable certain features, like debug log)
		//production       : 'blagus.quirks',         // <!> disable dev console
		ajaxTimeout      : 5*1000,              // as it says
		fadeTime         : 1,                 // animation
		fadeOpacity      : 0,                // animation opacity: 0 to 1 (use decimals)
		container        : 'main',
		api : {
			"dataset" : "contents/dataset.json"
		}
	},
	// ————————————————————————————————————————————————————————————————————————————————
	mappings : [ // remember: order is important!
		/* — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
		Home
		— — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — */
		{
			"hash"       : ["" , "/" , "/home"],
			"view"       : "contents/home.strip.html",
			"controller" : "contents/home.js",
			"method"     : "y256.home.init"
		},
		/* — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
		Pages
		— — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — */
		{
			"hash"       : ["/contact"],
			"view"       : "contents/contact.strip.html"
		},
		{
			"hash"       : ["/about"],
			"view"       : "contents/about.strip.html"
		},
		/* — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
		Toolbox
		— — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — */
		{
			"hash"       : ["/toolbox"],
			"view"       : "contents/toolbox/index.strip.html"
		},
		{
			"hash"       : ["/toolbox/colors"],
			"view"       : "contents/toolbox/colors.strip.html"
		},
		{
			"hash"       : ["/toolbox/html"],
			"view"       : "contents/toolbox/elements.strip.html"
		},
		/* — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
		Development tests
		— — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — */
		{
			"comment"    : "Mapping only",
			"hash"       : ["mapping-only" , "/mapping-only"],
		},
		{
			"comment"    : "View only",
			"hash"       : ["view-only" , "/view-only"],
			"view"       : "contents/toolbox/view.strip.html"
		},
		{
			"comment"    : "View and controller",
			"hash"       : ["/view-controller" , "view-controller"],
			"view"       : "contents/toolbox/view.strip.html",
			"controller" : "contents/toolbox/controller.js"
		},
		{
			"comment"    : "View, controller and methodMapped",
			"hash"       : ["view-controller-method" , "/view-controller-method"],
			"view"       : "contents/toolbox/view.strip.html",
			"controller" : "contents/toolbox/controller.js",
			"method"     : "y256.controller.methodMapped"
		},
		{
			"comment"    : "Just controller",
			"hash"       : ["controller-only" , "/controller-only"],
			"controller" : "contents/toolbox/controller.js"
		},
		{
			"comment"    : "Controller and method",
			"hash"       : ["controller-method" , "/controller-method"],
			"controller" : "contents/toolbox/controller.js",
			"method"     : "y256.controller.methodMapped"
		}
	],
	// ————————————————————————————————————————————————————————————————————————————————
	core:{
		// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
		init : function(){
			l.info('y256.core.init' , arguments);
			
			//l.log('Range selection on checkboxes');
			//y256.utils.checkboxRangeGroup();
			
			l.log('Setup jQuery AJAX');
			$.ajaxSetup(
				{
					beforeSend : y256.core.ajaxBeforeSend,
					success    : y256.core.ajaxSuccess,
					error      : y256.core.ajaxError,
					complete   : y256.core.ajaxComplete,
					timeout    : y256.options.ajaxTimeout,
					cache      : false,
					async      : true,
					statusCode : {
						/* 404:function(){ alert('page not found'); } */
					}
				}
			);
			
			l.log('Booting…');
			y256.core.hashChange();
		},
		// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
		hashChange : function(){
			l.info('y256.core.hashChange' , arguments);
			
			var mapped = {
				"mapping" : false,
				"view" : false,
				"controller" : false,
				"params" : false,
				"callURI" : false
			};

			var locationHash = location.hash.replace(/^\#/,'');
			l.log('locationHash', locationHash);

			// look into mappings
			for(var map in y256.mappings){
				//l.log('	y256.mappings['+map+']', y256.mappings[map]);
				for(var hash in y256.mappings[map].hash){
					//l.log('		y256.mappings['+map+'].hash['+hash+']' , y256.mappings[map].hash[hash]);
					var thisHash = y256.mappings[map].hash[hash];
					//l.log('		thisHash', thisHash);
					if(  locationHash.search( thisHash )==0  ){
						//l.log('			Found map');
						//l.log('			y256.mappings[map].hash[hash]', y256.mappings[map].hash[hash]);
						mapped.mapping    = y256.mappings[map];
						mapped.view       = y256.mappings[map].view;
						mapped.controller = y256.mappings[map].controller;
						mapped.method     = y256.mappings[map].method;
						mapped.params     = locationHash.replace( y256.mappings[map].hash[hash] , '' ).replace(/^\//,'').replace(/\/$/,'').split('/');
						mapped.container  = y256.mappings[map].container;
						//...
					}else{
						//l.log('			Not found in this map');
					}
				}
			}
			l.log('mapped', mapped);
			l.log("JSON.stringify(mapped,null,'	')", JSON.stringify(mapped,null,'	'));
			
			if( mapped.view ){
				l.log('Load view');
				y256.core.pageLoad(
					mapped.view , 
					mapped.container || y256.options.container, 
					function(){
						if(this.controller){
							y256.core.loadScript( this.controller , this.method , this.params );
						}else{
							l.log('No controller for this map');
						}
					}.bind(
						{
							controller:mapped.controller,
							method:mapped.method,
							params:mapped.params
						}
					)
				);
			}else if(mapped.controller){
				l.log('There is no view, but there is a controller');
				y256.core.loadScript( mapped.controller , mapped.method, mapped.params );
			}else{
				l.error('Panic! No view and no controller!');
			}
		},
		// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
		loadScript : function(uri , strMethod , arrParams){
			l.info('y256.core.loadScript' , arguments);
			$.getScript(
				uri, 
				function(){
					if( this.strMethod ){
						eval(this.strMethod+'.apply(null,this.arrParams)'); // yeah, I hate using eval, but no other opton so far.
					}else{
						l.warn('No method defined');
					}
				}.bind(
					{
						strMethod : strMethod,
						arrParams : arrParams
					}
				)
			);
		},
		// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
		pageLoad : function(addr , container , callback){
			l.info('y256.core.pageLoad' , arguments);
			
			if(!callback){ callback=function(){}; }

			$(container).fadeTo(
				y256.options.fadeTime,
				y256.options.fadeOpacity,
				function(){
					l.info('y256.core.pageLoad (fadeTo)' , arguments);
					$(this.container).load(
						this.addr,
						function(response, status, jqXHR){
							l.info('y256.core.pageLoad (fadeTo complete)' , arguments);
							this.callback.call(),
							y256.core.pageLoadComplete(response, status, jqXHR, container);
						}.bind(
							{
								"container" : container,
								"addr" : addr,
								"callback" : callback,
							}
						)
					);
				}.bind(
					{
						"container" : container,
						"addr" : addr,
						"callback" : callback,
					}
				)
			);
		},
		// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
		pageLoadComplete : function(response, status, jqXHR, container){
			l.info('y256.core.pageLoadComplete' , arguments);
			l.log('status=',status);
			
			if(status == 'success'){
				l.log('Page load complete.');
				// down your loading flag here
				l.log('container=',container);
				$( container || y256.options.container ).fadeTo( y256.options.fadeTime, 1 );

				y256.core.proccessDataLoad( container || y256.options.container );
			}else if ( status == "error" ) {
				l.error('jQuery callback status argument error');
				//... now what!?
			}
		},
		// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
		proccessDataLoad : function( container ){
			l.info('y256.core.proccessDataLoad' , arguments);

			if(container){
				var loads = $(container).find('[data-y256-load]');
				loads.each(
					function(idx, el){
						l.info('y256.core.proccessDataLoad (each element for load)' , arguments);
						y256.core.pageLoad(
							$(el).attr('data-y256-load'),
							$(el)
						);
					}
				);
				loads.each(
					function(idx, el){
						l.info('y256.core.proccessDataLoad (each element fo attribute change)' , arguments);
						$(el).attr('data-y256-loaded',$(el).attr('data-y256-load'));
						$(el).removeAttr('data-y256-load');
					}
				);
			}
		},
		// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
		ajaxBeforeSend : function(jqXHR, settings ){
			l.info('y256.core.ajaxBeforeSend' , arguments);
			// nothing else matters
		},
		// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
		ajaxSuccess : function(data, textStatus, jqXHR){
			l.info('y256.core.ajaxSuccess' , arguments);
			// nothing else matters
		},
		// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
		ajaxError : function(jqXHR, textStatus, errorThrown){
			l.info('y256.core.ajaxError');
			l.error('errorThrown',errorThrown);
			//... now what!?
		},
		// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
		ajaxComplete : function(jqXHR, textStatus){
			l.info('y256.core.ajaxComplete' , arguments);
		},
		// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
	},
	// ————————————————————————————————————————————————————————————————————————————————
	utils : {
		// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
		scrollTo : function( $scrollToIt ){
			l.info('y256.utils.scrollTo', arguments);
		
			$('html, body').animate(
				{ scrollTop : $scrollToIt.offset().top }, 
				1
			);
		},
		// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
		clone : function(template , idSuffix, dir, ref){
			//l.info('y256.utils.clone' , arguments);
			var newItem = $(template).clone();
			
			if(!idSuffix){ idSuffix=y256.utils.rnd(); }
			
			newItem.attr('id', (newItem.attr('id')||'') + idSuffix);
			$(newItem).find('[id]').each(
				function(idx , el){
					//l.info(idx , el);
					$(el).attr('id',$(el).attr('id') + this.idSuffix);
				}.bind({"idSuffix":idSuffix})
			);
			$(newItem).find('[for]').each(
				function(idx , el){
					//l.info(idx , el);
					$(el).attr('for',$(el).attr('for') + this.idSuffix);
				}.bind({"idSuffix":idSuffix})
			);
			$(newItem).find('[name]').each(
				function(idx , el){
					//l.info(idx , el);
					$(el).attr('name',$(el).attr('name') + this.idSuffix);
				}.bind({"idSuffix":idSuffix})
			);
			//l.log('newItem', newItem);
			if(dir=='after'){
				//l.log('Place after');
				if(ref){
					//l.log('ref', ref);
					$(ref).after(newItem);
				}else{
					//l.log('template');
					$($(template)).after(newItem);
				}
			}else{
				//l.log('Place before');
				if(ref){
					//l.log('ref', ref);
					$(ref).before(newItem);
				}else{
					//l.log('template');
					$($(template)).before(newItem);
				}
			}
			return newItem;
		},
		// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
		escapeHTML : function( HTMLunescaped ){
			return
				$(
					document.createElement('span')
				).text(HTMLunescaped).html()
			;
		},
		// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
		rnd : function(len , kind){
			l.info('y256.utils.rnd' , arguments);
			var len = len || 8; // default string length size
			var kind = kind || 'string'; // default random type
			l.log('len', len);
			l.log('kind', kind);
			if(kind=='string'){
				var o = '';
				while(o.length <= len){
					l.log('o', o);
					o+=Math.random().toString(36).substring(2);
				}
				l.log('o.substr(0,len)', o.substr(0,len));
				return o.substr(0,len);
			}else if(kind=='int'){
				var o = '';
				while(o.length <= len){
					l.log('o', o);
					o+=Math.floor((Math.random()*9)+0).toString();
				}
				l.log('o*', o);
				return o;
			}
		},
		// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
		rndNum : function(min , max){
			//l.info('y256.utils.rndNum' , arguments);
			return Math.random() * (max - min) + min;
		},
		// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
		shuffleArray : function(array) {
			l.info('y256.utils.shuffleArray' , arguments);
			// Fisher–Yates shuffle picked from http://bost.ocks.org/mike/shuffle/
			var m = array.length, t, i;
			// While there remain elements to shuffle…
			while (m) {
				// Pick a remaining element…
				i = Math.floor(Math.random() * m--);
				// And swap it with the current element.
				t = array[m];
				array[m] = array[i];
				array[i] = t;
			}
			return array;
		},
		// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
		merge : function(){
			l.info('y256.utils.merge' , arguments);
			var merge = y256.utils.merge;
			var ret = {};
			var len = arguments.length;
			for (var i=0; i<len; i++) {
				//l.log('arguments['+i+']');
				//l.log(j(arguments[i]));
				for (var p in arguments[i]) {
					//l.log('p', p);
					if (arguments[i].hasOwnProperty(p)) {
						if(
							type(arguments[i][p])=='object' &&
							ret.hasOwnProperty(p)
						){
							//l.log('MERGE HERE');
							ret[p] = merge(ret[p] , arguments[i][p]);
						}else{
							ret[p] = arguments[i][p];
						}
					}
				}
			}
			return ret;
		},
		// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
		ArrayUnique : function(a) {
			l.info('y256.utils.ArrayUnique' , arguments);
			return a.sort().filter(
				function(item, pos) {
					return !pos || item != a[pos - 1];
				}
			)
		},
		// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
		arrayIntersect : function(arrA,arrB) {
			l.info('y256.utils.arrayIntersect' , arguments);
			// l.log( type(arrA) );
			if(
				type(arrA)=='array' && type(arrB)=='array'
			){
				for(var i in arrA){
					// l.log('arrA['+i+']',arrA[i]);
					if( arrB.indexOf(arrA[i]) > -1 ){
						l.log('Intersects');
						return true;
					}
				}
				l.log('Does not intersect');
				return false;
			}else{
				l.log('Wrong input arguments');
				return null;
			}
		},
		// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
		removeMatchingInArray : function(inArr, regex) {
			l.info('y256.utils.removeMatchingInArray' , arguments);
			var arr = inArr.slice(); // this clones the original array, so splic won't change it
			var j = 0;
			while (j < arr.length) {
				if (regex.test(arr[j]))
					arr.splice(j, 1);
				else
					j++;
			}
			return arr;
		},
		// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
		checkboxRangeGroup : function(){
			l.info('y256.utils.checkboxRangeGroup' , arguments);
			$('body').on(
				'change',
				':checkbox[data-range-group]',
				function(eventObject){
					console.info('Closure to change range group');
					//console.log('this', this);
					var $this = $(this);
					//console.log('$this', $this);
					//console.log("$this.prop('checked')", $this.prop('checked'));
					//console.log("$(this).data('rangeGroupLastSelected')",$(this).data('rangeGroupLastSelected'));
					var $thisGroup = $(':checkbox[data-range-group="'+$this.data('rangeGroup')+'"]');
					//console.log('$thisGroup',$thisGroup);
					var thisIdx = $thisGroup.index($this);
					//console.log('thisIdx',thisIdx);
					var $lastSelection = $thisGroup.filter('[data-range-group-last-selection="true"]');
					//console.log('$lastSelection', $lastSelection);
					var lastSelectionIdx = $thisGroup.index($lastSelection);
					//console.log('lastSelectionIdx',lastSelectionIdx );
					$thisGroup.each(
						function(idx,el){
							//console.info('Closure on each checkbox')
							if(lastSelectionIdx>-1){
								//console.log('Range selection');
								if(
									idx >= Math.min(thisIdx, lastSelectionIdx) &&
									idx <= Math.max(thisIdx, lastSelectionIdx)
								){
									//console.log('Inside range');
									$(el).prop('checked',true);
								}else{
									//console.log('Out of range');
									$(el).prop('checked',false);
								}
							}else{
								//console.log('No previous selection');
							}
							$currLabel = $(el).attr('id') ? $('label[for="'+$(el).attr('id')+'"]') : null;
							$($currLabel).attr('data-range-group-last-selection',false);
						}
					);
					$thisGroup.attr('data-range-group-last-selection',false);
					$this.attr('data-range-group-last-selection',true);
					$thisLabel = $this.attr('id') ? $('label[for="'+$this.attr('id')+'"]') : null;
					//console.log('$thisLabel', $thisLabel);
					$thisLabel.attr('data-range-group-last-selection',true);
				}
			);
		},
		// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
		disableConsole : function(){
			self.l = {
				info:function(){},
				log:function(){},
				warn:function(){},
				error:function(){},
				clear:function(){},
			};
		},
		enableConsole : function(force){
			if( force || location.hostname!=y256.options.production ){
				try {
					self.l = console;
				}catch(e){
					y256.utils.disableConsole();
				}
			}
		},
		// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — 
	},
	// ————————————————————————————————————————————————————————————————————————————————
};
// =============================================================================
// setup debug log
( 
	function(){
		if( location.hostname==y256.options.production ){
			y256.utils.disableConsole();
		}else{
			y256.utils.enableConsole();
		}
	}
)();
// ————————————————————————————————————————————————————————————————————————————————
// a better javascript typeOf
var type = (function(global) {
	var cache = {};
	return function(obj) {
		var key;
		return obj === null ? 'null' // null
			: obj === global ? 'global' // window in browser or global in nodejs
			: (key = typeof obj) !== 'object' ? key // basic: string, boolean, number, undefined, function
			: obj.nodeType ? 'object' // DOM element
			: cache[key = ({}).toString.call(obj)] // cached. date, regexp, error, object, array, math
			|| (cache[key] = key.slice(8, -1).toLowerCase()); // get XXXX from [object XXXX], and cache it
	 };
}(this));
// =============================================================================
// boot
$(document).ready(  y256.core.init  );
$(window).on('hashchange' , y256.core.hashChange);
// =============================================================================