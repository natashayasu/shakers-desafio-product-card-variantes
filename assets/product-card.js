let selectedColor = null
let selectedSize = null
let selectedVariant = null

const selects = document.querySelectorAll("select")
const buttons = document.querySelectorAll(".add-to-cart")
const priceProduct = document.querySelector(".product-price")
const productImage = document.querySelector(".product-image")

selects.forEach(select => {

  select.addEventListener("change", (e) => {

    if(select.id === "tamanho"){
      selectedSize = e.target.value
    }

    if(select.id === "cor"){
      selectedColor = e.target.value
    }

    selectedVariant = variants.find(variant => 
      variant.option1 === selectedSize &&
      variant.option2 === selectedColor
    )

    if(selectedVariant){
      const price = (selectedVariant.price / 100).toFixed(2)
      priceProduct.textContent = `R$ ${price}`
    }

    if(selectedVariant.featured_image){
      productImage.src = selectedVariant.featured_image.src
    }

  })

})

buttons.forEach(button => {

  button.addEventListener("click", () => {

    if(!selectedVariant){
      alert("Selecione uma variante")
      return
    }

    fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: selectedVariant.id,
        quantity: 1
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log("Produto adicionado:", data)
      alert("Produto adicionado ao carrinho")
    })
    .catch(error => {
      console.error("Erro:", error)
    })

  })

})