// 当修改密码表单发生提交行为的时候
$('#modifyForm').on('submit', function() {

    // 获取修改列表输入的内容
    var formData = $(this).serialize();

    // 修改密码接口
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function() {
            location.href = '/admin/login.html'
        }
    });

    return false;
})