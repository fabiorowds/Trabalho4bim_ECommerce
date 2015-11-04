angular.module('gamesCommerce').factory('PedidoItensResource', function($resource){
    var resource = $resource('rest/pedidoitens/:PedidoItensId',{PedidoItensId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});