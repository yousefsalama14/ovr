function init_datatable() {
    // $(".init_datatable").DataTable().destroy();
    // Init Datatable
    $(".init_datatable").each(function () {
        FilterDatatable(
            $(".init_datatable").DataTable({
                // "destroy":true,
                "dom": 'tpil',
                "stateSave": false,
                "scrollCollapse": false,
                "info": true,
                "paging": true,
                "responsive": true,
                "ordering": true,
                "colReorder": false,
            })
        );
    });

    
}

$(document).ready(function () {
    // Init Datatable
    init_datatable();
    // Delete Row
    $(".delete-cell").on("click", function () {
        $(this).closest("tr").remove();
    });
});

// Datatable Search
function showsearch(Me, e) {
    // alert(1);
    $(Me).parent().toggleClass("searching");
    $(Me).siblings("input,select").focus();
    $(Me).siblings("input,select").val("");
    $(Me).siblings("input,select").trigger("change");
    disablesort(Me, e);
}

function disablesort(Me, e) {
    if (!e) e = window.event;

    //IE9 & Other Browsers
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    //IE8 and Lower
    else {
        e.cancelBubble = true;
    }
}

// Apply the search on Datatable
function FilterDatatable(table) {
    var text = `<i class="fas fa-search ms-2" onclick="showsearch(this)"></i>
    <input type="text" class="form-control searchField" placeholder="Type your Search" onclick="disablesort(this)" />`;
    var select = `<i class="fas fa-search ms-2" onclick="showsearch(this)"></i>
    <select class="form-control searchField" onclick="disablesort(this)">
        <option value=""></option>
    </select>`;
    var select2 = `<i class="fas fa-search ms-2" onclick="showsearch(this)"></i>
    <select class="form-control single-select searchField" onclick="disablesort(this)">
        <option value=""></option>
    </select>`;

    $(table.table().header())
        .find(".searchableTh")
        .each(function (index, value) {
            var searchtype = $(this).data("searchtype");
            var that = this;
            if (searchtype === "text") {
                $(this).append(text);
            } else if (searchtype === "select") {
                $(this).append(select);
                table
                    .column(this)
                    .cache("search")
                    .sort()
                    .unique()
                    .sort()
                    .each(function (d, j) {
                        if (d !== "") {
                            $(that)
                                .find("select")
                                .append(
                                    '<option value="' +
                                        d +
                                        '">' +
                                        d +
                                        "</option>"
                                );
                        }
                    });
            }
        });

    table.columns().every(function () {
        var that = this;

        $("input", this.header()).on("keyup change", function () {
            if (that.search() !== this.value) {
                that.search(this.value).draw();
            }
        });

        $("select", this.header()).on("change", function () {
            if (that.search() !== this.value) {
                that.search(this.value).draw();
            }
        });
    });
}

document.addEventListener("shown.bs.tab", function (event) {
    // Check if the shown tab is the second tab
    if (event.target.id === "IncidentTypes-tab") {
        console.log("Tab2");
    }
});
