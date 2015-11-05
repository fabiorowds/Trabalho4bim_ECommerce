package br.univel.model;

import javax.persistence.Entity;
import java.io.Serializable;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.Version;
import java.lang.Override;
import br.univel.model.Pedido;
import javax.persistence.ManyToOne;
import javax.persistence.FetchType;
import javax.persistence.CascadeType;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class PedidoItens implements Serializable
{

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   @Column(name = "id", updatable = false, nullable = false)
   private Long id;
   @Version
   @Column(name = "version")
   private int version;

   @Column(nullable = false)
   private String DescProduto;

   @Column(nullable = false)
   private double VlrProduto;

   @Column(nullable = false)
   private int QtdeItem;

   @Column(nullable = false)
   private double VlrTotal;

   @Column(nullable = false)
   private Long idItem;

   @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
   private Pedido pedido;

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
      if (!(obj instanceof PedidoItens))
      {
         return false;
      }
      PedidoItens other = (PedidoItens) obj;
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

   public String getDescProduto()
   {
      return DescProduto;
   }

   public void setDescProduto(String DescProduto)
   {
      this.DescProduto = DescProduto;
   }

   public double getVlrProduto()
   {
      return VlrProduto;
   }

   public void setVlrProduto(double VlrProduto)
   {
      this.VlrProduto = VlrProduto;
   }

   public int getQtdeItem()
   {
      return QtdeItem;
   }

   public void setQtdeItem(int QtdeItem)
   {
      this.QtdeItem = QtdeItem;
   }

   public double getVlrTotal()
   {
      return VlrTotal;
   }

   public void setVlrTotal(double VlrTotal)
   {
      this.VlrTotal = VlrTotal;
   }

   public Long getIdItem()
   {
      return idItem;
   }

   public void setIdItem(Long idItem)
   {
      this.idItem = idItem;
   }

   @Override
   public String toString()
   {
      String result = getClass().getSimpleName() + " ";
      if (DescProduto != null && !DescProduto.trim().isEmpty())
         result += "DescProduto: " + DescProduto;
      result += ", VlrProduto: " + VlrProduto;
      result += ", QtdeItem: " + QtdeItem;
      result += ", VlrTotal: " + VlrTotal;
      if (idItem != null)
         result += ", idItem: " + idItem;
      return result;
   }

   public Pedido getPedido()
   {
      return this.pedido;
   }

   public void setPedido(final Pedido pedido)
   {
      this.pedido = pedido;
   }
}