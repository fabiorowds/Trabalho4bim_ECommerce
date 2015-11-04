

angular.module('gamesCommerce').controller('EditPedidoItensController', function($scope, $routeParams, $location, PedidoItensResource , PedidoResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.pedidoItens = new PedidoItensResource(self.original);
            PedidoResource.queryAll(function(items) {
                $scope.pedidoSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.pedidoItens.pedido && item.id == $scope.pedidoItens.pedido.id) {
                        $scope.pedidoSelection = labelObject;
                        $scope.pedidoItens.pedido = wrappedObject;
                        self.original.pedido = $scope.pedidoItens.pedido;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/PedidoItens");
        };
        PedidoItensResource.get({PedidoItensId:$routeParams.PedidoItensId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.pedidoItens);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.pedidoItens.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/PedidoItens");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/PedidoItens");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.pedidoItens.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("pedidoSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.pedidoItens.pedido = {};
            $scope.pedidoItens.pedido.id = selection.value;
        }
    });
    
    $scope.get();
});