// 添加用户
$('#userForm').on('submit', function() {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // 向服务器发送请求 添加用户
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function() {
            //  添加成功 刷新页面
            location.reload();
        },
        error: function() {
            alert('添加失败')
        }
    });
    // 阻止表单默认提交行为
    return false;
});

// 上传头像
$('#modifyBox').on('change', '#avatar', function() {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 不要解析请求参数
        processData: false,
        // 不要设置请求参数类型
        contentType: false,
        success: function(response) {
            console.log(response);
            // 头像预览
            $('#preview').attr('src', response[0].avatar);
            // 放在隐藏表单 表单的type="hidden"
            $('#hiddenAvatar').val(response[0].avatar);
        }
    });
});

// 将数据库用户显示在页面
$.ajax({
    type: 'get',
    url: '/users',
    success: function(response) {
        var html = template('userTpl', {
            data: response
        });

        $('#userBox').html(html);
    }
});

// 根据id查询用户信息
$('#userBox').on('click', '.edit', function() {
    //获取被点击的用户的id
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(response) {
            // console.log(response);
            var html = template('modifyTpl', response);
            // console.log(html);
            $('#modifyBox').html(html);
        }
    });
});

// 修改用户信息
$('#modifyBox').on('submit', '#modifyForm', function() {
    // 获取此id用户的信息
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    // 向服务器发送请求 修改用户
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function() {
            //  添加成功 刷新页面
            location.reload();
        },
        error: function() {
            alert('修改失败')
        }
    });

    // 阻止默认提交行为
    return false;
})

// 删除用户
$('#userBox').on('click', '.delete', function() {
    // console.log(123);
    var isConfirm = confirm('您确定要删除此用户吗?');
    if (isConfirm) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function() {
                // 刷新页面
                location.reload()
            }
        });
    }
})

// 获取全选按钮
var selectAll = $('#selectAll');
// 获取批量删除
var deleteMany = $('#deleteMany');
// 全选按钮发生状态
selectAll.on('change', function() {
    // 获取全选按钮当前状态
    var status = $(this).prop('checked');

    // 批量删除按钮
    if (status) {
        // 显示
        deleteMany.show();
    } else {
        // 隐藏
        deleteMany.hide();
    }

    // 获取所有用户
    $('#userBox').find('input').prop('checked', status);
});

// 用户复选框发生状态
$('#userBox').on('change', '.userStatus', function() {
    // 判断选择状态的用户数量是否和总数一样
    // 总数
    var inputs = $('#userBox').find('input');
    // filter(':checked')是过滤了选择的出来
    if (inputs.length == inputs.filter(':checked').length) {
        selectAll.prop('checked', true);
    } else {
        selectAll.prop('checked', false);
    }

    // 如果有选择的状态
    if (inputs.filter(':checked').length > 0) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
});

// 批量删除
deleteMany.on('click', function() {
    var ids = [];
    // 获取选中复选框的
    var checkedUser = $('#userBox').find('input').filter(':checked');
    // 循环选中的
    checkedUser.each(function(index, element) {
        ids.push($(element).attr('data-id'));
    });

    if (confirm('您确定要批量删除吗?')) {
        $.ajax({
            type: 'delete',
            // join方法是将ids数值用-分割
            url: '/users/' + ids.join('-'),
            success: function() {
                location.reload()
            }
        });
    }
})