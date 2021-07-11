// 当管理员选择logo图片时
$('#logo').on('change', function() {
    var file = this.files[0];

    var formData = new FormData();
    formData.append('logo', file);

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 不要处理data属性对应的参数
        processData: false,
        // 不要设置参数类型
        contentType: false,
        success: function(response) {
            $('#hiddenLogo').val(response[0].logo)
            $('#preview').attr('src', response[0].logo)
        }
    });
});

$('#settingsForm').on('submit', function() {
    // 获取表单内容
    var formData = $(this).serialize();

    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function() {
            location.reload();
        }
    });

    return false;
});

// 索要网站设置数据
$.ajax({
    type: 'get',
    url: '/settings',
    success: function(response) {
        if (response) {
            // 将logo地址存储在隐藏域
            $('#hiddenLogo').val(response.logo)
                // 将logo显示在页面
            $('#preview').attr('src', response.logo)
                // 将网站标题显示在页面
            $('input[name="title"]').val(response.title)
                // 将是否开启评论功能显示在页面
            $('input[name="comment"]').prop('checked', response.comment)
                // 将评论是否经过人工审核显示在页面
            $('input[name="review"]').prop('checked', response.review)
        }
    }
});