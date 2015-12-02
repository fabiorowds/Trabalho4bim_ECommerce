package br.univel.model;

import java.io.Serializable;
import java.util.List;

public class Carrinho implements Serializable{

	private List<Produto> produtos;
	private Usuario usuario;
	
	public List<Produto> getProdutos() {
		return produtos;
	}
	public void setProdutos(List<Produto> produtos) {
		this.produtos = produtos;
	}
	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	public void limpar() {
		produtos.clear();
	}
	
}
