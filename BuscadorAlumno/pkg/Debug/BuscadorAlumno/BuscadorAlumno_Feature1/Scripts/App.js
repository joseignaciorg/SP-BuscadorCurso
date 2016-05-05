'use strict';

$(function () {

    $("#btnCursos").click(getAlumnos);

});

function getAlumnos() {

    var duracion = $("#txtDuracion").val();

    $("#displayDiv").empty();

    $("#displayDiv").append($("<img>", { src: "_layouts/images/gears_an.gif" }));

    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('Curso')/items?$filter=duracion gt " + duracion;

    $.ajax({

        type: "GET",

        url: requestUri,

        contentType: "application/json",

        headers: {

            "accept": "application/json;odata=verbose",

        },

        success: onReturnData,

        error: function (xhr, ajaxOptions, thrownError) {

            alert(xhr.status);

        }

    });

}

function onReturnData(data) {

    $("#displayDiv").empty();

    var oDataResult = data.d.results;

    var tableHeader = "<thead>" +

    "<td>Nombre</td>" +

    "<td>Duracion</td>" +

    "<td>Inicio</td>" +

    "<td>Fin</td>" +

    "</thead>";

    var table = $("<table>", { id: "alumnosTable" }).append($(tableHeader));

    $.each(oDataResult, function (i, item) {

        var row = "<tr>" +

        "<td>" + item.nombre + "</td>" +

        "<td>" + item.duracion + "</td>" +

        "<td>" + item.inicio + "</td>" +

        "<td>" + item.fin + "</td></tr>";

        table.append(row);

    });

    $("#displayDiv").append(table);

}
