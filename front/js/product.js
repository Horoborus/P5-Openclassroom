let cart = localStorage.getItem('cart');

if(cart == null){
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
}


//la variable params récupère l'url de la page
params = new URLSearchParams(window.location.search);
// la variable id va récupérer la valeur du paramètre _id
const id = params.get("_id");
console.log({id}); 

//Fetch le information stocké sur Kanap 
fetch(`http://localhost:3000/api/products/${id}`)
.then((res) => res.json())
.then((kanaps) => {
receiveData(kanaps);
})
// execution de la fontion de chaque kanap
function receiveData(kanaps) {
  
    // Déclaration des variables des éléments
    let imageAlt = document.querySelector("article div.item__img");
    let title = document.querySelector("#title");
    let price = document.querySelector("#price");
    let description = document.querySelector("#description");
    let colorOption = document.querySelector("#colors");
   
  
       // Affiché la description du kanap sur la page
       imageAlt.innerHTML = `<img src="${kanaps.imageUrl}" alt="${kanaps.altTxt}">`;
       title.textContent = `${kanaps.name}`;
       price.textContent = `${kanaps.price}`;
       description.textContent = `${kanaps.description}`;
   
       // Affiché les coleurs du kanap sur la page
       kanaps.colors.forEach((color) => {
         let option = document.createElement("option");
         option.textContent = color;
         colorOption.appendChild(option);
       });

  
  const butonCart = document.querySelector("#addToCart")
  
  if (butonCart !=null) {
  butonCart.addEventListener("click", (e) => {
  
        const color = document.querySelector("#colors").value;
        const quantity = document.querySelector("#quantity").value; 
        
  
        
        
   if (color == null || color ==="" || quantity == null || quantity == 0 ) {
    alert("Veuillez sélectionner une couleur et une quantité");
    return
}  
       const data = {
         id: id,
         color: color,
         quantity: quantity,
         
       }
      let cart = JSON.parse(localStorage.getItem('cart'));
      cart.push(data)
    
       //Renvoyer aprés le button panier a cart.html
       window.location.href = "cart.html";
       localStorage.setItem("cart", JSON.stringify(cart));
        
    })
  }
}