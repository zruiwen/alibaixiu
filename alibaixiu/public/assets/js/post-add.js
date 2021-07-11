// 向服务器端发送请求 获取文章分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        var html = template('categoryTpl', {
            data: response
        })
        $('#category').html(html);
    }
});

// 文件封面上传
$('#feature').on('change', function() {
    // 获取到管理员选择到的文件
    var file = this.files[0];
    // 创建formdata对象 实现二进制文件上传
    var formData = new FormData();
    // 把选择到的file追加到formData中
    formData.append('cover', file);

    $.ajax({
        url: '/upload',
        type: 'post',
        data: formData,
        // 不要处理data属性对应的参数
        processData: false,
        // 不要设置参数类型
        contentType: false,
        success: function(response) {
            $('#thumbnail').val(response[0].cover);
        }
    });
});

// 文章添加
$('#addForm').on('submit', function() {

    // 获取输入的内容
    var formData = $(this).serialize();

    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function() {
            location.href = '/admin/posts.html'
        },
        error: function() {
            alert('文章添加失败');
        }
    })

    return false;
});


// 获取浏览器地址栏id
var id = getUrlParams('id');
// 当管理员在做修改
if (id != -1) {
    $.ajax({
        url: '/posts/' + id,
        type: 'get',
        success: function(response) {
            $.ajax({
                url: '/categories',
                type: 'get',
                success: function(categories) {
                    response.categories = categories;
                    // console.log(response);
                    var html = template('modifyTpl', response);
                    // console.log(html);
                    $('#parentBox').html(html);
                }
            })

        }
    })
}
// 从浏览器地址栏获取参数
function getUrlParams(name) {
    // search里面存储的就是地址栏参数
    var paramsAry = location.search.substr(1).split('&');
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    // 找不到时
    return -1;
}

// 修改表单的提交
$('#parentBox').on('submit', '#modifyForm', function() {

    // 获取输入的内容
    var formData = $(this).serialize();
    // 获取修改的文字的id
    var id = $(this).attr('data-id');

    $.ajax({
        url: '/posts/' + id,
        type: 'put',
        data: formData,
        success: function() {
            location.href = '/admin/posts.html'
        }
    });

    return false;
});