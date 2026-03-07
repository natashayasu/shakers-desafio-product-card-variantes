# Desafio Shakers — Product Card com Variantes

## Descrição do desafio

Este projeto foi desenvolvido como parte do **Desafio Semana 4 — Temas e Integrações**.

O objetivo foi criar um **Product Card customizado na Shopify**, sem utilizar o `<product-form>` nativo da plataforma, implementando manualmente:

- Seleção de variantes
- Atualização dinâmica de preço
- Integração com o carrinho via Cart API

O foco do desafio é trabalhar conceitos essenciais de um e-commerce:

- Produto
- Variantes
- Interação com carrinho
- Integração entre Liquid e JavaScript
- Organização de código

---

# Produto criado no Admin

Foi criado um produto no Admin da Shopify contendo **duas opções de variantes**.

## Opções

**Cor**
- Preto
- Chumbo
- Branco

**Tamanho**
- P
- M
- G

## Exemplos de combinações de variantes

- Preto / P  
- Preto / M  
- Preto / G  
- Branco / P  
- Branco / M  
- Branco / G  

Cada combinação gera uma **variant_id diferente**, que é utilizada para adicionar o item ao carrinho.

---

# Product Card Customizado

Foi criado um snippet chamado:

```
snippets/product-card-custom.liquid
```

O card contém:

- Imagem do produto
- Título do produto
- Preço da variante selecionada
- Seletores de Cor
- Seletores de Tamanho
- Botão customizado de **Adicionar ao carrinho**

⚠️ O `<product-form>` nativo da Shopify **não foi utilizado**.

---

# Lógica de Seleção de Variantes

As variantes do produto são expostas para o JavaScript utilizando **JSON gerado pelo Liquid**.

Exemplo:

```liquid
<script>
  const variants = {{ product.variants | json }};
</script>
```

Dessa forma o JavaScript consegue acessar todas as variantes do produto.

---

# Como funciona a busca da variante via JavaScript

Quando o usuário seleciona:

- uma **cor**
- um **tamanho**

o JavaScript busca dentro do array de variantes a combinação correspondente utilizando `.find()`.

Exemplo simplificado:

```javascript
const selectedVariant = variants.find(variant => 
  variant.option1 === selectedColor &&
  variant.option2 === selectedSize
);
```

Se a variante for encontrada:

- o **preço exibido é atualizado**
- o **variant_id é armazenado** para ser usado no botão de Add to Cart.

---

# Atualização dinâmica do preço

Sempre que o usuário altera a cor ou o tamanho, o JavaScript:

1. Busca a variante correspondente
2. Atualiza o preço exibido no card
3. Atualiza o `variant_id` selecionado

Assim o usuário sempre vê o **preço correto da variante escolhida**.

---

# Add to Cart com Cart API

O botão **Adicionar ao carrinho** foi implementado utilizando JavaScript e a **Cart API da Shopify**.

Endpoint utilizado:

```
/cart/add.js
```

A requisição é feita com **fetch e async/await**.

Exemplo simplificado:

```javascript
async function addToCart(variantId) {
  try {
    const response = await fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: variantId,
        quantity: 1
      })
    });

    const data = await response.json();
    console.log('Produto adicionado ao carrinho', data);

  } catch (error) {
    console.error('Erro ao adicionar ao carrinho', error);
  }
}
```

Esse processo permite adicionar o produto ao carrinho **sem recarregar a página**.

---

# Estrutura do projeto

```
shakers-desafio-product-card-variantes
│
├── README.md
│
├── sections
│   └── product-grid.liquid
│
├── snippets
│   └── product-card-custom.liquid
│
└── assets
    └── product-card.js
```

---

# Como testar o projeto

1. Clonar o repositório

```
git clone https://github.com/natashayasu/shakers-desafio-product-card-variantes
```

2. Acessar a pasta do projeto

```
cd shakers-desafio-product-card-variantes
```

3. Rodar o tema na Shopify (via Shopify CLI ou upload do tema)

4. Acessar a página onde o **Product Card está sendo exibido**

5. Testar as funcionalidades:

- Seleção de **Cor**
- Seleção de **Tamanho**
- **Atualização dinâmica de preço**
- **Adicionar ao carrinho sem recarregar a página**

---

# Branch utilizada

O desenvolvimento foi realizado na branch:

```
feat/product-card-variantes
```

Posteriormente foi aberto um **Pull Request para a branch main**.

---

# Pull Request

Link do PR:

[LINK DO PR](https://github.com/natashayasu/shakers-desafio-product-card-variantes/pull/1)

---

# Vídeo de demonstração

Foi gravado um vídeo de **3 a 6 minutos** demonstrando:

- Produto criado no Admin com 2 opções
- Funcionamento da seleção de variantes
- Atualização dinâmica de preço
- Add to Cart funcionando sem reload
- Explicação da lógica JavaScript utilizada

Link do vídeo:

[LINK DO VÍDEO](https://drive.google.com/file/d/1tAyjLOLE-r3zi4dThWcZ4VZcH_pyaW3s/view?usp=sharing)

---

# Requisitos atendidos

✔ Produto com 2 opções de variantes  
✔ Seleção de variantes funcional  
✔ Preço atualizando dinamicamente  
✔ Add to Cart funcionando sem reload  
✔ Uso de `async/await`  
✔ Uso de `addEventListener`  
✔ Uso de `find()` para localizar variantes  
✔ Código JavaScript organizado  
✔ Uso correto de Liquid  
✔ Estrutura Git adequada (branch + commits + PR)
