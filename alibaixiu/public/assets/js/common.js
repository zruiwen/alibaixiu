$('#logout').on('click', function() {
    var isConfirm = confirm('您确定要退出吗?');
    if (isConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function() {
                location.href = 'login.html';
            },
            error: function() {
                alert('退出失败');
            }
        });
    }
});

// 处理日期时间
function formateDate(date) {
    // 将日期字符串转换为日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

// 登陆用户的信息
$.ajax({
    url: '/users/' + userId,
    type: 'get',
    success: function(response) {
        $('.avatar').attr('src', response.avatar);
        $('.profile .name').html(response.nickName)
    }
});