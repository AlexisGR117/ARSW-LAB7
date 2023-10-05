apiclient=(function(){
    var domain = "http://localhost:8080";
	return {
		getBlueprintsByAuthor:function(authname, callback){
            $.get(domain + '/blueprints/' + authname, function (data) {
                callback(data);
            });
		},
        getBlueprintsByNameAndAuthor:function(authname, bpname, callback){
            $.get(domain + '/blueprints/' + authname + '/' + bpname, function (data) {
                callback(data);
            });
        }
    }
})();