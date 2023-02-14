//Fetch le Api de Kanap 
fetch('http://localhost:3000/api/products')
.then(res => res.json())

//visualition en tableau
.then((kanapProduits) => {
  console.table(kanapProduits);
  lesKanaps(kanapProduits);
 })
 
 //fonction d'affichage des produits de l'api sur la page index
function lesKanaps(index) {
let elementSection = document.querySelector(".items");
  for (let kanap of index) {
    
    elementSection.innerHTML += `<a href="./product.html?_id=${kanap._id}">
    <article>
      <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
      <h3 class="productName">${kanap.name}</h3>
      <p class="productDescription">${kanap.description}</p>
    </article>
  </a>`;
  }
}











