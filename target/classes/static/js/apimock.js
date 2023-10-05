//@author hcadavid

apimock=(function(){

	var mockdata=[];

	mockdata["johnconnor"]=	[{author:"johnconnor","points":[{"x":200,"y":200},{"x":200,"y":320},{"x":310,"y":320},
	{"x":310,"y":200},{"x":200,"y":200},{"x":250,"y":100},{"x":310,"y":200}],"name":"house"},
	 {author:"johnconnor","points":[{"x":340,"y":240},{"x":15,"y":215}],"name":"gear"},
	 {author:"johnconnor","points":[{"x":9,"y":11},{"x":110,"y":86},{"x":2,"y":42},{"x":11,"y":66},{"x":81,"y":33}],"name":"Space"},
	 {author:"johnconnor","points":[{"x":30,"y":24},{"x":19,"y":15},{"x":35,"y":80},{"x":45,"y":32}],"name":"Paint2"},
     {author:"johnconnor","points":[{"x":45,"y":60},{"x":85,"y":15},{"x":75,"y":75}],"name":"bed"}];
	mockdata["maryweyland"]=[{author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"house2"},
	 {author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"My paint 2.0"},
	 {author:"maryweyland","points":[{"x":94,"y":117},{"x":105,"y":85},{"x":20,"y":56}],"name":"The paint"},
	 {author:"maryweyland","points":[{"x":40,"y":10},{"x":55,"y":75},{"x":35,"y":120},{"x":5,"y":82}],"name":"Is paint?"},
	 {author:"maryweyland","points":[{"x":90,"y":20},{"x":15,"y":80}],"name":"house5"},
	 {author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115},{"x":33,"y":22},{"x":11,"y":56},{"x":95,"y":43}],"name":"The House"}];

	return {
		getBlueprintsByAuthor:function(authname,callback){
			callback(
				mockdata[authname]
			);
		},

		getBlueprintsByNameAndAuthor:function(authname,bpname,callback){

			callback(
				mockdata[authname].find(function(e){return e.name===bpname})
			);
		}
	}	

})();

/*
Example of use:
var fun=function(list){
	console.info(list);
}

apimock.getBlueprintsByAuthor("johnconnor",fun);
apimock.getBlueprintsByNameAndAuthor("johnconnor","house",fun);*/