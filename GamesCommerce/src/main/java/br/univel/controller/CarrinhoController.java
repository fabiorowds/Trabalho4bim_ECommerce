package br.univel.controller;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import br.univel.model.Carrinho;
import br.univel.model.Pedido;
import br.univel.model.PedidoItens;
import br.univel.model.Produto;
import br.univel.rest.PedidoEndpoint;
import br.univel.rest.ProdutoEndpoint;

@RequestScoped
public class CarrinhoController {

	@Inject
	private Carrinho carrinho;
	@Inject
	private ProdutoEndpoint prodEnd;
	@Inject
	private PedidoEndpoint pedEnd;
	
	@Path("/adicionar/{id:[0-9][0-9]*}")
	public void adicionarProduto(@PathParam("id") long id) {
		Produto p = prodEnd.findById(id).readEntity(Produto.class);
		carrinho.getProdutos().add(p);
	}
	
	public void limpar(){
		carrinho.limpar();
	}
	
	public void finalizar() {
		Pedido ped = new Pedido();
		for (Produto prod : carrinho.getProdutos()) {
			PedidoItens pi = new PedidoItens();
			pi.setDescProduto(prod.getDescricao());
			pi.setIdItem(prod.getId());
			pi.setQtdeItem(1);
			pi.setVlrProduto(prod.getValor());
			pi.setVlrTotal(pi.getQtdeItem() * pi.getVlrProduto());
			pi.setPedido(ped);
			if (ped.getItemPedido().contains(prod)){
				PedidoItens piTmp = ped.getItemPedido().stream().filter(e -> e.equals(prod)).findFirst().get();
				piTmp.setQtdeItem(piTmp.getQtdeItem() + pi.getQtdeItem());
				piTmp.setVlrTotal(piTmp.getQtdeItem() + piTmp.getVlrProduto());
			} else {
				ped.getItemPedido().add(pi);				
			}
		}
		
		pedEnd.create(ped);
	}
	
	public void removerProduto(Produto p) {
		carrinho.getProdutos().remove(p);
	}
}
