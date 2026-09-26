const SUPABASE_URL = 'https://fhtakxinyazmtcravwxo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_UaR4tZLGKBfSLKgcLYC8_Q_gibKwQ3X';

const productsContainer = document.querySelector('.pizza-container');

let products = [];
let cart = [];

// 1.Універсальна функція для збереження будь-яких даних (масивів/об'єктів) у
function getJsonCookie(cookieName) {
    const allCookies = document.cookie.split('; ');
    const targetCookie = allCookies.find(row => row.startsWith(cookieName +
        '='));
    if (targetCookie) {

        const encodedData = targetCookie.split('=')[1];
        return JSON.parse(decodeURIComponent(encodedData));
    }
    return null;
}


// 2. Універсальна функція для збереження будь-яких даних (масивів/об'єктів) у
function saveJsonCookie(cookieName, data, seconds) {
    const jsonString = JSON.stringify(data);
    const safeString = encodeURIComponent(jsonString);
    document.cookie = `${cookieName}=${safeString}; max-age=${seconds}; path=/`;
}




async function fetchData() {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
        headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`

        }
    });



    const data = await response.json();
    console.log(data);
    products = data;
    displayProducts(products);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        saveJsonCookie('cart', cart, 3600);
        console.log("Додано до кошика:", product);
    }
}

function createProductCard(product) {
    return `
<div class="card" style="width: 18rem;">
  <img src="${product.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${product.title}</h5>
    <p class="card-price">₴${product.price}</p>
     <p class="card-ingredients">${product.ingradiens}</p>
    <a href="#" onclick="addToCart(${product.id})" class="btn btn-primary">Добавити в кошик<i class="ti ti-garden-cart"></i></a>
    
  </div>
</div>
`}



function displayProducts() {
    productsContainer.innerHTML = "";
    products.forEach(product => {
        productsContainer.innerHTML += createProductCard(product);
    });
}

document.addEventListener('DOMContentLoaded', () => {

    fetchData()
});


let aboutUs = document.querySelector('.aboutUs');
let menu = document.querySelector('.headerMenu');
let contacts = document.querySelector('.contacts');
let promotions = document.querySelector('.promotions');
let cartHtml = document.querySelector(".cartHtml");

aboutUs.addEventListener('click', () => {
    window.location.href = 'aboutUs.html';
});

menu.addEventListener('click', () => {
    window.location.href = 'index.html';
});

promotions.addEventListener('click', () => {
    window.location.href = 'promotions.html';
});

contacts.addEventListener('click', () => {
    window.location.href = 'contacts.html';
});

cartHtml.addEventListener('click', () => {
    window.location.href = 'cart.html';
});

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const cartProduct = cart.find(p => p.id === productId);
    if (cartProduct) {
        cartProduct.quantity += 1;
    } else {
        cart.push({title: product.title, price: product.price, image: product.image, quantity: 1});
    }
    saveJsonCookie("cart", cart, 3600*24);
    console.log("Додано в кошик:", product)
}
