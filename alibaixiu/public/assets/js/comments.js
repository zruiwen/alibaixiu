// 向服务器端发送请求 获取评论列表数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function(response) {
        var html = template('commentsTpl', response);
        $('#commentsBox').html(html);

        var page = template('pageTpl', response);
        $('#pageBox').html(page);
    }
});

// 分页
function changePage(page) {
    // 向服务器端发送请求 获取评论列表数据
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function(response) {
            var html = template('commentsTpl', response);
            $('#commentsBox').html(html);

            var page = template('pageTpl', response);
            $('#pageBox').html(page);
        }
    });
}

// 评论审核
$('#commentsBox').on('click', '.status', function() {
    // 获取当前状态
    var status = $(this).attr('data-status');
    var id = $(this).attr('data-id');

    $.ajax({
        url: '/comments/' + id,
        type: 'put',
        data: {
            // 状态是0时变成1 是1时变成0
            status: status == 0 ? 1 : 0
        },
        success: function() {
            location.reload();
        }
    });

});

// 评论删除
$('#commentsBox').on('click', '.delete', function() {
    if (confirm('确定要删除吗?')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function() {
                location.reload();
            }
        });
    }
});