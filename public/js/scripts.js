// scripts.js
document.addEventListener('DOMContentLoaded', async () => {
    const bookmarkListContainer = document.getElementById('bookmarkList'); // 获取书签列表的容器元素

    // 定义获取书签列表的函数
    async function fetchBookmarks() {
        try {
            const response = await fetch('api/bookmarks.php'); // 发送请求到后端API接口
            if (!response.ok) {
                throw new Error('获取书签列表失败');
            }

            const data = await response.json(); // 解析JSON响应数据
            if (data.success) {
                renderBookmarks(data.bookmarks); // 调用渲染书签列表的函数
            } else {
                alert(data.message); // 显示后端返回的错误消息
            }
        } catch (error) {
            alert('获取书签列表时发生错误：' + error.message); // 显示获取书签列表时发生的错误
        }
    }

    // 定义渲染书签列表的函数
    function renderBookmarks(bookmarks) {
        bookmarkListContainer.innerHTML = ''; // 清空书签列表容器的内容
        bookmarks.forEach(bookmark => {
            const bookmarkItem = document.createElement('div'); // 创建书签项的容器元素
            bookmarkItem.classList.add('bookmark-item'); // 添加CSS类以便应用样式

            const bookmarkLink = document.createElement('a'); // 创建书签的链接元素
            bookmarkLink.href = bookmark.url; // 设置链接的URL
            bookmarkLink.textContent = bookmark.title; // 设置链接的文本内容

            const deleteButton = document.createElement('button'); // 创建删除按钮元素
            deleteButton.textContent = '删除'; // 设置按钮的文本内容
            deleteButton.addEventListener('click', () => {
                // 添加点击删除按钮的事件监听器
                // 这里可以添加删除书签的逻辑，例如发送DELETE请求到后端API
                // 但在这个示例中，我们只是简单地移除DOM元素并显示一个提示框
                alert(`书签 "${bookmark.title}" 已删除（仅为示例，实际未发送删除请求）`);
                bookmarkItem.remove(); // 移除书签项的容器元素
            });

            bookmarkItem.appendChild(bookmarkLink); // 将书签的链接元素添加到书签项的容器元素中
            bookmarkItem.appendChild(deleteButton); // 将删除按钮元素添加到书签项的容器元素中

            bookmarkListContainer.appendChild(bookmarkItem); // 将书签项的容器元素添加到书签列表容器中
        });
    }

    // 调用获取书签列表的函数以加载书签数据
    fetchBookmarks();
});
