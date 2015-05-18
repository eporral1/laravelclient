/**
 * Main AngularJS Web Application
 */
var app = angular.module('eporralApp', [
    'ngRoute','ngCookies','ngFileUpload'
]);



/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    // Home
        .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Blog
        .when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
        .when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl"})
    // else 404
        .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);



// run blocks
app.run(function($rootScope) {
    // you can inject any instance here
    $rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
    });

});

app.run(function($http, $cookies) {
    // alert($cookies.csrftoken)
    // $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
});

/**
 * Controls the Blog
 */
app.controller('BlogCtrl', function (/* $scope, $location, $http */) {
    console.log("Blog Controller reporting for duty.");
});

/**
 * Controls all other Pages
 */
app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    //  $httpProvider.defaults.headers.common['X-CSRF-TOKEN'] = $('meta[name=csrf-token]').attr('content');
}])




app.controller('PageCtrl', function ($scope, $location, $http ) {

    $scope.edit = "v";
    $scope.END_POINT  = "http://localhost:8989/";
    //$scope.END_POINT  = "http://laravelapi0.herokuapp.com/";
    
    bootbox.setDefaults({
        locale: "es",
        show: true,
        backdrop: true,
        closeButton: true,
        animate: true
    }); 
    
    $scope.getPlayers = function(){
        $http({method: 'GET', url: $scope.END_POINT + 'players'})
            .success(function(data) {
                $scope.players = data;
        })
    }
    
    $scope.getPlayer = function(id){
        $http({method: 'GET', url: $scope.END_POINT + 'players/' + id})
            .success(function(data) {
                $scope.currentPlayer = data;
                $http({method: 'GET', url: $scope.END_POINT + 'picture/' + id})
                    .success(function(data1) {
                        $scope.currentPicture = data1;
                        $scope.edit = "e";  
                })
        })
    }
    
    $scope.editPlayer = function(){
        var d = new Object();  
        d.id = $scope.currentPlayer.id;
        d.name = $scope.currentPlayer.name;
        d.dorsal = $scope.currentPlayer.dorsal;
        d.position = $scope.currentPlayer.position;    
        //d = $base64.encode(JSON.stringify(d));
        d = JSON.stringify(d);
        
        $http({method: 'PUT', url: $scope.END_POINT + 'players/' + d})
            .success(function(data) {  
            bootbox.alert("Player has been updated", function() {});
            $scope.edit = "v"; 
            $scope.getPlayers();   
        })
    }
    
    
    $scope.addPlayer = function(){
        var d = new Object();           
        d.name = $scope.currentPlayer.name;
        d.dorsal = $scope.currentPlayer.dorsal;
        d.position = $scope.currentPlayer.position;
        //d = $base64.encode(JSON.stringify(d));
        d = JSON.stringify(d);
        
        $http({method: 'POST', url: $scope.END_POINT + 'players/' + d})
            .success(function(data) {  
            bootbox.alert("Player has been added", function() {});
            $scope.edit = "v"; 
            $scope.getPlayers();   
        })
    } 
    
    $scope.deletePlayer = function(id){    
        bootbox.confirm("Are you sure?", function(result) {
            if(result){
                $http({method: 'DELETE', url: $scope.END_POINT + 'players/' + id})
                    .success(function(data) {  
                        $scope.getPlayers();
                })
            }
        });
    }
    
    $scope.post = function(){
        $http({method: 'POST', url: $scope.END_POINT + 'post'
            /*, headers: {'Authorization': 'Basic ' + btoa("admin:123456")}*/,params: {author: 'flea'}}).success(
            function(data) {
            })
    }
    
    $scope.cancel = function(){
        $scope.edit = "v";
    }

    $scope.setNew = function(){
        $scope.edit = "n";
        if($scope.currentPlayer != null){
            $scope.currentPlayer.name = "";
            $scope.currentPlayer.dorsal = "";
            $scope.currentPlayer.position = "";
        }
    }
   
     $scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ' + JSON.stringify(file));
        var uploadUrl = "http://localhost:8989/upload";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };
    
    $scope.getPlayers();
    
    
    

});

//inject angular file upload directives and services.
//var app = angular.module('fileUpload', ['ngFileUpload']);
/*
app.controller('MyCtrl', ['$scope', 'Upload', function ($scope, Upload) {
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.log = '';

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: 'http://localhost:8989/upload',
                   /* fields: {
                        'username': $scope.username
                    },*/
                /*    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage + '% ' +
                                evt.config.file.name + '\n' + $scope.log;
                }).success(function (data, status, headers, config) {
                    $scope.log = 'file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                  //  $scope.$apply();
                });
            }
        }
    };
}]);
 


/*
    $scope.testpost = function(){
        $http({
            // url: 'http://local.silexapi:8888/crear-comentario.json?p=' + btoa('{"author":"payments"}'),
            //  url: 'http://127.0.0.1/silexapi/web/crear-comentario.json'/*?p=' + btoa('{"author":"payments"}'),
            //     url: 'http://127.0.0.1/silexapi/web/index.php/ver-comentarios.json'/*?p=' +
            btoa('{"author":"payments"}'),,
            // url: 'https://silexapi.herokuapp.com/ver-comentarios.json'/*?p=' + btoa('{"author":"payments"}'),
            //   url: 'https://silexapi.herokuapp.com/ver-comentarios.json'/*?p=' + btoa('{"author":"payments"}'),
            //  url: 'http://localhost/aaa',
            //url: 'http://local.silexapi:8888/ver-comentarios.json',
            //method: 'GET',
            //  withCredentials: true,
            // data: "[{'author':'aaaa'}]",
            /*    //   params: {author: 'flea',comment:'lalala'},
            /*     headers: {'Authorization': 'Basic ' + btoa("admin:123456")}
        })
            .then(function(response) {
            // success
        }, 
                  function(response) { // optional
            // failed
        });
    }
*/
