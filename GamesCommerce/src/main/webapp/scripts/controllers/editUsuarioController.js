

angular.module('gamesCommerce').controller('EditUsuarioController', function($scope, $routeParams, $location, UsuarioResource , PedidoResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.usuario = new UsuarioResource(self.original);
            PedidoResource.queryAll(function(items) {
                $scope.pedidoSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.usuario.pedido){
                        $.each($scope.usuario.pedido, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.pedidoSelection.push(labelObject);
                                $scope.usuario.pedido.push(wrappedObject);
                            }
                        });
                        self.original.pedido = $scope.usuario.pedido;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Usuarios");
        };
        UsuarioResource.get({UsuarioId:$routeParams.UsuarioId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.usuario);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.usuario.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Usuarios");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Usuarios");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.usuario.$remove(successCallback, errorCallback);
    };
    
    $scope.pedidoSelection = $scope.pedidoSelection || [];
    $scope.$watch("pedidoSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.usuario) {
            $scope.usuario.pedido = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.usuario.pedido.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});