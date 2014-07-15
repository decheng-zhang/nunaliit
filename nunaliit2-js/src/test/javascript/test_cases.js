// **** Test cases ****

var $n2 = nunaliit2;

//*********
jsunit.defineTest('$n2.isDefined',function($$){
	if( $n2.isDefined(undefined) ){
		$$.fail('$n2.isDefined(undefined)');
	};

	if( $n2.isDefined(null) ){
		$$.fail('$n2.isDefined(null)');
	};

	if( false === $n2.isDefined(1) ){
		$$.fail('$n2.isDefined(1)');
	};

	if( false === $n2.isDefined('a') ){
		$$.fail('$n2.isDefined(a)');
	};

	if( false === $n2.isDefined(false) ){
		$$.fail('$n2.isDefined(false)');
	};

	if( false === $n2.isDefined(true) ){
		$$.fail('$n2.isDefined(true)');
	};

	if( false === $n2.isDefined([]) ){
		$$.fail('$n2.isDefined([])');
	};

	if( false === $n2.isDefined({}) ){
		$$.fail('$n2.isDefined({})');
	};
});

//*********
jsunit.defineTest('$n2.isArray',function($$){
	if( $n2.isArray(undefined) ){
		$$.fail('$n2.isArray(undefined)');
	};

	if( $n2.isArray(null) ){
		$$.fail('$n2.isArray(null)');
	};

	if( $n2.isArray(1) ){
		$$.fail('$n2.isArray(1)');
	};

	if( $n2.isArray('a') ){
		$$.fail('$n2.isArray(a)');
	};

	if( $n2.isArray(true) ){
		$$.fail('$n2.isArray(true)');
	};

	if( $n2.isArray({}) ){
		$$.fail('$n2.isArray({})');
	};

	if( false == $n2.isArray([]) ){
		$$.fail('$n2.isArray([])');
	};

	if( false == $n2.isArray(new Array()) ){
		$$.fail('$n2.isArray(new Array())');
	};
});

//*********
jsunit.defineTest('$n2.inArray',function($$){
	var arr = ['a','b','b'];
	
	var i = $n2.inArray(null,null);
	if( i >= 0 ){
		$$.fail('$n2.inArray(null,null)');
	};

	i = $n2.inArray(null,arr);
	if( i >= 0 ){
		$$.fail('$n2.inArray(null,arr)');
	};

	i = $n2.inArray('d',arr);
	if( i >= 0 ){
		$$.fail('$n2.inArray("d",arr)');
	};

	i = $n2.inArray('a',arr);
	if( i != 0 ){
		$$.fail('$n2.inArray("a",arr)');
	};

	i = $n2.inArray('b',arr);
	if( i != 1 ){
		$$.fail('$n2.inArray("b",arr)');
	};

	i = $n2.inArray('b',arr,0);
	if( i != 1 ){
		$$.fail('$n2.inArray("b",arr,0)');
	};

	i = $n2.inArray('b',arr,2);
	if( i != 2 ){
		$$.fail('$n2.inArray("b",arr,2)');
	};

	i = $n2.inArray('b',arr,3);
	if( i >= 0 ){
		$$.fail('$n2.inArray("b",arr,3)');
	};

	i = $n2.inArray('b',arr,-1);
	if( i != 2 ){
		$$.fail('$n2.inArray("b",arr,-1)');
	};

	i = $n2.inArray('b',arr,-2);
	if( i != 1 ){
		$$.fail('$n2.inArray("b",arr,-2)');
	};

	i = $n2.inArray('b',arr,-5);
	if( i != 1 ){
		$$.fail('$n2.inArray("b",arr,-5)');
	};
});

//*********
jsunit.defineTest('$n2.trim',function($$){

	if( '' !== $n2.trim(null) ){
		$$.fail("$n2.trim(null)");
	};

	if( '' !== $n2.trim('') ){
		$$.fail("$n2.trim('')");
	};

	if( '' !== $n2.trim(' ') ){
		$$.fail("$n2.trim(' ')");
	};

	if( '' !== $n2.trim('  ') ){
		$$.fail("$n2.trim('  ')");
	};

	if( 'a' !== $n2.trim('a') ){
		$$.fail("$n2.trim('a')");
	};

	if( 'a' !== $n2.trim(' a') ){
		$$.fail("$n2.trim(' a')");
	};

	if( 'a' !== $n2.trim('a ') ){
		$$.fail("$n2.trim('a ')");
	};

	if( 'a' !== $n2.trim(' a ') ){
		$$.fail("$n2.trim(' a ')");
	};

	if( 'a' !== $n2.trim('  a  ') ){
		$$.fail("$n2.trim('  a  ')");
	};

	if( 'aaa' !== $n2.trim('  aaa  ') ){
		$$.fail("$n2.trim('  aaa  ')");
	};

	if( 'aaa  bbb' !== $n2.trim('  aaa  bbb  ') ){
		$$.fail("$n2.trim('  aaa  bbb  ')");
	};
});

//*********
jsunit.defineTest('$n2.interval',function($$){

	var interval1 = new $n2.Interval({min:10,max:20});
	var interval2 = new $n2.Interval({min:30,max:40});
	var interval3 = new $n2.Interval({min:0,max:50});
	
	if( 10 !== interval2.size() ){
		$$.fail("interval2.size() should be 10");
	};
	
	if( !interval1.equals(interval1) ){
		$$.fail("interval1 should be equal to itself");
	};
	
	if( interval1.equals(interval2) ){
		$$.fail("interval1 and interval2 are not equal");
	};
	
	if( interval1.equals(null) ){
		$$.fail("interval1 should not be equal to null");
	};
	
	if( !interval1.equals({min:10,max:20}) ){
		$$.fail("interval1 should be equal to an equivalent interval");
	};
	
	if( interval1.isIncludedIn(null) ){
		$$.fail("interval1 should not be included within null");
	};
	
	if( !interval1.isIncludedIn(interval1) ){
		$$.fail("interval1 should be included within itself");
	};
	
	if( !interval1.isIncludedIn(interval3) ){
		$$.fail("interval1 should be included within interval3");
	};
	
	if( interval3.isIncludedIn(interval1) ){
		$$.fail("interval3 should not be included within interval1");
	};
	
	if( interval1.intersectsWith(interval2) ){
		$$.fail("interval1 and interval2 do not intersect");
	};
	
	if( !interval1.intersectsWith(interval3) ){
		$$.fail("interval1 and interval3 intersects");
	};
	
	var interval4 = interval1.extendTo(interval2);
	if( 10 != interval4.min ){
		$$.fail("Problem with min after extending");
	};
	if( 40 != interval4.max ){
		$$.fail("Problem with min after extending");
	};
});

//*********
jsunit.defineTest('$n2.date.parseUserDate',function($$){

	var d1980 = $n2.date.parseUserDate('1980');
	var d198006 = $n2.date.parseUserDate('1980-06');
	var d19800602 = $n2.date.parseUserDate('1980-06-02');
	var d198008 = $n2.date.parseUserDate('1980-08');
	var d1982 = $n2.date.parseUserDate('1982');
	
	if( d1980.size() <= d198006.size() ){
		$$.fail("1980 should be larger than 1980-06");
	};
	if( d198006.size() <= d19800602.size() ){
		$$.fail("1980-06 should be larger than 1980-06-02");
	};
	if( !d198006.isIncludedIn(d1980) ){
		$$.fail("1980-06 should be included within 1980");
	};
	if( !d19800602.isIncludedIn(d198006) ){
		$$.fail("1980-06-02 should be included within 1980-06");
	};
	
	if( d198008.intersectsWith(d198006) ){
		$$.fail("June 1980 and August 1980 do not intersects");
	};
	if( d198008.intersectsWith(d1982) ){
		$$.fail("June 1980 and 1982 do not intersects");
	};
});
