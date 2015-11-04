

angular.module('gamesCommerce').controller('EditProdutoController', function($scope, $routeParams, $location, ProdutoResource , PedidoResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.produto = new ProdutoResource(self.original);
            PedidoResource.queryAll(function(items) {
                $scope.pedidosSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.produto.pedidos){
                        $.each($scope.produto.pedidos, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.pedidosSelection.push(labelObject);
                                $scope.produto.pedidos.push(wrappedObject);
                            }
                        });
                        self.original.pedidos = $scope.produto.pedidos;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Produtos");
        };
        ProdutoResource.get({ProdutoId:$routeParams.ProdutoId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.produto);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.produto.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Produtos");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Produtos");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.produto.$remove(successCallback, errorCallback);
    };
    
    $scope.pedidosSelection = $scope.pedidosSelection || [];
    $scope.$watch("pedidosSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.produto) {
            $scope.produto.pedidos = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.produto.pedidos.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});