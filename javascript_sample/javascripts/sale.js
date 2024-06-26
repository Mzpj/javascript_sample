const products = {
  1: { id: 1, name: "Original blend 200g", price: 500 },
  2: { id: 2, name: "Original blend 500g", price: 900 },
  3: { id: 3, name: "Special Blend 200g", price: 700 },
  4: { id: 4, name: "Special Blend 500g", price: 1200 }
};

const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number");

let purchases = [];

function add() {
  const productId = parseInt(priceElement.value);
  const number = parseInt(numberElement.value);
  
  if (productId && number) {
    const product = products[productId];

    let purchase = {
      id: product.id,
      name: product.name,
      price: product.price,
      number: number,
    };

    const existingPurchaseIndex = purchases.findIndex(item => item.id === purchase.id);
    if (existingPurchaseIndex === -1) {
      purchases.push(purchase);
    } else {
      purchases[existingPurchaseIndex].number += purchase.number;
    }

    window.alert(`${display()}\nSubtotal: ${subtotal()} yen`);
    priceElement.value = "0";
    numberElement.value = "";
  } else {
    window.alert("Please select a product and enter a quantity.");
  }
}

function subtotal() {
  return purchases.reduce((prev, purchase) => prev + purchase.price * purchase.number, 0);
}

function display() {
  return purchases.map(purchase => `${purchase.name}: ${purchase.price} yen x ${purchase.number} = ${purchase.price * purchase.number} yen`).join("\n");
}

function calcPostageFromPurchase(sum) {
  if (sum >= 3000) {
    return 0;
  } else if (sum >= 2000) {
    return 250;
  } else {
    return 500;
  }
}

function calc() {
  const sum = subtotal();
  const postage = calcPostageFromPurchase(sum);
  const total = sum + postage;
  
  window.alert(`The subtotal is ${sum} yen\nThe shipping fee is ${postage} yen\nThe total is ${total} yen\n\nDetails:\n${display()}`);
  
  purchases = [];
  priceElement.value = "0";
  numberElement.value = "";
}

      
    