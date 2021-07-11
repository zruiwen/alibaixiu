// 当添加分类表单发生提交行为的时候
$('#addCategory').on('submit', function() {
    // 获取用户在表单输入的内容
    var formData = $(this).serialize();
    // 添加分类接口
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function() {
            location.reload()
        }
    });
    return false;
});

// 将服务器的所有列表显示在页面
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        var html = template('categoryListTpl', {
            data: response
        });

        $('#categoryBox').html(html);
    }
});

// 根据id获取分类
$('#categoryBox').on('click', '.edit', function() {
    //获取被点击的用户的id
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(response) {
            // console.log(response);
            var html = template('modifyCategoryTpl', response);
            // console.log(html);
            $('#formBox').html(html);
        }
    });
})

// 修改分类
$('#formBox').on('submit', '#modifyCategory', function() {
    // 获取此id的分类信息
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function() {
            location.reload();
        },
        error: function() {
            alert('修改失败')
        }
    });

})

// 删除分类
$('#categoryBox').on('click', '.delete', function() {

    var isConfirm = confirm('您确定要删除此分类吗?');
    if (isConfirm) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function() {
                location.reload();
            }
        });
    }

})