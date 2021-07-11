// 向服务器端发送请求 获取文章列表数据
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(response) {
        console.log(response);
        var html = template('postsTpl', response);
        // console.log(html);
        $('#postsBox').html(html);
        // 分页
        var page = template('pageTpl', response);
        $('#page').html(page);
    }
});


// 分页
function changePage(page) {
    // 向服务器端发送请求 获取文章列表数据
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function(response) {
            console.log(response);
            var html = template('postsTpl', response);
            // console.log(html);
            $('#postsBox').html(html);
            // 分页
            var page = template('pageTpl', response);
            $('#page').html(page);
        }
    });
}

// 文章分类
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        var html = template('categoryTpl', {
            data: response
        });
        $('#categoryBox').html(html);
    }
});

// 文章分类和状态的表单
$('#filterForm').on('submit', function() {

    var formData = $(this).serialize();

    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function(response) {
            console.log(response);
            var html = template('postsTpl', response);
            // console.log(html);
            $('#postsBox').html(html);
            // 分页
            var page = template('pageTpl', response);
            $('#page').html(page);
        }
    });

    return false;
});

// 删除文章
$('#postsBox').on('click', '.delete', function() {
    // 弹出确认框
    if (confirm('确定要删除吗?')) {
        var id = $(this).attr('data-id');

        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function() {
                location.reload()
            }
        })
    }

});