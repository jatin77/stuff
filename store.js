//Calling Initialize Function
document.addEventListener('DOMContentLoaded', init);
//Event Function
function init() {
  //Toggle Menu
  document.querySelector('.burger').addEventListener('click', toggleMenu);
  //Remove Cart Item
  document
    .querySelector('.cart-products')
    .addEventListener('click', removeItem);
  //Add Item Numbers
  const valueChange = document.querySelector('.cart-products');
  valueChange.addEventListener('click', e => {
    if (e.target.className == 'item-number') {
      e.target.addEventListener('change', e => {
        updateTotal();
      });
    }
  });
  //Add Item To Cart
  const purchaseBtn = document.querySelectorAll('.product-purchase-btn');
  for (let i = 0; i < purchaseBtn.length; i++) {
    purchaseBtn[i].addEventListener('click', addItemToCart);
  }
  //Modal
  const modalBtn = document.querySelector('.ok-modal-btn');
  modalBtn.addEventListener('click', removeModal);
  //Update Total on Load
  updateTotal();
}
//Function Toggle Menu
function toggleMenu(e) {
  //Icon Toggle
  const icon = e.target;
  icon.classList.toggle('active');
  //Menu Toggle
  const menu = document.querySelector('header ul');
  menu.classList.toggle('active');
}
//Function Remove Item
function removeItem(e) {
  //Check Remove Target Button
  if (e.target.className === 'fa fa-times item-remove') {
    const itemRemoveBtn = e.target;
    const itemLi = itemRemoveBtn.parentElement.parentElement;
    const itemUl = itemLi.parentElement;
    itemUl.removeChild(itemLi);
    updateTotal(e);
  }
}
//Function Add Item To Cart
function addItemToCart(e) {
  const productTitle = e.target.parentElement.parentElement.querySelector(
    '.product-title h1'
  ).textContent;
  let checkName = document.querySelectorAll('.item-name');
  for (let i = 0; i < checkName.length; i++) {
    const name = checkName[i].textContent;
    if (productTitle == name) {
      const modal = document.querySelector('.modal');
      modal.style.display = 'flex';
      return;
    }
  }

  //Get Ul(Cart-Product) From DOM
  const cartProducts = document.querySelector('.cart-products');
  //Create Element
  const productContent = document.createElement('li');
  productContent.classList.add('cart-item');
  //Get Image
  const productImage = e.target.parentElement.parentElement.parentElement
    .querySelector('.product-image img')
    .getAttribute('src');
  const productPrice = e.target.parentElement.querySelector('.product-price')
    .textContent;
  //Set Product Content
  productContent.innerHTML = `<div class="item-image">
    <img src="${productImage}" alt="" />
  </div>
  <div class="item-name">${productTitle}</div>
  <div class="item-values">
    <span>$</span>
    <span class="item-price">${productPrice}</span>
  </div>
  <div class="items-quantity">
    <!-- <i class="fa fa-minus" aria-hidden="true"></i> -->
    -
    <input value="1" class="item-number" type="number" />
    <!-- <i class="fa fa-plus" aria-hidden="true"></i> -->
    +
  </div>
  <button class="item-remove">
    <i class="fa fa-times item-remove" aria-hidden="true"></i>
  </button>`;
  //Set Item In Dom
  cartProducts.appendChild(productContent);
  updateTotal();
}

function updateTotal(e) {
  //Total Price
  let priceTotal = 0;
  //Total Lists InDom
  const itemListsInDom = document.querySelectorAll('.cart-item');
  for (let i = 0; i < itemListsInDom.length; i++) {
    //Setting Default Item Values To 1
    let itemValues = itemListsInDom[i].querySelector(`.item-number`);

    //Getting Item Price
    let itemPrice = parseFloat(
      itemListsInDom[i].querySelector('.item-price').innerText
    );
    //Getting Item Value
    itemValues = parseFloat(
      itemListsInDom[i].querySelector('.item-number').value
    );

    //Calculate Total
    priceTotal += parseFloat(itemPrice * itemValues);
  }
  // Displaying Total In DOM
  document.querySelector('.total-price').innerText = priceTotal;
}
//Function Remove Modal
function removeModal() {
  const modal = document.querySelector('.modal');
  modal.style.display = 'none';
}
