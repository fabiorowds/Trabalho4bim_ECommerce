
angular.module('gamesCommerce').controller('NewPedidoItensController', function ($scope, $location, locationParser, PedidoItensResource , PedidoResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.pedidoItens = $scope.pedidoItens || {};
    
    $scope.pedidoList = PedidoResource.queryAll(function(items){
        $scope.pedidoSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("pedidoSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.pedidoItens.pedido = {};
            $scope.pedidoItens.pedido.id = selection.value;
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/PedidoItens/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        PedidoItensResource.save($scope.pedidoItens, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/PedidoItens");
    };
});