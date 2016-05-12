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

;(function($n2) {
"use strict";

var 
 _loc = function(str,args){ return $n2.loc(str,'nunaliit2',args); }
 ,DH = 'n2.html'
 ;
 
//--------------------------------------------------------------------------
// List of HTML attributes that are valid for all elements
var globalAttributeMap = {
	'accesskey': true
	,'class': true
	,'contenteditable': true
	,'contextmenu': true
	,'dir': true
	,'draggable': true
	,'dropzone': true
	,'hidden': true
	,'id': true
	,'itemid': true
	,'itemprop': true
	,'itemref': true
	,'itemscope': true
	,'itemtype': true
	,'lang': true
	,'spellcheck': true
	,'style': true
	,'tabindex': true
	,'title': true
	,'translate': true
};

//--------------------------------------------------------------------------
function isAttributeNameValid(attrName){
	var attrName = attrName.toLower();
	
	if( globalAttributeMap[attrName] ){
		return true;
	};
	
	// Accessibility attribute
	if( 'aria-' === attrName.substr(0, 'aria-'.length) ){
		return true;
	};
	
	// DOM attributes
	if( 'data-' === attrName.substr(0, 'data-'.length) ){
		return true;
	};
	
	return false;
};

//--------------------------------------------------------------------------
$n2.html = {
	isAttributeNameValid: isAttributeNameValid
	,globalAttributeMap: globalAttributeMap
};

})(nunaliit2);