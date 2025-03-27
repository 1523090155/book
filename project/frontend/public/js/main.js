// 登录处理
function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // 验证用户名和密码是否为空
    if (!username || !password) {
        alert('用户名和密码不能为空');
        return;
    }

    const loginButton = document.querySelector('button[type="submit"]');
    loginButton.disabled = true; // 禁用按钮防止重复提交

    // 向后端发送登录请求
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(async (response) => {
        const data = await response.json();
        if (response.ok && data.userId) {
            localStorage.setItem('userId', data.userId); // 存储用户ID
            document.getElementById('loginBox').classList.add('hidden');
            document.getElementById('bookmarkSection').classList.remove('hidden');
            loadBookmarks(data.userId); // 加载书签列表
        } else {
            document.getElementById('message').textContent = data.error || '登录失败，请重试';
        }
    })
    .catch((err) => {
        console.error('请求失败:', err);
        document.getElementById('message').textContent = '网络错误，请稍后再试';
    })
    .finally(() => {
        loginButton.disabled = false; // 恢复按钮状态
    });
}

// 加载书签列表
function loadBookmarks(userId) {
    const bookmarkList = document.getElementById('bookmarkList');

    // 清空当前书签
    bookmarkList.innerHTML = '';

    // 模拟向后端请求用户书签列表
    fetch(`http://localhost:3000/bookmarks?userId=${userId}`)
        .then((response) => response.json())
        .then((bookmarks) => {
            bookmarks.forEach((bookmark) => {
                const item = document.createElement('div');
                item.className = 'bookmark';
                item.innerHTML = `<a href="${bookmark.url}" target="_blank">${bookmark.title}</a>`;
                bookmarkList.appendChild(item);
            });
        })
        .catch((err) => {
            console.error('加载书签失败:', err);
            document.getElementById('message').textContent = '无法加载书签，请稍后再试';
        });
}

// 登出功能
function logout() {
    localStorage.removeItem('userId'); // 清除本地存储的用户ID
    document.getElementById('loginBox').classList.remove('hidden');
    document.getElementById('bookmarkSection').classList.add('hidden');
    alert('已成功登出');
}

// 页面加载时检查登录状态
document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
        document.getElementById('loginBox').classList.add('hidden');
        document.getElementById('bookmarkSection').classList.remove('hidden');
        loadBookmarks(userId); // 加载书签列表
    }
});
