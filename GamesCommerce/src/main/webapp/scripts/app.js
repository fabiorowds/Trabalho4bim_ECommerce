'use strict';

angular.module('gamesCommerce',['ngRoute','ngResource'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/',{templateUrl:'views/landing.html',controller:'LandingPageController'})
      .when('/Pedidos',{templateUrl:'views/Pedido/search.html',controller:'SearchPedidoController'})
      .when('/Pedidos/new',{templateUrl:'views/Pedido/detail.html',controller:'NewPedidoController'})
      .when('/Pedidos/edit/:PedidoId',{templateUrl:'views/Pedido/detail.html',controller:'EditPedidoController'})
      .when('/PedidoItens',{templateUrl:'views/PedidoItens/search.html',controller:'SearchPedidoItensController'})
      .when('/PedidoItens/new',{templateUrl:'views/PedidoItens/detail.html',controller:'NewPedidoItensController'})
      .when('/PedidoItens/edit/:PedidoItensId',{templateUrl:'views/PedidoItens/detail.html',controller:'EditPedidoItensController'})
      .when('/Produtos',{templateUrl:'views/Produto/search.html',controller:'SearchProdutoController'})
      .when('/Produtos/new',{templateUrl:'views/Produto/detail.html',controller:'NewProdutoController'})
      .when('/Produtos/edit/:ProdutoId',{templateUrl:'views/Produto/detail.html',controller:'EditProdutoController'})
      .when('/Usuarios',{templateUrl:'views/Usuario/search.html',controller:'SearchUsuarioController'})
      .when('/Usuarios/new',{templateUrl:'views/Usuario/detail.html',controller:'NewUsuarioController'})
      .when('/Usuarios/edit/:UsuarioId',{templateUrl:'views/Usuario/detail.html',controller:'EditUsuarioController'})
      .otherwise({
        redirectTo: '/'
      });
  }])
  .controller('LandingPageController', function LandingPageController() {
  })
  .controller('NavController', function NavController($scope, $location) {
    $scope.matchesRoute = function(route) {
        var path = $location.path();
        return (path === ("/" + route) || path.indexOf("/" + route + "/") == 0);
    };
  });
