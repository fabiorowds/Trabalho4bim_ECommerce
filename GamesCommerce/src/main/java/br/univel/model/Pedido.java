package br.univel.model;

import javax.persistence.Entity;
import java.io.Serializable;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.Version;
import java.lang.Override;
import br.univel.model.Usuario;
import javax.persistence.ManyToOne;
import javax.persistence.FetchType;
import javax.persistence.CascadeType;
import br.univel.model.Produto;
import java.util.Set;
import java.util.HashSet;
import javax.persistence.ManyToMany;

@Entity
public class Pedido implements Serializable
{

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   @Column(name = "id", updatable = false, nullable = false)
   private Long id;
   @Version
   @Column(name = "version")
   private int version;

   @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
   private Usuario usuario;

   @ManyToMany(mappedBy = "pedidos", cascade = CascadeType.ALL)
   private Set<Produto> produtos = new HashSet<Produto>();

   @Column(nullable = false)
   private double valor;

   @Column
   private String observacao;

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
      if (!(obj instanceof Pedido))
      {
         return false;
      }
      Pedido other = (Pedido) obj;
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

   public Usuario getUsuario()
   {
      return this.usuario;
   }

   public void setUsuario(final Usuario usuario)
   {
      this.usuario = usuario;
   }

   public Set<Produto> getProdutos()
   {
      return this.produtos;
   }

   public void setProdutos(final Set<Produto> produtos)
   {
      this.produtos = produtos;
   }

   public double getValor()
   {
      return valor;
   }

   public void setValor(double valor)
   {
      this.valor = valor;
   }

   public String getObservacao()
   {
      return observacao;
   }

   public void setObservacao(String observacao)
   {
      this.observacao = observacao;
   }

   @Override
   public String toString()
   {
      String result = getClass().getSimpleName() + " ";
      result += "valor: " + valor;
      if (observacao != null && !observacao.trim().isEmpty())
         result += ", observacao: " + observacao;
      return result;
   }
}