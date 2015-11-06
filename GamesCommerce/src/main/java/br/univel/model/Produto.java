package br.univel.model;

import javax.persistence.Entity;
import java.io.Serializable;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.Version;
import java.lang.Override;
import java.util.Set;
import java.util.HashSet;
import br.univel.model.Pedido;
import javax.persistence.ManyToMany;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class Produto implements Serializable
{

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   @Column(name = "id", updatable = false, nullable = false)
   private Long id;
   @Version
   @Column(name = "version")
   private int version;

   @Column(nullable = false)
   private String descricao;

   @Column(nullable = false)
   private String nome;

   @Column(nullable = false)
   private double valor;

   @Column(nullable = false)
   private String estoque;

   @Column
   private String imagem;

   @ManyToMany
   private Set<Pedido> pedidos = new HashSet<Pedido>();

   @Column
   private int quantidade;

   public Long getId()
   {
      return this.id;
   }

   public void setId(final Long id)
   {
      this.id = id;
   }

   public int getVersion()
   {
      return this.version;
   }

   public void setVersion(final int version)
   {
      this.version = version;
   }

   @Override
   public boolean equals(Object obj)
   {
      if (this == obj)
      {
         return true;
      }
      if (!(obj instanceof Produto))
      {
         return false;
      }
      Produto other = (Produto) obj;
      if (id != null)
      {
         if (!id.equals(other.id))
         {
            return false;
         }
      }
      return true;
   }

   @Override
   public int hashCode()
   {
      final int prime = 31;
      int result = 1;
      result = prime * result + ((id == null) ? 0 : id.hashCode());
      return result;
   }

   public String getDescricao()
   {
      return descricao;
   }

   public void setDescricao(String descricao)
   {
      this.descricao = descricao;
   }

   public String getNome()
   {
      return nome;
   }

   public void setNome(String nome)
   {
      this.nome = nome;
   }

   public double getValor()
   {
      return valor;
   }

   public void setValor(double valor)
   {
      this.valor = valor;
   }

   public String getEstoque()
   {
      return estoque;
   }

   public void setEstoque(String estoque)
   {
      this.estoque = estoque;
   }

   public String getImagem()
   {
      return imagem;
   }

   public void setImagem(String imagem)
   {
      this.imagem = imagem;
   }

   public Set<Pedido> getPedidos()
   {
      return this.pedidos;
   }

   public void setPedidos(final Set<Pedido> pedidos)
   {
      this.pedidos = pedidos;
   }

   public int getQuantidade()
   {
      return quantidade;
   }

   public void setQuantidade(int quantidade)
   {
      this.quantidade = quantidade;
   }

   @Override
   public String toString()
   {
      String result = getClass().getSimpleName() + " ";
      if (descricao != null && !descricao.trim().isEmpty())
         result += "Descricao: " + descricao;
      if (nome != null && !nome.trim().isEmpty())
         result += ", Nome: " + nome;
      result += ", Valor: " + valor;
      if (estoque != null && !estoque.trim().isEmpty())
         result += ", Estoque: " + estoque;
      if (imagem != null && !imagem.trim().isEmpty())
         result += ", imagem: " + imagem;
      result += ", quantidade: " + quantidade;
      return result;
   }
}