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
import javax.persistence.OneToMany;
import javax.persistence.CascadeType;

@Entity
public class Usuario implements Serializable
{

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   @Column(name = "id", updatable = false, nullable = false)
   private Long id;
   @Version
   @Column(name = "version")
   private int version;

   @Column(nullable = false)
   private String Nome;

   @Column(nullable = false)
   private String Senha;

   @Column
   private String Endereco;

   @Column(nullable = false)
   private String Email;

   @Column
   private String cpf;

   @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
   private Set<Pedido> pedido = new HashSet<Pedido>();

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
      if (!(obj instanceof Usuario))
      {
         return false;
      }
      Usuario other = (Usuario) obj;
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

   public String getNome()
   {
      return Nome;
   }

   public void setNome(String Nome)
   {
      this.Nome = Nome;
   }

   public String getSenha()
   {
      return Senha;
   }

   public void setSenha(String Senha)
   {
      this.Senha = Senha;
   }

   public String getEndereco()
   {
      return Endereco;
   }

   public void setEndereco(String Endereco)
   {
      this.Endereco = Endereco;
   }

   public String getEmail()
   {
      return Email;
   }

   public void setEmail(String Email)
   {
      this.Email = Email;
   }

   public String getCpf()
   {
      return cpf;
   }

   public void setCpf(String cpf)
   {
      this.cpf = cpf;
   }

   @Override
   public String toString()
   {
      String result = getClass().getSimpleName() + " ";
      if (Nome != null && !Nome.trim().isEmpty())
         result += "Nome: " + Nome;
      if (Senha != null && !Senha.trim().isEmpty())
         result += ", Senha: " + Senha;
      if (Endereco != null && !Endereco.trim().isEmpty())
         result += ", Endereco: " + Endereco;
      if (Email != null && !Email.trim().isEmpty())
         result += ", Email: " + Email;
      if (cpf != null && !cpf.trim().isEmpty())
         result += ", cpf: " + cpf;
      return result;
   }

   public Set<Pedido> getPedido()
   {
      return this.pedido;
   }

   public void setPedido(final Set<Pedido> pedido)
   {
      this.pedido = pedido;
   }
}