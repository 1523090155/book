document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const message = document.getElementById('message');
    
    try {
        const response = await fetch('/api/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(new FormData(form))
        });

        const data = await response.json();
        
        if (data.success) {
            checkAuthStatus();
        } else {
            showMessage(data.error || '登录失败', 'error');
        }
    } catch (error) {
        showMessage('网络请求失败', 'error');
    }
});

async function checkAuthStatus() {
    try {
        const response = await fetch('/api/bookmarks.php', {
            credentials: 'include'
        });
        
        if (response.ok) {
            const bookmarks = await response.json();
            renderBookmarks(bookmarks);
            document.getElementById('loginBox').classList.add('hidden');
            document.getElementById('bookmarks').classList.remove('hidden');
        }
    } catch (error) {
        // 未登录状态不处理
    }
}

function renderBookmarks(bookmarks) {
    const container = document.getElementById('bookmarkList');
    container.innerHTML = bookmarks.map(bookmark => `
        <div class="card">
            <a href="${bookmark.url}" target="_blank">
                <div class="card-icon">📌</div>
                <div class="card-content">
                    <div class="card-title">${bookmark.title}</div>
                    <div class="card-desc">${bookmark.url}</div>
                </div>
            </a>
        </div>
    `).join('');
}

async function logout() {
    await fetch('/api/logout.php', { credentials: 'include' });
    location.reload();
}

function showMessage(text, type = 'info') {
    const message = document.getElementById('message');
    message.textContent = text;
    message.className = `message ${type}`;
    setTimeout(() => message.textContent = '', 3000);
}

// 初始化检查登录状态
checkAuthStatus();
