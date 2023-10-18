let Application;
$(function() {
    Application = (function () {

        const module = apiclient;
        const table = $("#table-blueprints");
        const nameBlueprint = $("#name-blueprint");
        const nameAuthor = $("#name-author");
        const currentName = $("#current-blueprint");
        const canvas = $("#canvas")[0];
        const context = canvas.getContext("2d");
        let currentBlueprint = null;
        let currentAuthor = null;

        function init() {
            if(window.PointerEvent) {
                canvas.addEventListener("pointerdown", function(event){
                    setPoint(event.offsetX, event.offsetY);
                });
            } else {
                canvas.addEventListener("mousedown", function(event) {
                    setPoint(event.clientX, event.clientY);
                });
            }
            $("#get").click(handleGet);
            $("#save-update").click(handleSaveUpdate);
            $("#create").click(handleCreate);
            $("#delete").click(handleDelete);
        }

        function setPoint(x, y) {
            if (currentBlueprint) {
                const xPosition = Math.round(x);
                const yPosition = Math.round(y);
                paintLine(xPosition, yPosition);
                currentBlueprint.points.push({ x: xPosition, y: yPosition });
            }
        }

        function handleGet() {
            clearCanvas();
            updateBlueprintState(true, true);
            Application.getBlueprintsByAuthor(nameAuthor.val())
        }

        function handleSaveUpdate() {
            if (currentBlueprint) {
                if (currentBlueprint.name === "") {
                    if (nameBlueprint.val() === "" || nameAuthor.val() === "") {
                        alert("Se debe ingresar el nombre de la pintura y del autor");
                    } else {
                        currentBlueprint.author = nameAuthor.val();
                        currentBlueprint.name = nameBlueprint.val();
                        updateBlueprintState(false, true);
                        module.postBlueprint(currentBlueprint)
                            .then(() =>  getBlueprintsByAuthor(currentBlueprint.author));
                    }
                } else {
                    module.updateBlueprint(currentBlueprint)
                        .then(() => getBlueprintsByAuthor(currentBlueprint.author));
                }
            }
        }

        function handleCreate() {
            clearCanvas();
            updateBlueprintState(true, false);
            currentBlueprint = {
              author: "",
              name: "",
              points: []
            };
        }

        function handleDelete() {
            clearCanvas();
            updateBlueprintState(true, true);
            if (currentBlueprint && currentBlueprint.name != "") {
                module.deleteBlueprint(currentBlueprint)
                    .then(() => getBlueprintsByAuthor(currentBlueprint.author))
                    .then(() => currentBlueprint = null);

            }
        }

        function clearCanvas() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();
        }

        function paintLine(finalX, finalY) {
            context.lineTo(finalX, finalY);
            context.stroke();
        }

        function changeAuthorName(newName) {
            currentAuthor = newName;
        }

        function updateBlueprintState(isHideName, isHideInput) {
            if (isHideName) {
                currentName.text("");
                currentName.hide();
            } else {
                currentName.text(currentBlueprint.name);
                currentName.show();
            }
            nameBlueprint.val("");
            if (isHideInput) nameBlueprint.hide();
            else nameBlueprint.show();
        }

        function createBlueprintRow(blueprint) {
            const row = $("<tr>");
            const name = $("<td>").text(blueprint.name);
            const points = $("<td>").text(blueprint.numberOfPoints);
            const button = $("<button>")
                .text("Open")
                .on("click", () => openBlueprint(currentAuthor, blueprint.name));
            button.addClass("btn btn-outline-secondary");
            button.attr("type", "submit");
            const buttonAppend = $("<td>").append(button);
            row.append(name, points, buttonAppend);
            return row;
        }

        function getBlueprintsByAuthor(authorName) {
            table.empty();
            $("#total-points").text("0");
            module.getBlueprintsByAuthor(authorName)
                .then((blueprints) => {
                    currentAuthor = authorName;
                    const newBlueprints = blueprints.map((blueprint) => {
                        const row = createBlueprintRow({ name: blueprint.name, numberOfPoints: blueprint.points.length });
                        table.append(row);
                        return { name: blueprint.name, numberOfPoints: blueprint.points.length };
                    });
                    const totalPoints = newBlueprints.reduce((total, blueprint) => total + blueprint.numberOfPoints, 0);
                    $("#total-points").text(totalPoints);
                    $("#author").text(currentAuthor + "'s blueprints:");
                });
        }

        function openBlueprint(authorName, blueprintName) {
            module.getBlueprintsByNameAndAuthor(authorName, blueprintName)
                .then((blueprint) => {
                    currentBlueprint = blueprint;
                    const points = currentBlueprint.points;
                    clearCanvas();
                    context.moveTo(points[0].x, points[0].y);
                    for (let i = 1; i < points.length; i++) {
                        paintLine(points[i].x, points[i].y);
                    }
                    updateBlueprintState(false, true);
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