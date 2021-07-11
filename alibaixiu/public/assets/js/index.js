// 获取文章的数量
$.ajax({
    url: '/posts/count',
    type: 'get',
    success: function(response) {
        $('#post').html('<strong>' + response.postCount + '</strong>篇文章 (<strong>' + response.draftCount + '</strong>篇草稿)')
    }
});

// 获取分类
$.ajax({
    type: 'get',
    url: '/categories/count',
    success: function(response) {
        $('#category').html('<strong>' + response.categoryCount + '</strong>个分类')
    }
});

// 评论数量
$.ajax({
    type: 'get',
    url: '/comments/count',
    success: function(response) {
        $('#comment').html('<strong>' + response.commentCount + '</strong>条评论')
    }
});