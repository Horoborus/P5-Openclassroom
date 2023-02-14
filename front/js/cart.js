console.log('connecté'); 

let cart = JSON.parse(localStorage.getItem('cart'));
let affichagePanier = cart.length;
let item = document.querySelector("#cart__items");

for (let i = 0; i < cart.length; i++) {
  let cart_i = cart[i];
  let itemId = cart_i["id"];
  
  fetch("http://localhost:3000/api/products/" + itemId)
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(product) {
      item.innerHTML += `
        <article class="cart__item" data-id="${cart_i.id}" data-couleur="${cart_i.color}" data-quantité="${cart_i.quantity}">
          <div class="cart__item__img">
            <img src="${product.imageUrl}" alt="${product.altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__titlePrice">
              <h2>${product.name}</h2>
              <span>couleur : ${cart_i.color}</span>
              <p data-prix="${product.price}">${product.price} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart_i.quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem" data-id="${cart_i.id}" data-couleur="${cart_i.color}">Supprimer</p>
              </div>
            </div>
          </div>
        </article>
      `;
    });

//Supprimer Item
// Rajouter event listener pour supprimer un élément dans le panier

// selectionner tout les buttons supprimer
const removeButtons = document.querySelectorAll('.deleteItem');
console.log(removeButtons);
// loop sur tout les buttons et rajouter event listeners
removeButtons.forEach(button => {
  button.addEventListener('click', event => {
    // prend le ID item a remover
    const itemId = button.dataset.itemId;

    // prendre le cart local storage
    const cart = JSON.parse(localStorage.getItem('cart'));

    // trouver item dans le cart avec le meme id
    const itemIndex = cart.findIndex(item => item.id === itemId);

    // si le item est trouvé, supprimer le item
    if (itemIndex !== -1) {
      cart.splice(itemIndex, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    // actualiser le panier
    location.reload();
  });
});
}




