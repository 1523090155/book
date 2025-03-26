// auth.js - 身份验证相关的JavaScript代码

// 等待DOM内容加载完成后执行以下代码
document.addEventListener('DOMContentLoaded', () => {
    // 获取页面中的元素引用
    const loginForm = document.getElementById('loginForm');        // 登录表单
    const messageDiv = document.getElementById('message');          // 显示消息的区域
    const bookmarksDiv = document.getElementById('bookmarks');      // 书签列表区域
    const logoutBtn = document.querySelector('.logout-btn');        // 退出登录按钮

    // 监听登录表单的提交事件
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // 阻止表单的默认提交行为

        // 使用FormData对象收集表单数据
        const formData = new FormData(loginForm);
        const username = formData.get('username'); // 获取用户名
        const password = formData.get('password'); // 获取密码

        // 使用Fetch API发送POST请求到登录API
        try {
            const response = await fetch('api/login.php', {
                method: 'POST', // 请求方法
                headers: {
                    'Content-Type': 'application/json', // 设置请求头，指定内容类型为JSON
                },
                body: JSON.stringify({ username, password }), // 将表单数据转换为JSON字符串并作为请求体发送
            });

            // 处理响应数据
            if (response.ok) { // 如果响应状态码表示成功
                const data = await response.json(); // 将响应体解析为JSON对象
                if (data.success) { // 如果登录成功
                    // 更新页面元素：显示书签列表，隐藏登录表单，显示成功消息
                    bookmarksDiv.classList.remove('hidden');
                    loginForm.classList.add('hidden');
                    messageDiv.textContent = '登录成功！';
                    messageDiv.style.color = 'green';

                    // 可以在这里添加保存用户信息到localStorage或sessionStorage的逻辑
                } else { // 如果登录失败
                    // 显示错误信息
                    messageDiv.textContent = data.message;
                    messageDiv.style.color = 'red';
                }
            } else { // 如果响应状态码表示失败
                // 显示错误信息
                messageDiv.textContent = '登录请求失败，请稍后再试。';
                messageDiv.style.color = 'red';
            }
        } catch (error) { // 捕获并处理请求中的错误
            console.error('登录请求发生错误：', error);
            messageDiv.textContent = '登录请求发生错误，请稍后再试。';
            messageDiv.style.color = 'red';
        }
    });

    // 监听退出登录按钮的点击事件
    logoutBtn.addEventListener('click', async () => {
        try {
            // 使用Fetch API发送POST请求到退出登录API
            const response = await fetch('api/logout.php', {
                method: 'POST', // 请求方法
            });

            if (response.ok) { // 如果响应状态码表示成功
                // 退出登录成功，可以重定向到登录页面或显示登录表单
                window.location.href = 'index.html'; // 假设登录页面是index.html
                // 或者可以使用JavaScript来显示登录表单并隐藏书签列表（根据实际需求选择）
                // loginForm.classList.remove('hidden');
                // bookmarksDiv.classList.add('hidden');
                // messageDiv.textContent = '您已成功退出登录。';
                // messageDiv.style.color = 'green';
            } else { // 如果响应状态码表示失败
                // 显示错误信息（这里可以根据实际情况处理）
                messageDiv.textContent = '退出登录请求失败，请稍后再试。';
                messageDiv.style.color = 'red';
            }
        } catch (error) { // 捕获并处理请求中的错误
            console.error('退出登录请求发生错误：', error);
            messageDiv.textContent = '退出登录请求发生错误，请稍后再试。';
            messageDiv.style.color = 'red';
        }
    });
});