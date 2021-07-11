// 当管理员选择文件的时候
$('#file').on('change', function() {
    // 获取选择的文件
    var file = this.files[0];
    // 创建一个FormData
    var formData = new FormData();
    // 将选择的文件添加到formData
    formData.append('image', file);

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 不要处理data属性对应的参数
        processData: false,
        // 不要设置参数类型
        contentType: false,
        success: function(response) {
            $('#image').val(response[0].image);
        }
    });
});

// 轮播图添加
$('#slidesForm').on('submit', function() {
    // 获取表单内容
    var formData = $(this).serialize();

    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function() {
            location.reload();
        }
    });

    return false;
});

// 显示在页面
$.ajax({
    type: 'get',
    url: '/slides',
    success: function(response) {
        var html = template('slidesTpl', {
            data: response
        })
        $('#slidesBox').html(html);
    }
});

// 删除轮播图
$('#slidesBox').on('click', '.delete', function() {
    if (confirm('确定要删除吗?')) {
        var id = $(this).attr('data-id');

        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function() {
                location.reload();
            }
        })
    }
});