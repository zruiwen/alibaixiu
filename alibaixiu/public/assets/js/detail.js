// 从地址栏中获取文章id
var postId = getUrlParams('id');
// 评论是否经过人工审核
var review;
// 向服务器端发送请求 根据文章id获取文章详细信息
$.ajax({
    url: '/posts/' + postId,
    type: 'get',
    success: function(response) {
        console.log(response);
        var html = template('postTpl', response);
        $('#article').html(html)
    }
});

// 点击赞
$('#article').on('click', '#like', function() {
    // 向服务器发送请求，执行点赞
    $.ajax({
        type: 'post',
        url: '/posts/fabulous/' + postId,
        success: function() {
            alert('点赞成功')
        }
    });
});

// 评论区
$.ajax({
    type: 'get',
    url: '/settings',
    success: function(response) {
        // 获取是否经过人工审核
        review = response.review
            // console.log(response);
        if (response.comment) {
            //管理员开启了评论模板
            var html = template('commentTpl');
            $('#comment').html(html);
        }
    }
});

// 提交评论
$('#comment').on('submit', 'form', function() {
    // 获取输入的评论内容
    var content = $(this).find('textarea').val();
    var state;

    if (review) {
        // 要经过人工审核
        state = 0;
    } else {
        state = 1;
    }
    $.ajax({
        url: '/comments',
        type: 'get',
        data: {
            content: content,
            post: postId,
            state: state
        },
        success: function() {
            alert('成功')
            location.reload();
        },
        error: function() {
            alert('失败')
        }
    });


    return false;
});