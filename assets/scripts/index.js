import { getCookie } from "../utils/cookies.js";
import { getData } from "../utils/httpReq.js";
import { shortenText } from "../utils/stringFunc.js";

const loginBtn = document.querySelector(".link__login");
const dashboardBtn = document.querySelector(".link__dashboard");
const mainContent = document.querySelector(".products");
const searchBtn = document.querySelector("button");
const inputBox = document.querySelector(".input__box");
const listCategories = document.querySelectorAll(".list__item");

let allProducts = null;
let query = "";
let category = "all";

const showProducts = (products) => {
  mainContent.innerHTML = "";

  products.forEach((product) => {
    const jsx = `
        <div>
            <img class="image__product" alt="${product.title}" src=${
      product.image
    }>
            <h4 class="title__product-name">${shortenText(product.title)}</h4>
            <div class="wrapper__price">
                <p class="price">$ ${product.price}</p>
                <button class="price__btn">
                    Buy
                    <i class="fa-solid  fa-cart-shopping"></i>
                </button>
            </div>
            <div class="rate">
                <i class="fa-solid fa-star"></i>
                <span>${product.rating.rate}</span>
            </div>
            <div class="count">
                <i class="fa-solid fa-user"></i>
                <span>${product.rating.count}</span>
            </div>
        </div>

        `;
    mainContent.innerHTML += jsx;
  });
};

const init = async () => {
  const cookie = getCookie();
  if (cookie) {
    loginBtn.style.display = "none";
  } else {
    dashboardBtn.style.display = "none";
  }

  allProducts = await getData("products");
  showProducts(allProducts);
};

const filterProducts = () => {
  const filteredProducts = allProducts.filter((product) => {
    if (category === "all") {
      return product.title.toLowerCase().includes(query);
    } else {
      return (
        product.title.toLowerCase().includes(query) &&
        product.category.toLowerCase() === category
      );
    }
  });
  showProducts(filteredProducts)
};

const searchHandler = () => {
  query = inputBox.value.trim().toLowerCase();
  filterProducts();
};

const filterHandler = (event) => {
  category = event.target.innerText.toLowerCase();

  listCategories.forEach((item) => {
    if (item.innerText.toLowerCase() === category) {
      item.className = "selected";
    } else {
      item.className = "list__item";
    }
  });

  filterProducts();
};

document.addEventListener("DOMContentLoaded", init);
searchBtn.addEventListener("click", searchHandler);
listCategories.forEach((item) => item.addEventListener("click", filterHandler));
