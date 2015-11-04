angular.module('gamesCommerce').factory('PedidoResource', function($resource){
    var resource = $resource('rest/pedidos/:PedidoId',{PedidoId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});