// 每次调用 $.get() 或者 $.post 或者 $.ajax() 的时候会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajaxt提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的ajax请求之前统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url);

    // 统一为有权限的接口设置 headers 请求头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载 complete 函数
    options.complete = function (res) {
        // 在 complete 回调函数中可以使用 responseJSON 拿到服务器相应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页
            location.href = '/login.html'
        }
    }
})