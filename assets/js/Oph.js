/************************        DataTable      **************************/
$(document).ready(function () {


    $('.autoDataTablized').each(function () {
        var autoTabalized = dataTablizer($(this));
        FilterDatatable(autoTabalized);
    });

    $(".btn-details").on("click", function () {
        $(".templates-wrapper").hide();
        $(".templates-inside").show();
    });
    $(".templates-inside .template-back").on("click", function () {
        $(".templates-wrapper").show();
        $(".templates-inside").hide();
    });

    // Collapse Template
    $("#collapse-template").on("click", function () {
        $(this).closest("#patientsBody").toggleClass("collapsedTemplate");
    });

    // delete row 
    $(".delete-cell").on("click", function () {  
        $(this).closest("tr").remove();
    });

});