

angular.module('gamesCommerce').controller('EditPedidoController', function($scope, $routeParams, $location, PedidoResource , UsuarioResource, PedidoItensResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.pedido = new PedidoResource(self.original);
            UsuarioResource.queryAll(function(items) {
                $scope.usuarioSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.pedido.usuario && item.id == $scope.pedido.usuario.id) {
                        $scope.usuarioSelection = labelObject;
                        $scope.pedido.usuario = wrappedObject;
                        self.original.usuario = $scope.pedido.usuario;
                    }
                    return labelObject;
                });
            });
            PedidoItensResource.queryAll(function(items) {
                $scope.itemPedidoSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.pedido.itemPedido){
                        $.each($scope.pedido.itemPedido, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.itemPedidoSelection.push(labelObject);
                                $scope.pedido.itemPedido.push(wrappedObject);
                            }
                        });
                        self.original.itemPedido = $scope.pedido.itemPedido;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Pedidos");
        };
        PedidoResource.get({PedidoId:$routeParams.PedidoId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.pedido);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.pedido.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Pedidos");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Pedidos");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.pedido.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("usuarioSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.pedido.usuario = {};
            $scope.pedido.usuario.id = selection.value;
        }
    });
    $scope.itemPedidoSelection = $scope.itemPedidoSelection || [];
    $scope.$watch("itemPedidoSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.pedido) {
            $scope.pedido.itemPedido = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.pedido.itemPedido.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});