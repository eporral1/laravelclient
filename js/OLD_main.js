/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
var app = angular.module('eporralApp', [
  'ngRoute','ngCookies'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/latests_projects.html", controller: "PageCtrl"})
    // Pages
    .when("/work_experience", {templateUrl: "partials/work_experience.html", controller: "PageCtrl"})
    .when("/blog", {templateUrl: "partials/work_experience.html", controller: "PageCtrl"})
    .when("/faq", {templateUrl: "partials/faq.html", controller: "PageCtrl"})
    .when("/pricing", {templateUrl: "partials/pricing.html", controller: "PageCtrl"})
    .when("/services", {templateUrl: "partials/services.html", controller: "PageCtrl"})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
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
     //   $httpProvider.defaults.headers.common = 'Content-Type: application/json';
    
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
  //  $httpProvider.defaults.headers.common['X-CSRF-TOKEN'] = $('meta[name=csrf-token]').attr('content');
    }
])

app.controller('PageCtrl', function ($scope, $location, $http ) {
    
    var head = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
                'Access-Control-Allow-Headers':'X-CSRF-Token',
                'X-Random-Shit':'123123123'
            }
    
   /* var req =  headers:{
             /*   'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
                'X-Random-Shit':'123123123'"
            };
    
   $http.get('http://localhost:8000/api/movies',req)
        .success(function(data) {
            $scope.movies = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });*/
    
   /* $http({method: 'GET', url: 'http://local.silexapi:8888/web/index.php/ver-otro', headers: {'Authorization': 'Basic ' + btoa("admin:123456")}}) .success(function(data) {
            $scope.projects = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });*/
  /*   url: 'http://127.0.0.1/silexapi/web/crear-comentario.json',
            method: 'POST',
            params: {author: 'flea'},*/
    
   $scope.csrf = function(){
 //  alert($scope.csrf_token);
      $http({method: 'GET', url: 'http://localhost:8989/csrf'/*, headers: {'Authorization': 'Basic ' + btoa("admin:123456")}*/,params: {author: 'flea'}}) .success(function(data) {
            $scope.projects = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    
    }
   
    $scope.post = function(){
 //  $_token = csrf_token();
    //    alert($_token);
      $http({method: 'POST', url: 'http://localhost:8989/hello'/*, headers: {'Authorization': 'Basic ' + btoa("admin:123456")}*/,params: {author: 'flea'}}) .success(function(data) {
           // $scope.projects = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    
    }
    
    
    
  console.log("Page Controller reporting for duty.");

  // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });

  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })
});


/*
  $scope.testpost = function(){
        $http({
           /* url: 'http://local.silexapi:8888/crear-comentario.json?p=' + btoa('{"author":"payments"}'),*/
          //  url: 'http://127.0.0.1/silexapi/web/crear-comentario.json'/*?p=' + btoa('{"author":"payments"}')*/,
      //     url: 'http://127.0.0.1/silexapi/web/index.php/ver-comentarios.json'/*?p=' + btoa('{"author":"payments"}'),*/,
           // url: 'https://silexapi.herokuapp.com/ver-comentarios.json'/*?p=' + btoa('{"author":"payments"}')*/,
         //   url: 'https://silexapi.herokuapp.com/ver-comentarios.json'/*?p=' + btoa('{"author":"payments"}')*/,
            //  url: 'http://localhost/aaa',
           //url: 'http://local.silexapi:8888/ver-comentarios.json',
      //      method: 'GET',
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
    }*/
