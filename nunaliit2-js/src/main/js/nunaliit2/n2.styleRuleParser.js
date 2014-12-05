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

;(function($n2) {

/* parser generated by jison 0.4.15 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,3],$V1=[1,4],$V2=[1,6],$V3=[1,7],$V4=[1,8],$V5=[1,9],$V6=[1,10],$V7=[1,12],$V8=[1,13],$V9=[1,14],$Va=[1,15],$Vb=[1,16],$Vc=[1,17],$Vd=[1,18],$Ve=[1,19],$Vf=[1,20],$Vg=[1,21],$Vh=[1,22],$Vi=[1,23],$Vj=[1,24],$Vk=[5,6,7,10,11,12,13,14,15,16,23,24,25,26,27,28,32],$Vl=[5,6,7,9,10,11,12,13,14,15,16,23,24,25,26,27,28,29,31,32],$Vm=[5,6,7,10,28,32],$Vn=[5,6,7,10,11,12,13,14,15,16,28,32],$Vo=[5,6,7,10,11,12,13,14,15,16,23,24,28,32],$Vp=[10,28];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"program":3,"value":4,"EOF":5,"&&":6,"||":7,"!":8,"(":9,")":10,"==":11,"!=":12,">=":13,"<=":14,">":15,"<":16,"identifier":17,"arguments":18,"true":19,"false":20,"NUMBER":21,"STRING":22,"+":23,"-":24,"*":25,"/":26,"%":27,",":28,".":29,"VAR_NAME":30,"[":31,"]":32,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"&&",7:"||",8:"!",9:"(",10:")",11:"==",12:"!=",13:">=",14:"<=",15:">",16:"<",19:"true",20:"false",21:"NUMBER",22:"STRING",23:"+",24:"-",25:"*",26:"/",27:"%",28:",",29:".",30:"VAR_NAME",31:"[",32:"]"},
productions_: [0,[3,2],[4,3],[4,3],[4,2],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,4],[4,1],[4,1],[4,1],[4,1],[4,1],[4,3],[4,3],[4,3],[4,3],[4,3],[18,3],[18,1],[17,3],[17,4],[17,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 return $$[$0-1]; 
break;
case 2:

        	this.$ = new Expression($$[$0-2],'&&',$$[$0]);
        
break;
case 3:

        	this.$ = new Expression($$[$0-2],'||',$$[$0]);
        
break;
case 4:

        	this.$ = new Expression($$[$0],'!');
        
break;
case 5:

    		this.$ = $$[$0-1];
    	
break;
case 6:

        	this.$ = new Comparison($$[$0-2],$$[$0],'==');
        
break;
case 7:

        	this.$ = new Comparison($$[$0-2],$$[$0],'!=');
        
break;
case 8:

        	this.$ = new Comparison($$[$0-2],$$[$0],'>=');
        
break;
case 9:

        	this.$ = new Comparison($$[$0-2],$$[$0],'<=');
        
break;
case 10:

        	this.$ = new Comparison($$[$0-2],$$[$0],'>');
        
break;
case 11:

        	this.$ = new Comparison($$[$0-2],$$[$0],'<');
        
break;
case 12:

        	this.$ = new FunctionCall($$[$0-2],null);
        
break;
case 13:

        	this.$ = new FunctionCall($$[$0-3],$$[$0-1]);
        
break;
case 14:

        	this.$ = $$[$0];
        
break;
case 15:

    		this.$ = new Literal(true);
    	
break;
case 16:

    		this.$ = new Literal(false);
    	
break;
case 17:

    		this.$ = new Literal(1 * $$[$0]);
    	
break;
case 18:

    		this.$ = new Literal($$[$0]);
    	
break;
case 19:

    		this.$ = new MathOp($$[$0-2],$$[$0],'+');
    	
break;
case 20:

    		this.$ = new MathOp($$[$0-2],$$[$0],'-');
    	
break;
case 21:

    		this.$ = new MathOp($$[$0-2],$$[$0],'*');
    	
break;
case 22:

    		this.$ = new MathOp($$[$0-2],$$[$0],'/');
    	
break;
case 23:

    		this.$ = new MathOp($$[$0-2],$$[$0],'%');
    	
break;
case 24:

        	this.$ = new Argument($$[$0-2],$$[$0]);
        
break;
case 25:

        	this.$ = new Argument($$[$0]);
        
break;
case 26:

        	var id = new Literal($$[$0]);
        	this.$ = new ObjectSelector(id,$$[$0-2]);
        
break;
case 27:

        	this.$ = new ObjectSelector($$[$0-1],$$[$0-3]);
        
break;
case 28:

        	this.$ = new Variable($$[$0]);
        
break;
}
},
table: [{3:1,4:2,8:$V0,9:$V1,17:5,19:$V2,20:$V3,21:$V4,22:$V5,30:$V6},{1:[3]},{5:[1,11],6:$V7,7:$V8,11:$V9,12:$Va,13:$Vb,14:$Vc,15:$Vd,16:$Ve,23:$Vf,24:$Vg,25:$Vh,26:$Vi,27:$Vj},{4:25,8:$V0,9:$V1,17:5,19:$V2,20:$V3,21:$V4,22:$V5,30:$V6},{4:26,8:$V0,9:$V1,17:5,19:$V2,20:$V3,21:$V4,22:$V5,30:$V6},o($Vk,[2,14],{9:[1,27],29:[1,28],31:[1,29]}),o($Vk,[2,15]),o($Vk,[2,16]),o($Vk,[2,17]),o($Vk,[2,18]),o($Vl,[2,28]),{1:[2,1]},{4:30,8:$V0,9:$V1,17:5,19:$V2,20:$V3,21:$V4,22:$V5,30:$V6},{4:31,8:$V0,9:$V1,17:5,19:$V2,20:$V3,21:$V4,22:$V5,30:$V6},{4:32,8:$V0,9:$V1,17:5,19:$V2,20:$V3,21:$V4,22:$V5,30:$V6},{4:33,8:$V0,9:$V1,17:5,19:$V2,20:$V3,21:$V4,22:$V5,30:$V6},{4:34,8:$V0,9:$V1,17:5,19:$V2,20:$V3,21:$V4,22:$V5,30:$V6},{4:35,8:$V0,9:$V1,17:5,19:$V2,20:$V3,21:$V4,22:$V5,30:$V6},{4:36,8:$V0,9:$V1,17:5,19:$V2,20:$V3,21:$V4,22:$V5,30:$V6},{4:37,8:$V0,9:$V1,17:5,19:$V2,20:$V3,21:$V4,22:$V5,30:$V6},{4:38,8:$V0,9:$V1,17:5,19:$V2,20:$V3,21:$V4,22:$V5,30:$V6},{4:39,8:$V0,9:$V1,17:5,19:$V2,20:$V3,21:$V4,22:$V5,30:$V6},{4:40,8:$V0,9:$V1,17:5,19:$V2,20:$V3,21:$V4,22:$V5,30:$V6},{4:41,8:$V0,9:$V1,17:5,19:$V2,20:$V3,21:$V4,22:$V5,30:$V6},{4:42,8:$V0,9:$V1,17:5,19:$V2,20:$V3,21:$V4,22:$V5,30:$V6},o($Vk,[2,4]),{6:$V7,7:$V8,10:[1,43],11:$V9,12:$Va,13:$Vb,14:$Vc,15:$Vd,16:$Ve,23:$Vf,24:$Vg,25:$Vh,26:$Vi,27:$Vj},{4:46,8:$V0,9:$V1,10:[1,44],17:5,18:45,19:$V2,20:$V3,21:$V4,22:$V5,30:$V6},{30:[1,47]},{4:48,8:$V0,9:$V1,17:5,19:$V2,20:$V3,21:$V4,22:$V5,30:$V6},o($Vm,[2,2],{11:$V9,12:$Va,13:$Vb,14:$Vc,15:$Vd,16:$Ve,23:$Vf,24:$Vg,25:$Vh,26:$Vi,27:$Vj}),o($Vm,[2,3],{11:$V9,12:$Va,13:$Vb,14:$Vc,15:$Vd,16:$Ve,23:$Vf,24:$Vg,25:$Vh,26:$Vi,27:$Vj}),o($Vn,[2,6],{23:$Vf,24:$Vg,25:$Vh,26:$Vi,27:$Vj}),o($Vn,[2,7],{23:$Vf,24:$Vg,25:$Vh,26:$Vi,27:$Vj}),o($Vn,[2,8],{23:$Vf,24:$Vg,25:$Vh,26:$Vi,27:$Vj}),o($Vn,[2,9],{23:$Vf,24:$Vg,25:$Vh,26:$Vi,27:$Vj}),o($Vn,[2,10],{23:$Vf,24:$Vg,25:$Vh,26:$Vi,27:$Vj}),o($Vn,[2,11],{23:$Vf,24:$Vg,25:$Vh,26:$Vi,27:$Vj}),o($Vo,[2,19],{25:$Vh,26:$Vi,27:$Vj}),o($Vo,[2,20],{25:$Vh,26:$Vi,27:$Vj}),o($Vk,[2,21]),o($Vk,[2,22]),o($Vk,[2,23]),o($Vk,[2,5]),o($Vk,[2,12]),{10:[1,49],28:[1,50]},o($Vp,[2,25],{6:$V7,7:$V8,11:$V9,12:$Va,13:$Vb,14:$Vc,15:$Vd,16:$Ve,23:$Vf,24:$Vg,25:$Vh,26:$Vi,27:$Vj}),o($Vl,[2,26]),{6:$V7,7:$V8,11:$V9,12:$Va,13:$Vb,14:$Vc,15:$Vd,16:$Ve,23:$Vf,24:$Vg,25:$Vh,26:$Vi,27:$Vj,32:[1,51]},o($Vk,[2,13]),{4:46,8:$V0,9:$V1,17:5,18:52,19:$V2,20:$V3,21:$V4,22:$V5,30:$V6},o($Vl,[2,27]),o($Vp,[2,24])],
defaultActions: {11:[2,1]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        function lex() {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};


// Functions in the global space receives the context object
// as 'this' and the arguments in the form of an instance of
// class Argument
var global = {
	isSelected: function(){
		return this.n2_selected;
	}
	,isHovered: function(){
		return this.n2_hovered;
	}
	,isFound: function(){
		return this.n2_found;
	}
	,isPoint: function(){
		return 'point' === this.n2_geometry;
	}
	,isLine: function(args){
		return 'line' === this.n2_geometry;
	}
	,isPolygon: function(args){
		return 'polygon' === this.n2_geometry;
	}
	,onLayer: function(args){
		if( args ){
			var layerId = args.getArgument(this, 0);
			if( this.n2_doc 
			 && this.n2_doc.nunaliit_layers ){
			 	var index = this.n2_doc.nunaliit_layers.indexOf(layerId);
				return (index >= 0);
			};
		};
		return false;
	}
};

// -----------------------------------------------------------
var FunctionCall = function(value, args){
	this.value = value;
	this.args = args;
};
FunctionCall.prototype.getValue = function(ctxt){
	var value = this.value.getValue(ctxt);
	if( typeof value === 'function' ){
		return value.call(ctxt, this.args);
	};
	return false;
};

// -----------------------------------------------------------
// Argument
var Argument = function(a1, a2){
	this.valueNode = a1;
	if( a2 ){
		this.nextArgument = a2;
	} else {
		this.nextArgument = null;
	};
};
Argument.prototype.getCount = function(){
	if( this.nextArgument ){
		return 1 + this.nextArgument.getCount();
	};
	
	return 1;
};
Argument.prototype.getArgument = function(ctxt, position){
	if( position < 1 ){
		return this.valueNode.getValue(ctxt);
	};
	
	if( this.nextArgument ){
		this.nextArgument.getArgument(ctxt, position-1);
	};
	
	return undefined;
};

// -----------------------------------------------------------
var Expression = function(n1, op, n2){
	this.n1 = n1;
	this.n2 = n2;
	this.op = op;
};
Expression.prototype.getValue = function(ctxt){
	var r1 = this.n1.getValue(ctxt);
	var r2 = undefined;
	if( this.n2 ){
		r2 = this.n2.getValue(ctxt);
	};
	if( '!' === this.op ){
		return !r1;
		
	} else if( '&&' === this.op ){
		return (r1 && r2);
		
	} else if( '||' === this.op ){
		return (r1 || r2);
	};
	return false;
};

// -----------------------------------------------------------
var Literal = function(value){
	this.value = value;
};
Literal.prototype.getValue = function(ctxt){
	return this.value;
};

// -----------------------------------------------------------
var Comparison = function(leftNode, rightNode, op){
	this.leftNode = leftNode;
	this.rightNode = rightNode;
	this.op = op;
};
Comparison.prototype.getValue = function(ctxt){
	var left = this.leftNode.getValue(ctxt);
	var right = this.rightNode.getValue(ctxt);

	if( '==' === this.op ){
		return (left == right);

	} else if( '!=' === this.op ){
		return (left != right);

	} else if( '>=' === this.op ){
		return (left >= right);

	} else if( '<=' === this.op ){
		return (left <= right);

	} else if( '>' === this.op ){
		return (left > right);

	} else if( '<' === this.op ){
		return (left < right);
	};
	
	return false;
};

// -----------------------------------------------------------
var MathOp = function(leftNode, rightNode, op){
	this.leftNode = leftNode;
	this.rightNode = rightNode;
	this.op = op;
};
MathOp.prototype.getValue = function(ctxt){
	var left = this.leftNode.getValue(ctxt);
	var right = this.rightNode.getValue(ctxt);

	if( '+' === this.op ){
		return (left + right);

	} else if( '-' === this.op ){
		return (left - right);

	} else if( '*' === this.op ){
		return (left * right);

	} else if( '/' === this.op ){
		return (left / right);

	} else if( '%' === this.op ){
		return (left % right);
	};
	
	return 0;
};

// -----------------------------------------------------------
var ObjectSelector = function(id, previousSelector){
	this.idNode = id;
	this.previousSelector = previousSelector;
};
ObjectSelector.prototype.getValue = function(ctxt){
	var obj = this.previousSelector.getValue(ctxt);
	if( typeof obj === 'object' ){
		var id = this.idNode.getValue(ctxt);
		if( typeof id === 'undefined' ){
			return undefined;
		};
		
		return obj[id];
	};

	return undefined;
};

// -----------------------------------------------------------
var Variable = function(variableName){
	this.variableName = variableName;
};
Variable.prototype.getValue = function(ctxt){
	var obj = undefined;
	
	if( ctxt && 'doc' === this.variableName ) {
		obj = ctxt.n2_doc;
		
	} else if( ctxt && ctxt[this.variableName] ) {
		obj = ctxt[this.variableName];
		
	} else if( global && global[this.variableName] ) {
		obj = global[this.variableName];
	};
	
	return obj;
};




/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0: /* skip whitespace */ 
break;
case 1: return 19; 
break;
case 2: return 20; 
break;
case 3: return 21; 
break;
case 4: return 30; 
break;
case 5: yy_.yytext = yy_.yytext.substr(1,yy_.yytext.length-2); return 22; 
break;
case 6: return 11; 
break;
case 7: return 12; 
break;
case 8: return 13; 
break;
case 9: return 14; 
break;
case 10: return 15; 
break;
case 11: return 16; 
break;
case 12: return 9; 
break;
case 13: return 10; 
break;
case 14: return '{'; 
break;
case 15: return '}'; 
break;
case 16: return 31; 
break;
case 17: return 32; 
break;
case 18: return 28; 
break;
case 19: return 29; 
break;
case 20: return 8; 
break;
case 21: return 23; 
break;
case 22: return 24; 
break;
case 23: return 25; 
break;
case 24: return 26; 
break;
case 25: return 27; 
break;
case 26: return 6; 
break;
case 27: return 7; 
break;
case 28: return 5; 
break;
case 29: return 'INVALID'; 
break;
}
},
rules: [/^(?:\s+)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:[0-9]+(\.[0-9]+)?\b)/,/^(?:[_a-zA-Z][_a-zA-Z0-9]*)/,/^(?:'(\\'|[^'])*')/,/^(?:==)/,/^(?:!=)/,/^(?:>=)/,/^(?:<=)/,/^(?:>)/,/^(?:<)/,/^(?:\()/,/^(?:\))/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:,)/,/^(?:\.)/,/^(?:!)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:\/)/,/^(?:%)/,/^(?:&&)/,/^(?:\|\|)/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.Parser = parser.Parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}	
//--------------------------------------------------------------------------
function parse(){
	return parser.parse.apply(parser, arguments);
};
	
//--------------------------------------------------------------------------
$n2.styleRuleParser = {
	parse: parse
};

})(nunaliit2);
