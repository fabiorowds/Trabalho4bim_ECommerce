
angular.module('gamesCommerce').controller('NewPedidoController', function ($scope, $location, locationParser, PedidoResource , UsuarioResource, PedidoItensResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.pedido = $scope.pedido || {};
    
    $scope.usuarioList = UsuarioResource.queryAll(function(items){
        $scope.usuarioSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("usuarioSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.pedido.usuario = {};
            $scope.pedido.usuario.id = selection.value;
        }
    });
    
    $scope.itemPedidoList = PedidoItensResource.queryAll(function(items){
        $scope.itemPedidoSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("itemPedidoSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.pedido.itemPedido = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.pedido.itemPedido.push(collectionItem);
            });
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Pedidos/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        PedidoResource.save($scope.pedido, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Pedidos");
    };
});