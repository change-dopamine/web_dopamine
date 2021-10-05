$(function () {
    var form = layui.form
    var layer = layui.layer
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

    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 校验原密码与新密码是否一致
        samepwd: function (value) {
            // 通过形参拿到的是确定密码框中的内容,还需要拿到密码框中的内容,然后进行一次等于的判断,如果判断失败,则return提示消息即可
            var pwd = $('#oldpwd').val();
            if (pwd === value) {
                return "新密码与原密码不可相同"
            }
        },
        // 校验两次输入密码是否一致
        repwd: function (value) {
            // 通过形参拿到的是确定密码框中的内容,还需要拿到密码框中的内容,然后进行一次等于的判断,如果判断失败,则return提示消息即可
            var pwd = $('#firstpwd').val();
            if (pwd !== value) {
                return "两次密码不一致"
            }
        }
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败')
                }
                layer.msg('更新密码成功')
                // 原生 js 重置表单方法
                $('.layui-form')[0].reset()
            }
        })
    })
})