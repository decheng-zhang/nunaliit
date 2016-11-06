/*
Copyright (c) 2016, Geomatics and Cartographic Research Centre, Carleton 
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
"use strict";

// Localization
var _loc = function(str,args){ return $n2.loc(str,'nunaliit2-couch',args); }
,DH = 'n2.couch.indexDb'
;

// =============================================
// Design Document
// =============================================

var DesignDoc = $n2.Class({

	couchDesignDoc: null,
	
	db: null,
	
	initialize: function(opts_) {
		var opts = $n2.extend({
			couchDesignDoc: null
			,db: null
		},opts_);
		
		this.couchDesignDoc = opts.couchDesignDoc;
		this.db = opts.db;
	},
	
	getQueryUrl: function(opts_){
		return this.couchDesignDoc.getQueryUrl(opts_);
	},

	queryView: function(opts_) {
		var opts = $n2.extend({},opts_);
		
		var _this = this;
		
		// Figure out if documents were requested
		var include_docs = false;
		if( opts.include_docs ){
			include_docs = true;
			opts.include_docs = false;
		};
		
		// Intercept success
		var onSuccess = opts.onSuccess;
		opts.onSuccess = queryResult;
		
		this.couchDesignDoc.queryView(opts);
		
		function queryResult(results){
			if( opts.reduce ){
				// Reducing. No documents return
				onSuccess(results);
				
			} else if( include_docs ){
				// Need to fetch documents
				var docIds = [];
				var rowsByDocId = {};
				results.forEach(function(row){
					var docId = row.id;
					
					var rows = rowsByDocId[docId];
					if( !rows ){
						rows = [];
						rowsByDocId[docId] = rows;
						docIds.push(docId);
					};

					rows.push(row);
				});

				_this.db.getDocuments({
					docIds: docIds
					,onSuccess: function(docs){
						docs.forEach(function(doc){
							var docId = doc._id;
							var rows = rowsByDocId[docId];
							if( rows ){
								rows.forEach(function(row){
									row.doc = doc;
								});
							};
						});
						
						onSuccess(results);
					}
					,onError: function(cause){
						var err = $n2.error.fromString('Error obtaining documents returned by query',cause);
						opts.onError(err);
					}
				});
				
			} else {
				// Just return
				onSuccess(results);
			};
		};
	}
});

// =============================================
// Database
// =============================================

var Database = $n2.Class({
	
	wrappedDb: null,
	
	documentCache: null,
	
	dbChangeNotifier: null,
	
	dispatchService: null,
	
	remoteDocumentCountLimit: null,
	
	id: null,
	
	outstandingDocumentCount: null,
	
	outstandingStoreCount: null,
	
	initialize: function(opts_) {
		var opts = $n2.extend({
			couchDb: null
			,documentCache: null
			,dispatchService: null
			,remoteDocumentCountLimit: null
		},opts_);
		
		var _this = this;
	
		this.wrappedDb = opts.couchDb;
		this.documentCache = opts.documentCache;
		this.dispatchService = opts.dispatchService;
		this.remoteDocumentCountLimit = opts.remoteDocumentCountLimit;
		
		this.id = $n2.getUniqueId();
		this.outstandingDocumentCount = 0;
		this.outstandingStoreCount = 0;
		
		this.getChangeNotifier({
			onSuccess: function(notifier){
				_this.dbChangeNotifier = notifier;
				if( _this.dbChangeNotifier ){
					_this.dbChangeNotifier.addListener(function(changes){
						_this._dbChanges(changes);
					});
				};
			}
		});

	},

	getUrl: function(){
		return this.wrappedDb.getUrl();
	},
	
	getDesignDoc: function(opts_) {
		var couchDesignDoc = this.wrappedDb.getDesignDoc(opts_);

		var designDoc = new DesignDoc({
			couchDesignDoc: couchDesignDoc
			,db: this
		});

		return designDoc;
	},
	
	getChangeNotifier: function(opts_) {
		return this.wrappedDb.getChangeNotifier(opts_);
	},
	
	getChanges: function(opts_) {
		this.wrappedDb.getChanges(opts_);
	},

	getDocumentUrl: function(doc) {
		return this.wrappedDb.getDocumentUrl(doc);
	},

	getAttachmentUrl: function(doc,attName) {
		return this.wrappedDb.getAttachmentUrl(doc,attName);
	},
	
	getDocumentRevision: function(opts_) {
		this.wrappedDb.getDocumentRevision(opts_);
	},
	
	getDocumentRevisions: function(opts_) {
		this.wrappedDb.getDocumentRevisions(opts_);
	},
	
	buildUploadFileForm: function(jQuerySet, options_) {
		this.wrappedDb.buildUploadFileForm(jQuerySet, options_);
	},
	
	createDocument: function(opts_) {
		this.wrappedDb.createDocument(opts_);
	},
	
	updateDocument: function(opts_) {
		this.wrappedDb.updateDocument(opts_);
	},
	
	deleteDocument: function(opts_) {
		this.wrappedDb.deleteDocument(opts_);
	},
	
	bulkDocuments: function(documents, options_) {
		this.wrappedDb.bulkDocuments(documents, options_);
	},
	
	getDocument: function(opts_) {
		var opts = $n2.extend({},opts_,{
			onSuccess: storeDocument
		});
		
		var _this = this;
		
		// Is this document in cache?
		this.documentCache.getDocument({
			docId: opts_.docId
			,onSuccess: checkVersion
			,onError: performNative
		});
		
		function checkVersion(doc){
			if( !doc ) {
				performNative();
			} else {
				_this.wrappedDb.getDocumentRevision({
					docId: opts_.docId
					,onSuccess: function(rev){
						if( rev === doc._rev ){
							opts_.onSuccess(doc);
						} else {
							performNative();
						};
					}
					,onError: performNative
				});
			};
		};
		
		function performNative(){
			// Get document from CouchDb
			_this.wrappedDb.getDocument(opts);
		};
		
		function storeDocument(doc){
			_this.documentCache.updateDocument({
				doc: doc
				,onSuccess: function(){
					opts_.onSuccess(doc);
				}
				,onError: function(err){
					opts_.onSuccess(doc);
				}
			});
		};
	},

	getDocuments: function(opts_) {
		var _this = this;
		var docIdMap = {};
		var docsToReturn = [];
		var docsToStore = [];
		var docIdsToFetchRemotely = [];
		
		var count = 0;
		opts_.docIds.forEach(function(docId){
			if( docIdMap[docId] ){
				// Already requesed
			} else {
				docIdMap[docId] = true;
				++count;
			};
		});

		this._updateOutstandingDocumentCount(count);
		
		// Are the requested documents in cache?
		this.documentCache.getDocuments({
			docIds: opts_.docIds
			,onSuccess: documentsFromCache
			,onError: performNative
		});

		function documentsFromCache(cachedDocs){
			if( cachedDocs && cachedDocs.length > 0 ){
				// Get versions for these documents
				var versionDocIds = [];
				cachedDocs.forEach(function(cachedDoc){
					versionDocIds.push(cachedDoc._id);
				});

				_this.getDocumentRevisions({
					docIds: versionDocIds
					,onSuccess: function(revisionByIdMap){
						cachedDocs.forEach(function(cachedDoc){
							var cachedDocId = cachedDoc._id;
							var cachedDocRev = cachedDoc._rev;
							if( revisionByIdMap[cachedDocId] === cachedDocRev ){
								docIdMap[cachedDocId] = cachedDoc;
								docsToReturn.push(cachedDoc);
							};
						});
						
						performNative();
					}
					,onError: performNative
				});
				
			} else {
				// Nothing in cache. Get from native db
				performNative();
			};
		};
		
		function performNative(){
			// Figure out which docIds to fetch
			for(var docIdToFetch in docIdMap){
				if( docIdMap[docIdToFetch] === true ){
					docIdsToFetchRemotely.push(docIdToFetch);
				};
			};

			// Discount the number of documents received from the cache
			var delta = docIdsToFetchRemotely.length - count;
			_this._updateOutstandingDocumentCount(delta);
			count = docIdsToFetchRemotely.length;
			
			performRemoteRequest();
			
//			if( docIdsToFetchRemotely.length > 0 ){
//				var delta = docIdsToFetchRemotely.length - count;
//				_this._updateOutstandingDocumentCount(delta);
//				count = docIdsToFetchRemotely.length;
//				
//				var opts = $n2.extend({},opts_,{
//					docIds: docIdsToFetchRemotely
//					,onSuccess: function(docs){
//						_this._updateOutstandingDocumentCount(0 - count);
//						count = 0;
//						storeDocuments(docs);
//					}
//					,onError: function(err){
//						_this._updateOutstandingDocumentCount(0 - count);
//						count = 0;
//						opts_.onError(err);
//					}
//				});
//				
//				_this.wrappedDb.getDocuments(opts);
//			} else {
//				done();
//			};
		};
		
		function performRemoteRequest(){
			// Figure out how many docs to fetch in this request
			if( docIdsToFetchRemotely.length > 0 ){
				var docIdsThisRequest;
				if( typeof _this.remoteDocumentCountLimit === 'number' ){
					docIdsThisRequest = docIdsToFetchRemotely.splice(0, _this.remoteDocumentCountLimit);
				} else {
					// No limit, ask for them all
					docIdsThisRequest = docIdsToFetchRemotely;
					docIdsToFetchRemotely = [];
				};
				
				var opts = $n2.extend({},opts_,{
					docIds: docIdsThisRequest
					,onSuccess: function(docs){
						_this._updateOutstandingDocumentCount(0 - docIdsThisRequest.length);
						count = count - docIdsThisRequest.length;

						docs.forEach(function(doc){
							docsToReturn.push(doc);	
							docsToStore.push(doc);	
						});

						_this._updateOutstandingStoreCount(docs.length);
						storeDocuments();
						
						performRemoteRequest();
					}
					,onError: function(err){
						_this._updateOutstandingDocumentCount(0 - count);
						count = 0;
						opts_.onError(err);
					}
				});
				
				_this.wrappedDb.getDocuments(opts);
			} else {
				done();
			};
		};
		
		function storeDocuments(){
			if( docsToStore.length < 1 ){
				return;
			};
			
			var doc = docsToStore.pop();
			
			_this.documentCache.updateDocument({
				doc: doc
				,onSuccess: function(){
					_this._updateOutstandingStoreCount(-1);
					storeDocuments();
				}
				,onError: function(){
					_this._updateOutstandingStoreCount(-1);
					storeDocuments();
				}
			});
		};
		
		function done(){
			_this._updateOutstandingDocumentCount(0 - count);
			count = 0;
			opts_.onSuccess(docsToReturn);
		};
	},

	listAllDocuments: function(opts_) {
		this.wrappedDb.listAllDocuments(opts_);
	},

	getAllDocuments: function(opts_) {
		this.wrappedDb.getAllDocuments(opts_);
	},
	
	getInfo: function(opts_) {
		this.wrappedDb.getInfo(opts_);
	},
	
	queryTemporaryView: function(opts_){
		this.wrappedDb.queryTemporaryView(opts_);
	},
	
	_dbChanges: function(changes){
		var _this = this;
		
		$n2.log('update',changes);
		var lastSeq = changes.last_seq;
		var results = changes.results;
		
		for(var i=0,e=results.length; i<e; ++i){
			var updateRecord = results[i];
			var docId = updateRecord.id;

			var latestRev = null;

			if( $n2.isArray(updateRecord.changes) ) {
				updateRecord.changes.forEach(function(change){
					latestRev = change.rev;
				});
			};
			
			if( updateRecord.deleted ){
				// Remove from cache
				_this.documentCache.deleteDocument({
					docId: docId
				});
				
			} else if( latestRev ){
				// Ensure we only keep the current revision in the
				// indexDb cache
				_this.documentCache.checkDocumentRevision({
					docId: docId
					,rev: latestRev
				});
			};
		};
	},
	
	_updateOutstandingDocumentCount: function(delta){
		this.outstandingDocumentCount += delta;
		if( this.dispatchService ){
			this.dispatchService.send(DH,{
				type: 'waitReport'
				,requester: this.id
				,name: 'documents'
				,label: _loc('Outstanding documents')
				,count: this.outstandingDocumentCount
			});
		};
	},
	
	_updateOutstandingStoreCount: function(delta){
		this.outstandingStoreCount += delta;
		if( this.dispatchService ){
			this.dispatchService.send(DH,{
				type: 'waitReport'
				,requester: this.id
				,name: 'store'
				,label: _loc('Storing documents')
				,count: this.outstandingStoreCount
			});
		};
	}
});

// =============================================
// Server
// =============================================

var Server = $n2.Class({
	
	wrappedServer: null,
	
	indexDbCache: null,
	
	dispatchService: null,
	
	initialize: function(opts_){
		var opts = $n2.extend({
			couchServer: null
			,indexDbCache: null
			,dispatchService: null
		},opts_);
		
		this.wrappedServer = opts.couchServer;
		this.indexDbCache = opts.indexDbCache;
		this.dispatchService = opts.dispatchService;
	},

	getPathToServer: function() {
		return this.wrappedServer.getPathToServer();
	},

	getVersion: function() { 
		return this.wrappedServer.getVersion(); 
	},
	
	getReplicateUrl: function() {
		return this.wrappedServer.getReplicateUrl(); 
	},
	
	getActiveTasksUrl: function() {
		return this.wrappedServer.getActiveTasksUrl(); 
	},
	
	getSessionUrl: function() {
		return this.wrappedServer.getSessionUrl(); 
	},
	
	getUniqueId: function(opts_) {
		this.wrappedServer.getUniqueId(opts_);
	},
	
	listDatabases: function(opts_) {
		this.wrappedServer.listDatabases(opts_);
	},

	getUserDb: function() {
		return this.wrappedServer.getUserDb();
	},

	getSession: function(sessionInfo) {
		return this.wrappedServer.getSession(sessionInfo);
	},
	
	getDb: function(opts_) {
		var db = this.wrappedServer.getDb(opts_);
		if( opts_.allowCaching ){
			var documentCache = this.indexDbCache.getDocumentDatabase({
				dbName: opts_.dbName
			});
			return new Database({
				couchDb: db
				,documentCache: documentCache
				,dispatchService: this.dispatchService
				,remoteDocumentCountLimit: opts_.remoteDocumentCountLimit
			});
		} else {
			return db;
		};
	},
	
	createDb: function(opts_) {
		var opts = $n2.extend({
			dbName: null
			,onSuccess: function(db){}
			,onError: $n2.reportErrorForced
		},opts_);
		
		var _this = this;
		
		this.wrappedServer.createDb({
			dbName: opts.dbName
			,onSuccess: function(couchDb){
				var db = new Database({
					couchDb: couchDb
				});
				opts.onSuccess(db);
			}
			,onError: opts.onError
		});
	},
	
	deleteDb: function(opts_) {
		this.wrappedServer.deleteDb(opts_);
	},
	
	replicate: function(opts_){
		this.wrappedServer.replicate(opts_);
	},
	
	addInitializedListener: function(listener) {
		this.wrappedServer.addInitializedListener(listener);
	}
});

//=============================================

$n2.couchIndexDb = {
	getServer: function(opts_) {
		var opts = $n2.extend({
			couchServer: null
			,dispatchService: null
			,onSuccess: function(couchServer){}
			,onError: function(err){}
		},opts_);
		
		$n2.indexdb.openIndexDb({
			onSuccess: function(n2IndexDb){

				var server = new Server({
					couchServer: opts.couchServer
					,dispatchService: opts.dispatchService
					,indexDbCache: n2IndexDb
				});
				
				opts.onSuccess(server);
			}
			,onError: function(cause){
				var err = $n2.error.fromString('Error creating cached CouchDb server',cause);
				opts.onError(err);
			}
		});
	}
};

})(jQuery,nunaliit2);