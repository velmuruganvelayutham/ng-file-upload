'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version',
    'ngFileUpload'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/view1'
    });
}]).controller('myCtrl', ['$scope', 'Upload', function($scope, Upload) {
    $scope.onFileSelect = function($files) {
        $scope.message = ""
            //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            Upload.upload({
                url: 'http://127.0.0.1:8080/portal/file/upload',
                method: 'PUT',
                data: {
                    file: $file,
                    'size': $file.size,
                    'access-key': 'f96213d013744fd69f43e29dcb1142e3',
                    'bucket': 'r11'
                },
                progress: function(e) {
                    $scope.message = 'file is being uploaded! '
                }
            }).then(function(data, status, headers, config) {
                // file is uploaded successfully
                console.log(data);
                $scope.message = 'file uploaded successfully'
            });
        }
    }
}]);;
