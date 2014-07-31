/*
Copyright (c) 2014, Geomatics and Cartographic Research Centre, Carleton 
University
All rights reserved.

Redistribution and use in source and binary forms, with or without 
modification, are permitted provided that the following conditions are met:

 - Redistributions of source code must retain the above copyright notice, 
   this list of conditions and the following disclaimer.
 - Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.
 - Neither the name of the Geomatics and Cartographic Research Centre, 
   Carleton University nor the names of its contributors may be used to 
   endorse or promote products derived from this software without specific 
   prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE 
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE 
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE 
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR 
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF 
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS 
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
POSSIBILITY OF SUCH DAMAGE.

*/
;(function($,$n2){

// Localization
var _loc = function(str,args){ return $n2.loc(str,'nunaliit2-couch',args); };

var DH = 'n2.couchDocument';

//*******************************************************
function adjustDocument(doc) {

	// Get user name
	var userName = null;
	var sessionContext = $n2.couch.getSession().getContext();
	if( sessionContext ) {
		userName = sessionContext.name;
	};
	
	// Get now
	var nowTime = (new Date()).getTime();
	
	if( userName ) {
		if( null == doc.nunaliit_created ) {
			doc.nunaliit_created = {
				nunaliit_type: 'actionstamp'
				,name: userName
				,time: nowTime
				,action: 'created'
			};
		};
		
		doc.nunaliit_last_updated = {
			nunaliit_type: 'actionstamp'
			,name: userName
			,time: nowTime
			,action: 'updated'
		};
	};
	
	// Fix dates
	var dates = [];
	$n2.couchUtils.extractSpecificType(doc, 'date', dates);
	for(var i=0,e=dates.length; i<e; ++i){
		var d = dates[i];
		if( d.date ) {
			try {
				var dateInt = $n2.date.parseUserDate(d.date);
				d.min = dateInt.min;
				d.max = dateInt.max;
			} catch(e) {
				if( d.min ) delete d.min;
				if( d.max ) delete d.max;
			};
		};
	};
}

// *******************************************************
var CouchDataSource = $n2.Class($n2.document.DataSource, {
	
	db: null
	
	,designDoc: null
	
	,dispatchService: null
	
	,geometryRepository: null
	
	,initialize: function(opts_){
		var opts = $n2.extend({
				id: null
				,db: null
				,dispatchService: null
			}
			,opts_
		);
		
		$n2.document.DataSource.prototype.initialize.call(this,opts);

		this.db = opts.db;
		this.dispatchService = opts.dispatchService;
		
		this.designDoc = this.db.getDesignDoc({ddName:'atlas'});
		
		this.geometryRepository = new GeometryRepository({
			db: this.db
			,designDoc: this.designDoc
			,dispatchService: this.dispatchService
		});
	}

	,createDocument: function(opts_){
		var opts = $n2.extend({
				doc: {}
				,onSuccess: function(doc){}
				,onError: function(errorMsg){ $n2.reportErrorForced(errorMsg); }
			}
			,opts_
		);
		
		var _this = this;

		var doc = opts.doc;

		adjustDocument(doc);

		this.db.createDocument({
			data: doc
			,onSuccess: function(docInfo){
				doc._id = docInfo.id;
				doc._rev = docInfo.rev;
				doc.__n2Source = this;
				
				_this._dispatch({
					type: 'documentVersion'
					,docId: docInfo.id
					,rev: docInfo.rev
				});
				_this._dispatch({
					type: 'documentCreated'
					,docId: docInfo.id
				});
				
				
				opts.onSuccess(doc);
			}
			,onError: opts.onError
		});
	}

	,getDocument: function(opts_){
		var opts = $n2.extend({
				docId: null
				,rev: null
				,revs_info: false
				,revisions: false
				,conflicts: false
				,deleted_conflicts: false
				,onSuccess: function(doc){}
				,onError: function(errorMsg){}
			}
			,opts_
		);
		
		this.db.getDocument({
			docId: opts.docId
			,rev: opts.rev
			,revs_info: opts.revs_info
			,revisions: opts.revisions
			,conflicts: opts.conflicts
			,deleted_conflicts: opts.deleted_conflicts
			,onSuccess: function(doc){
				doc.__n2Source = this;
				opts.onSuccess(doc);
			}
			,onError: opts.onError
		});
	}

	,getDocumentAttachmentUrl: function(doc, attachmentName){
		return this.db.getAttachmentUrl(doc, attachmentName);
	}

	,verifyDocumentExistence: function(opts_){
		var opts = $n2.extend({
				docIds: null
				,onSuccess: function(info){}
				,onError: function(errorMsg){}
			}
			,opts_
		);
		
		var docIds = opts.docIds;
		
		this.db.getDocumentRevisions({
			docIds: docIds
			,onSuccess: function(info){
				var result = {};
				for(var id in info){
					result[id] = {
						rev: info[id]
					};
				};
				
				opts.onSuccess(result);
			}
			,onError: opts.onError
		});
	}

	,updateDocument: function(opts_){
		var opts = $n2.extend({
				doc: null
				,onSuccess: function(doc){}
				,onError: function(errorMsg){}
			}
			,opts_
		);
		
		var _this = this;

		var doc = opts.doc;

		adjustDocument(doc);

		var copy = {};
		for(var key in doc){
			if( key === '__n2Source' ){
				// Do not copy
			} else {
				copy[key] = doc[key];
			};
		};
		
		this.db.updateDocument({
			data: copy
			,onSuccess: function(docInfo){
				doc._rev = docInfo.rev;

				_this._dispatch({
					type: 'documentVersion'
					,docId: docInfo.id
					,rev: docInfo.rev
				});
				_this._dispatch({
					type: 'documentUpdated'
					,docId: docInfo.id
				});
				
				opts.onSuccess(doc);
			}
			,onError: opts.onError
		});
	}

	,deleteDocument: function(opts_){
		var opts = $n2.extend({
				doc: null
				,onSuccess: function(){}
				,onError: function(errorMsg){ $n2.reportErrorForced(errorMsg); }
			}
			,opts_
		);
		
		var _this = this;

		var doc = opts.doc;
		var copy = {};
		for(var key in doc){
			if( key === '__n2Source' ){
				// Do not copy
			} else {
				copy[key] = doc[key];
			};
		};
		
		this.db.deleteDocument({
			data: copy
			,onSuccess: function(docInfo){
				_this._dispatch({
					type: 'documentDeleted'
					,docId: doc._id
				});
				opts.onSuccess();
			}
			,onError: opts.onError
		});
	}

	,getLayerDefinitions: function(opts_){
		var opts = $n2.extend({
				onSuccess: function(layerDefinitions){}
				,onError: function(errorMsg){}
			}
			,opts_
		);
		
		this.designDoc.queryView({
			viewName: 'layer-definitions'
			,onSuccess: function(rows){
				var layerIdentifiers = [];
				for(var i=0,e=rows.length;i<e;++i){
					if( rows[i].nunaliit_layer_definition ){
						var d = rows[i].nunaliit_layer_definition;
						if( !d.id ){
							d.id = rows[i]._id;
						};
						layerIdentifiers.push(d);
					};
				};
				opts.onSuccess(layerIdentifiers);
			}
			,onError: opts.onError
		});
	}

	,getDocumentInfoFromIds: function(opts_){
		var opts = $n2.extend({
				docIds: null
				,onSuccess: function(docInfos){}
				,onError: function(errorMsg){}
			}
			,opts_
		);
		
		this.designDoc.queryView({
			viewName: 'info'
			,keys: opts.docIds
			,onSuccess: function(rows){
				var infos = [];
				for(var i=0,e=rows.length;i<e;++i){
					infos.push(rows[i].value);
				};
				opts.onSuccess(infos);
			}
			,onError: opts.onError
		});
	}

	,getReferencesFromId: function(opts_){
		var opts = $n2.extend({
				docId: null
				,onSuccess: function(referenceIds){}
				,onError: function(errorMsg){}
			}
			,opts_
		);
		
		this.designDoc.queryView({
			viewName: 'link-references'
			,startkey: opts.docId
			,endkey: opts.docId
			,onSuccess: function(rows){
				var refIdMap = {};
				for(var i=0,e=rows.length;i<e;++i){
					refIdMap[rows[i].id] = true;
				};
				
				var refIds = [];
				for(var refId in refIdMap){
					refIds.push(refId);
				};
				opts.onSuccess(refIds);
			}
			,onError: opts.onError
		});
	}

	,getDocumentsFromGeographicFilter: function(opts_){
		var opts = $n2.extend({
			docIds: null
			,layerId: null
			,bbox: null
			,projectionCode: null
			,onSuccess: function(docs){}
			,onError: function(errorMsg){}
		},opts_);
		
		// Intercept onSuccess to apply __n2Source attribute
		var callerSuccess = opts.onSuccess;
		opts.onSuccess = function(docs){
			for(var i=0,e=docs.length; i<e; ++i){
				docs[i].__n2Source = this;
			};
			callerSuccess(docs);
		};
		
		this.geometryRepository.getDocumentsFromGeographicFilter(opts);
	}

	,getGeographicBoundingBox: function(opts_){
		this.geometryRepository.getGeographicBoundingBox(opts_);
	}

	,getReferencesFromOrigin: function(opts_){
		var opts = $n2.extend({
				docId: null
				,onSuccess: function(originReferenceIds){}
				,onError: function(errorMsg){}
			}
			,opts_
		);
		
		this.designDoc.queryView({
			viewName: 'nunaliit-origin'
			,startkey: opts.docId
			,endkey: opts.docId
			,onSuccess: function(rows){
				var refIdMap = {};
				for(var i=0,e=rows.length;i<e;++i){
					refIdMap[rows[i].id] = true;
				};
				
				var refIds = [];
				for(var refId in refIdMap){
					refIds.push(refId);
				};
				opts.onSuccess(refIds);
			}
			,onError: opts.onError
		});
	},
	
	/*
	 * This needs to be a global unique identifier. It is not a sufficient
	 * guarantee if the identifier is unique within a session. Therefore, it
	 * should be based on the database which can track between sessions.
	 */
	getUniqueIdentifier: function(opts_){
		var opts = $n2.extend({
			onSuccess: function(uuid){}
			,onError: function(errorMsg){}
		},opts_);
		
		var server = this.db.server;
		
		server.getUniqueId(opts);
	}
	
	,_dispatch: function(m){
		if( this.dispatchService ){
			this.dispatchService.send(DH,m);
		};
	}
});

//*******************************************************

var GeometryRepository = $n2.Class({
	
	db: null
	
	,designDoc: null
	
	,dispatchService: null
	
	,dbProjection: null
	
	,poles: null // cache the poles in various projections
	
	,mapProjectionMaxWidth: null // cache max width computation
	
	,initialize: function(opts_){
		var opts = $n2.extend({
			db: null
			,designDoc: null
			,dispatchService: null
		},opts_);
		
		this.db = opts.db;
		this.designDoc = opts.designDoc;
		this.dispatchService = opts.dispatchService;
		
		this.dbProjection = new OpenLayers.Projection('EPSG:4326');
		
		// Set-up caches
		this.poles = {
			n:{}
			,s:{}
		};
		this.mapProjectionMaxWidth = {};
	}
	
	,getDocumentsFromGeographicFilter: function(opts_){
		var opts = $n2.extend({
				docIds: null
				,layerId: null
				,bbox: null
				,projectionCode: null
				,onSuccess: function(docs){}
				,onError: function(errorMsg){}
			}
			,opts_
		);
	
		var _this = this;
		
		var viewQuery = {
			viewName: 'geom'
			,onSuccess: handleDocs
			,onError: opts.onError
		};
		
		// Add BBOX tiling
		var bounds = opts.bbox;
		var fids = opts.docIds;
		var layerName = ('string' === typeof(opts.layerId) ? opts.layerId : null);
		
		if( bounds 
		 && opts.projectionCode 
		 && opts.projectionCode != this.dbProjection.getCode() ){
			var mapProjection = new OpenLayers.Projection(opts.projectionCode);
			
			var mapBounds = new OpenLayers.Bounds(bounds[0],bounds[1],bounds[2],bounds[3]);
			var dbBounds = mapBounds.clone().transform(mapProjection, this.dbProjection);
			
			// Verify if north pole is included
			var np = this._getPole(true, mapProjection);
			if( np 
			 && mapBounds.contains(np.x,np.y) ){
				var northBoundary = new OpenLayers.Bounds(-180, 90, 180, 90);
				dbBounds.extend(northBoundary);
			};
			
			// Verify if south pole is included
			var sp = this._getPole(false, mapProjection);
			if( sp 
			 && mapBounds.contains(sp.x,sp.y) ){
				var southBoundary = new OpenLayers.Bounds(-180, -90, 180, -90);
				dbBounds.extend(southBoundary);
			};
			
			bounds = [dbBounds.left,dbBounds.bottom,dbBounds.right,dbBounds.top];
			
			var maxWidth = this._getMapMaxWidth(mapProjection);
			if( maxWidth 
			 && maxWidth <= (mapBounds.right - mapBounds.left) ){
				// Assume maximum database bounds (do not wrap around)
				bounds[0] = -180;
				bounds[2] = 180;
			};
		};
	
		// Switch view name and add keys for bounds, layer name and feature ids
		$n2.couchGeom.selectTileViewFromBounds(viewQuery, bounds, layerName, fids);
		
		this.designDoc.queryView(viewQuery);
		
		function handleDocs(rows){

	    	var docIds = [];
	    	var docs = [];
	    	while( rows.length > 0 ){
	    		var row = rows.pop();
	    		var docId = row.id;
	    		
	    		if( _this.dispatchService ) {
	    			var m = {
	    				type: 'cacheRetrieveDocument'
	    				,docId: docId
	    				,doc: null
	    			};
	    			_this.dispatchService.synchronousCall(DH, m);
	    			if( m.doc ){
	    				docs.push(m.doc);
	    			} else {
	    				// must request
	    				docIds.push(docId);
	    			};
	    		} else {
	        		docIds.push(docId);
	    		};
	    	};
	    	
	    	if( docIds.length > 0 ) {

	        	_this.db.getDocuments({
	    			docIds: docIds
	    			,onSuccess: function(docs_){
	    				for(var i=0,e=docs_.length; i<e; ++i){
	    					docs.push(docs_[i]);
	    				};
	    				opts.onSuccess(docs);
	    			}
	        		,onError: opts.onError
	        	});
	    	} else {
	    		// nothing to request
	    		opts.onSuccess(docs);
	    	};
		};
	}

	,getGeographicBoundingBox: function(opts_){
		var opts = $n2.extend({
				layerId: null
				,bbox: null
				,onSuccess: function(bbox){}
				,onError: function(errorMsg){}
			}
			,opts_
		);
		
		this.designDoc.queryView({
			viewName: 'geom-layer-bbox'
			,startkey: opts.layerId
			,endkey: opts.layerId
			,onlyRows: true
			,reduce: true
			,onSuccess: function(rows){
				if( rows.length > 0 ) {
					opts.onSuccess(rows[0].value);
				} else {
					opts.onSuccess(null);
				};
			}
			,onError: opts.onError
		});
	}

	,_getPole: function(isNorth, mapProjection){
		
		var projCode = mapProjection.getCode();
		
		var label = isNorth ? 'n' : 's';
		if( this.poles[label][projCode] ) return this.poles[label][projCode];
		
		if( isNorth ){
			var p = new OpenLayers.Geometry.Point(0,90);
		} else {
			var p = new OpenLayers.Geometry.Point(0,-90);
		};
		
		// Catch transform errors
		var error = false;
		var previousFn = null;
		if( typeof(Proj4js) !== 'undefined' ){
			previousFn = Proj4js.reportError;
			Proj4js.reportError = function(m){
				error = true;
			};
		};
		
		p.transform(this.dbProjection,mapProjection);
		
		if( error ){
			p = null;
		};
		
		// Re-instate normal error reporting
		if( previousFn ){
			Proj4js.reportError = previousFn;
		};
		
		this.poles[label][projCode] = p;
		
		return p;
	}
	
    ,_getMapMaxWidth: function(proj){
		
		var projCode = proj.getCode();
    	
    	if( this.mapProjectionMaxWidth[projCode] ){
    		return this.mapProjectionMaxWidth[projCode];
    	};
    	
    	if( proj
    	 && proj.proj 
    	 && proj.proj.projName === 'merc' ){
        	var w = new OpenLayers.Geometry.Point(-180,0);
       		var e = new OpenLayers.Geometry.Point(180,0);

       		// Catch transform errors
        	var error = false;
        	var previousFn = null;
        	if( typeof(Proj4js) !== 'undefined' ){
        		previousFn = Proj4js.reportError;
        		Proj4js.reportError = function(m){
        			error = true;
        		};
        	};
        	
        	w.transform(this.dbProjection,proj);
        	e.transform(this.dbProjection,proj);
        	
        	if( error ){
        		w = null;
        		e = null;
        	};

        	// Re-instate normal error reporting
        	if( previousFn ){
        		Proj4js.reportError = previousFn;
        	};
        	
        	if( e && w ){
        		this.mapProjectionMaxWidth[projCode] = w.x - e.x;
        	};
    	};
    	
    	return this.mapProjectionMaxWidth[projCode];
    }
});

//*******************************************************
var CouchDataSourceWithSubmissionDb = $n2.Class(CouchDataSource, {
	
	submissionDb: null
	
	,submissionServerUrl: null
	
	,submissionServerDb: null
	
	,isSubmissionDataSource: null
	
	,initialize: function(opts_){
		var opts = $n2.extend({
			submissionDb: null
			,submissionServletUrl: null
		},opts_);
		
		CouchDataSource.prototype.initialize.call(this,opts);

		var _this = this;
		
		this.isSubmissionDataSource = true;
		
		this.submissionDb = opts.submissionDb;
		this.submissionServerUrl = opts.submissionServerUrl;
		
		var submissionServer = $n2.couch.getServer({
			pathToServer: this.submissionServerUrl
			,skipSessionInitialization: true
			,userDbName: '_users'
			,onSuccess: function(server){
				_this.submissionServerDb = server.getDb({
					dbName: 'submissionDb'
				});
			}
			,onError: function(err){
				$n2.log("Unable to initialize submission server",err);
				alert( _loc('Unable to initialize submission database') );
			}
		});
		
	},
	
	/*
	 * When creating a document, send a submission request
	 */
	createDocument: function(opts_){
		var opts = $n2.extend({
				doc: {}
				,onSuccess: function(doc){}
				,onError: function(errorMsg){ $n2.reportErrorForced(errorMsg); }
			}
			,opts_
		);
		
		var _this = this;
		
		if( !opts.doc ){
			opts.onError('Document must be provided');
		};

		// Compute document id
		if( opts.doc._id ){
			onUuidComputed(opts.doc._id);
		} else {
			var server = this.db.server;
			if( server ){
				server.getUniqueId({
					onSuccess: onUuidComputed
					,onError: opts.onError
				});
			};
		};
		
		function onUuidComputed(docId){
			// create a submission request
			var doc = opts.doc;
			doc._id = docId;
			
			adjustDocument(doc);

			_this.submissionServerDb.createDocument({
				data: doc
				,onSuccess: function(docInfo){
					_this._warnUser();
					doc.__n2Source = this;
					opts.onSuccess(doc);
				}
				,onError: opts.onError
			});
		};
	},

	/*
	 * When updating a document, make a submission request
	 */
	updateDocument: function(opts_){
		var opts = $n2.extend({
				doc: null
				,onSuccess: function(doc){}
				,onError: function(errorMsg){}
			}
			,opts_
		);
		
		var _this = this;
		
		var doc = opts.doc;
		
		adjustDocument(doc);
		
		var copy = {};
		for(var key in doc){
			if( key === '__n2Source' ){
				// Do not copy
			} else {
				copy[key] = doc[key];
			};
		};
		
		this.submissionServerDb.updateDocument({
			data: copy
			,onSuccess: function(docInfo){
				_this._warnUser();
				opts.onSuccess(doc);
			}
			,onError: opts.onError
		});
	},

	/*
	 * When deleting a document, make a submission request
	 */
	deleteDocument: function(opts_){
		var opts = $n2.extend({
				doc: null
				,onSuccess: function(){}
				,onError: function(errorMsg){ $n2.reportErrorForced(errorMsg); }
			}
			,opts_
		);
		
		var _this = this;
		
		var doc = opts.doc;
		
		this.submissionServerDb.deleteDocument({
			data: doc
			,onSuccess: function(docInfo){
				_this._warnUser();
				opts.onSuccess(doc);
			}
			,onError: opts.onError
		});
	}
	
	,_warnUser: function(){
		var shouldWarnUser = true;
		var c = $n2.cookie.getCookie('nunaliit_submissions');
		if( c ){
			shouldWarnUser = false;
		};
		
		if( shouldWarnUser ){
			var diagId = $n2.getUniqueId();
			var $diag = $('<div>')
				.attr('id',diagId)
				.addClass('n2_submission_warning_dialog');

			var $text = $('<div>')
				.addClass('n2_submission_warning_text')
				.appendTo($diag);
			
			$('<span>')
				.text( _loc('Submissions to the database will not appear until they are approved') )
				.appendTo($diag);
			
			var $mem = $('<div>')
				.addClass('n2_submission_warning_memory')
				.appendTo($diag);
			
			
			var cbId = $n2.getUniqueId();
			$('<input type="checkbox">')
				.attr('id', cbId)
				.appendTo($mem);

			$('<label>')
				.attr('for', cbId)
				.text( _loc('Do not show this warning again') )
				.appendTo($mem);
			
			var $buttons = $('<div>')
				.addClass('n2_submission_warning_buttons')
				.appendTo($diag);
			
			$('<button>')
				.addClass('n2_button_ok')
				.appendTo($buttons)
				.text( _loc('OK') )
				.click(function(){
					var $diag = $('#'+diagId);
					$diag.dialog('close');
				});
			
			$diag.dialog({
				autoOpen: true
				,title: _loc('Warning on Database Submissions')
				,modal: true
				,width: 'auto'
				,close: function(event, ui){
					var $diag = $('#'+diagId);
					
					var $cb = $diag.find('input[type=checkbox]');
					var disable = false;
					if( $cb.length > 0 ){
						disable = $cb.is(':checked')
					};
					
					$diag.remove();
					
					if( disable ){
						$n2.cookie.setCookie({
							name: 'nunaliit_submissions'
							,value: 'do not warn'
							,end: (60 * 60 * 24 * 365) // max-age in seconds
							,path: '/'
						});
					};
				}
			});
		};
	}
});

//*******************************************************
$n2.couchDocument = {
	CouchDataSource: CouchDataSource
	,CouchDataSourceWithSubmissionDb: CouchDataSourceWithSubmissionDb
	,adjustDocument: adjustDocument
};

})(jQuery,nunaliit2);