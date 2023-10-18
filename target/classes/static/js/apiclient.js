apiclient=(function(){
    const baseURL = "http://localhost:8080/blueprints/";
	return {
	    getBlueprintsByAuthor: function (authname) {
            return new Promise(function (resolve, reject) {
                $.get(baseURL + authname, function (data) {
                    resolve(data);
                }).fail(function (error) {
                    reject(error);
                });
            });
        },
        getBlueprintsByNameAndAuthor: function (authname, bpname) {
            return new Promise(function (resolve, reject) {
                $.get(baseURL + authname + '/' + bpname, function (data) {
                    resolve(data);
                }).fail(function (error) {
                    reject(error);
                });
            });
        },
        updateBlueprint: function (blueprint) {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: baseURL + blueprint.author + '/' + blueprint.name,
                    type: 'PUT',
                    data: JSON.stringify(blueprint),
                    contentType: "application/json",
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (error) {
                        reject(error);
                    }
                });
            });
        },
        postBlueprint: function (blueprint) {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: baseURL,
                    type: 'POST',
                    data: JSON.stringify(blueprint),
                    contentType: "application/json",
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (error) {
                        reject(error);
                    }
                });
            });
        },
        deleteBlueprint: function (blueprint) {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: baseURL + blueprint.author + '/' + blueprint.name,
                    type: 'DELETE',
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (error) {
                        reject(error);
                    }
                });
            });
        }
    }
})();