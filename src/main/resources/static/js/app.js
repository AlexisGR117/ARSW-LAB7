var Application;
$(function() {
    Application = (function () {
        var authorName = "";
        var blueprintsAuthor = [];
        var module = apimock;
        var canvas = $("#canvas")[0];
        var context = canvas.getContext("2d");
        var currentBlueprint = null;

        function init() {
            if(window.PointerEvent) {
                canvas.addEventListener("pointerdown", function(event) {
                    paintLine(Math.round(event.offsetX), Math.round(event.offsetY));
                });
            }
        }

        function paintLine(finalX, finalY) {
            context.lineTo(finalX, finalY);
            context.stroke();
        }

        function changeAuthorName(newName) {
            authorName = newName;
        }

        function createBlueprintRow(authorName, blueprint) {
            var row = $("<tr>");
            var name = $("<td>").text(blueprint.name);
            var points = $("<td>").text(blueprint.numberOfPoints);
            var button = $("<button>")
                        .text("Open")
                        .on("click", function() {
                            openBlueprint(authorName, blueprint.name);
                        });
            button.addClass("btn btn-outline-secondary");
            button.attr("type", "submit");
            var buttonAppend = $("<td>").append(button);
            row.append(name, points, buttonAppend);
            return row;
        }

        function getBlueprintsByAuthor(authorName) {
            module.getBlueprintsByAuthor(authorName, function (blueprints) {
                var newBlueprints = blueprints.map(function (blueprints) {
                    return {name: blueprints.name, numberOfPoints: blueprints.points.length};
                });
                var table = $("#table-blueprints");
                table.find("tr:not(:first)").remove();
                newBlueprints.forEach(function (blueprint) {
                    var row = createBlueprintRow(authorName, blueprint);
                    table.append(row);
                });
                var totalPoints = newBlueprints.reduce(function (total, blueprint) {
                    return total + blueprint.numberOfPoints;
                }, 0);
                $("#total-points").text(totalPoints);
                $("#author").text(authorName + "'s blueprints:");
            });
        }

        function openBlueprint(authorName, blueprintName) {
            module.getBlueprintsByNameAndAuthor(authorName, blueprintName, function (blueprint) {
                currentBlueprint = blueprint;
                var points = currentBlueprint.points;
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.beginPath();
                context.moveTo(points[0].x, points[0].y);
                for (var i = 0; i < points.length; i++) {
                    paintLine(points[i].x, points[i].y);
                }
                $("#name-blueprint").text(blueprintName);
            });
        }

        return {
          changeAuthorName: changeAuthorName,
          getBlueprintsByAuthor: getBlueprintsByAuthor,
          init: init
        };
    })();
    Application.init();
});