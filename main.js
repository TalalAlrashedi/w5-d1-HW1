function login() {
  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value.trim();

  let savedLogin = localStorage.getItem("username" + username);

  if (!savedLogin) {
    alert("المستخدم غير موجود. تأكد من صحة البيانات.");
  } else if (savedLogin !== password) {
    alert("كلمة المرور غير صحيحة");
  } else {
    localStorage.setItem("currentUser", username);
    alert("تم تسجيل الدخول بنجاح");
    window.location.href = "index.html";
  }
}

function register() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("يرجى تعبئة جميع الحقول");
    return;
  }

  localStorage.setItem("username" + username, password);
  alert("تم إنشاء الحساب بنجاح! سيتم نقلك إلى صفحة التسجيل ");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("currentUser");

  if (
    !username &&
    !window.location.href.includes("login.html") &&
    !window.location.href.includes("register.html")
  ) {
    window.location.href = "login.html";
    return;
  }

  const userNameElement = document.getElementById("user-name");
  if (userNameElement) {
    userNameElement.textContent = username;
  }

  if (window.location.pathname.includes("index.html")) {
    loadProducts();
  }
});

async function loadProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.log("حدث خطأ أثناء جلب المنتجات");

    console.error(error);
  }
}

function renderProducts(products) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  for (const product of products) {
    const card = document.createElement("div");
    card.className = "col-sm-6 col-md-4 col-lg-3 product-col";

    card.innerHTML = `
        <div class="card product-card h-100">
          <img src="${product.image}" class="card-img-top product-image" alt="${product.title}">
          <div class="card-body d-flex flex-column">
            <h6 class="card-title">${product.title}</h6>
            <p class="card-text text-success fw-bold mt-auto">${product.price} $</p>
          </div>
        </div>
      `;

    container.appendChild(card);
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
