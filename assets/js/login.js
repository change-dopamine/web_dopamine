$(function () {
    // 点击去注册账号的链接
    $('#link_reg').on('click', () => {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击登录账号的链接
    $('#link_login').on('click', () => {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 点击显示隐藏密码
    var flag = 0;
    $('.switch_eye').on('click', function () {
        if (flag == 0) {
            $(this).siblings('input').prop("type", "text")
            $(this).removeClass('icon-eye-blocked')
            $(this).addClass('icon-eye')
            flag = 1
        } else {
            $(this).siblings('input').prop("type", "password")
            $(this).removeClass('icon-eye')
            $(this).addClass('icon-eye-blocked')
            flag = 0
        }
    })

    // 从 layui 中获取 form 对象
    var form = layui.form;
    var layer = layui.layer
    // 通过 form.verify() 函数来自定义校验规则
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        },
        // 自定义了一个叫 pwd 的校验规则
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次输入密码是否一致
        repwd: function (value) {
            // 通过形参拿到的是确定密码框中的内容,还需要拿到密码框中的内容,然后进行一次等于的判断,如果判断失败,则return提示消息即可
            var pwd = $('#firstpwd').val();
            if (pwd !== value) {
                return "两次密码不一致"
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 1. 阻止默认提交行为
        e.preventDefault();
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        // 2. 发起 ajax 的 post 请求
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message, { icon: 2 });
            }
            layer.msg('注册成功请登录', { icon: 1 });
            // 模拟人的点击行为
            $('#link_login').click();
        })
    })
    // 监听登录表单的提交事件

    $('#form_login').submit(function (e) {
        // 1. 阻止默认提交行为
        e.preventDefault();
        // 2. 发起 ajax 的 post 请求
        $.ajax({
            method: 'POST',
            url: '/api/login',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 2 });
                }
                layer.msg('登录成功欢迎你！', { icon: 1 });
                // 将登录成功得到的 token 字符串保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})