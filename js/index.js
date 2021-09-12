// Scope
let jsonData;
let fetchData;
let recProduct;

function onInit() {
  fetch('/product-list.json')
    .then((response) => response.json())
    .then((data) => {
      jsonData = data;
      let userCategories = data.responses[0][0].params.userCategories;
      let output = '';
      userCategories.map(function (category) {
        console.log(userCategories.length);
        output += ` 
            <li class="links" id="${category}"  onclick='onDisplayClick("${category}")'>
              <a href="javascript:void(0)">${category}</a>
            </li>`;
      });
      document.getElementById('list').innerHTML = output;

      // Menü işlemleri
      let pointer = document.querySelector('.indicator');
      let listItems = document.querySelectorAll('.links');
      listItems[0].classList.add('active'); // İlk açıldığında aktif olması için
      pointer.style.height = '60px';

      for (var i = 0; i < listItems.length; i++) {
        var current = listItems[i];
        current.dataset.order = i * 100 + '%';
        current.addEventListener('click', movePointer);
      }

      function movePointer(e) {
        var order = e.currentTarget.dataset.order;
        pointer.style.transform = 'translateY(' + order + ')';
      }

      for (var i = 0; i < listItems.length; i++) {
        listItems[i].addEventListener('click', activateClass);
      }

      function activateClass(event) {
        for (var i = 0; i < listItems.length; i++) {
          listItems[i].classList.remove('active');
        }
        event.currentTarget.classList.add('active');
      }
    });
}

function onDisplayClick(recommendedProductName) {
  // Kategori bölümü için eşleştirme yaptım.
  let recommendedProducts =
    jsonData.responses[0][0].params.recommendedProducts[recommendedProductName];
  let output = '';
  recommendedProducts.map(function (recommendedProduct) {
    recProduct = recommendedProduct;
    if (recommendedProduct) {
      output += `
              <div class="swiper-slide">
                <div class="card">
                  <div class="productImg">
                    <img
                      src="${recommendedProduct.image}"
                      loading="lazy"
                      class="lazyload"
                      alt=""
                    />
                  </div>
                  <p class="productText">
                   ${recommendedProduct.name}
                  </p>
                  <h2 class="productTitle">${recommendedProduct.priceText}</h2>
                  <span class="productFee">${
                    recommendedProduct.params.shippingFee == 'FREE'
                      ? 'Ücretsiz Kargo'
                      : ''
                  }</span>
                  <div class="flex">
                    <button type="button" class="addBasket " id="${
                      recommendedProduct.productId
                    }" onclick="addBasket(this.id)">
                      <span>Sepete Ekle</span>
                    </button>
                  </div>
                </div>
              </div>`;
    }
  });
  document.getElementById('slider').innerHTML = output;
  // verticalSwiper.slideTo(0, 1, false);
}

function fetchProducts() {
  fetch('/product-list.json')
    .then((response) => response.json())
    .then((data) => {
      fetchData = data;
      allCategory = data.responses[0][0].params.recommendedProducts;
      let userCategoriess = allCategory[Object.keys(allCategory)[0]];

      let output = '';
      userCategoriess.map(function (category) {
        output += `  
              <div class="swiper-slide">
                <div class="card">
                  <div class="productImg">
                    <img
                      src="${category.image}"
                      loading="lazy"
                      class="lazyload"
                      alt=""
                    />
                  </div>
                  <p class="productText">
                   ${category.name}
                  </p>
                  <h2 class="productTitle">${category.priceText}</h2>
                  <span class="productFee">${
                    category.params.shippingFee == 'FREE'
                      ? 'Ücretsiz Kargo'
                      : ''
                  }</span>
                  <div class="flex">
                    <button type="button" class="addBasket" id="${
                      category.productId
                    }" onclick="addBasket(this.id)">
                      <span>Sepete Ekle</span>
                    </button>
                  </div>
                </div>
              </div>`;
      });
      document.getElementById('slider').innerHTML = output;
    });
}

const btns = document.querySelectorAll('.addBasket');
const alertDisplay = document.querySelector('.alert');
const closeBtn = document.getElementById('close');

function addBasket(clicked) {
  alertDisplay.style.display = 'block';
  setTimeout(() => {
    alertDisplay.style.display = 'none';
  }, 10000);
}
closeBtn.addEventListener('click', () => {
  setTimeout(() => {
    alertDisplay.style.display = 'none';
  }, 100);
});

if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img .lazyload');
  images.forEach((img) => {
    img.src = img.dataset.src;
  });
} else {
  let script = document.createElement('script');
  script.async = true;
  script.src =
    'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.1.8/lazysizes.min.js';
  document.body.appendChild(script);
}

var swiper = new Swiper('.mySwiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 1,
  spaceBetween: 5,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 50,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1920: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  },
});

document.addEventListener('DOMContentLoaded', function () {
  onInit();
  fetchProducts();
});
