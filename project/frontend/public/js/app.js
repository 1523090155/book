// 创建AngularJS应用
var app = angular.module('bookmarkApp', []);

// 定义新的服务端地址
const SERVER_URL = 'http://140.82.5.217:3000';

// 创建认证控制器
app.controller('AuthController', ['$scope', '$http', function($scope, $http) {
    // 初始化变量
    $scope.username = '';
    $scope.password = '';
    $scope.message = '';
    $scope.isLoggedIn = false;
    $scope.bookmarks = [];

    // 登录函数
    $scope.login = function() {
        if (!$scope.username || !$scope.password) {
            $scope.message = '用户名和密码不能为空';
            return;
        }

        $http.post(`${SERVER_URL}/login`, {
            username: $scope.username,
            password: $scope.password
        })
        .then(function(response) {
            if (response.data.userId) {
                localStorage.setItem('userId', response.data.userId);
                $scope.isLoggedIn = true;
                $scope.message = '';
                $scope.loadBookmarks(response.data.userId);
            } else {
                $scope.message = response.data.error || '登录失败，请重试';
            }
        })
        .catch(function(error) {
            console.error('请求失败:', error);
            $scope.message = '网络错误，请稍后再试';
        });
    };

    // 加载书签函数
    $scope.loadBookmarks = function(userId) {
        $http.get(`${SERVER_URL}/bookmarks/${userId}`)
        .then(function(response) {
            $scope.bookmarks = response.data;
        })
        .catch(function(error) {
            console.error('加载书签失败:', error);
            $scope.message = '无法加载书签，请稍后再试';
        });
    };

    // 登出函数
    $scope.logout = function() {
        localStorage.removeItem('userId');
        $scope.isLoggedIn = false;
        $scope.username = '';
        $scope.password = '';
        $scope.message = '';
        $scope.bookmarks = [];
        alert('已成功登出');
    };

    // 页面加载时检查登录状态
    var userId = localStorage.getItem('userId');
    if (userId) {
        $scope.isLoggedIn = true;
        $scope.loadBookmarks(userId);
    }
}]);