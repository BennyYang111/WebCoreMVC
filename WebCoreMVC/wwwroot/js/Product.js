var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#tblData').DataTable({
        "ajax": { url:'/admin/product/getall'},
        "columns": [
            { data: 'title', "width": "25%" },
            { data: 'isbn', "width": "15%" },
            { data: 'price', "width": "10%" },
            { data: 'author', "width": "20%" },
            { data: 'category.name', "width": "10%" },
            {
                data: 'id',
                "render": function (data) {
                    return `<div class="w-100 btn-group" role="group">
                                <a href="/Admin/Product/Detail?id=${data}" class="btn btn-danger mx-1">
                                    <i class="bg-info bi-trash-square"></i> View
                                </a>
                                <a href="/Admin/Product/Upsert?id=${data}" class="btn bg-dark btn-primary mx-1">
                                    <i class="bg-info bi-pencil-square"></i> Edit
                                </a>
                                <a onclick=Delete('/Admin/Product/Delete/${data}') class="btn btn-danger mx-1">
                                    <i class="bg-info bi-trash-square"></i> Delete
                                </a>
                            </div>`
                },
                "width": "30%"
            }
        ]
    });
}

function Delete(url) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                $.ajax({
                    url: url,
                    type: 'DELETE',
                    success: function (data) {
                        dataTable.ajax.reload();
                        toastr.success(data.message);
                    }
                })
            )
        }
    })
}
