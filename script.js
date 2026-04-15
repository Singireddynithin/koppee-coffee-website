document.addEventListener("DOMContentLoaded", function () {

  // 🔍 SEARCH
  let input = document.getElementById("search");
    if (input) {
  input.addEventListener("keyup", function () {
    let value = input.value.toLowerCase();
    let posts = document.querySelectorAll(".post");

    posts.forEach(function(post) {
      let text = post.innerText.toLowerCase();
      post.style.display = text.includes(value) ? "flex" : "none";
    });
  });
}

  // 🖼️ MODAL
  let images = document.querySelectorAll(".gallery-container img");
  let modal = document.getElementById("imageModal");
  let modalImg = document.getElementById("modalImg");
  let closeBtn = document.querySelector(".close");

  let currentIndex = 0;

  function showImage(index) {
    modal.style.display = "block";
    modalImg.src = images[index].src;
  }

  images.forEach(function(img, index) {
    img.addEventListener("click", function() {
      currentIndex = index;
      showImage(index);
    });
  });

  closeBtn.onclick = function() {
    modal.style.display = "none";
  };

  modal.addEventListener("click", function(e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  let nextBtn = document.querySelector(".next");
let prevBtn = document.querySelector(".prev");

if (nextBtn && prevBtn) {
  nextBtn.onclick = function() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  };

  prevBtn.onclick = function() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  };
}

  // ❤️ LIKE BUTTON
  let likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach(function(btn, index) {

  let saved = localStorage.getItem("like" + index);
  let count = saved ? parseInt(saved) : 0;

  btn.innerText = "❤️ " + count;

  if (count > 0) {
    btn.classList.add("liked");
  }

 btn.addEventListener("click", function() {

  count++;
  btn.innerText = "❤️ " + count;

  btn.classList.add("liked"); // 🔥 red color

  btn.classList.add("pop");
  setTimeout(() => btn.classList.remove("pop"), 200);

  localStorage.setItem("like" + index, count);

  updateTotalLikes();
});

});

function updateTotalLikes() {
  let total = 0;

//   let likeButtons = document.querySelectorAll(".like-btn");


  likeButtons.forEach((btn, index) => {
    let saved = localStorage.getItem("like" + index);
    total += saved ? parseInt(saved) : 0;
  });

  document.getElementById("total-likes").innerText = "❤️ " + total;
}
updateTotalLikes();

  // 🛒 CART
let cartCount = localStorage.getItem("cart")
  ? parseInt(localStorage.getItem("cart"))
  : 0;

let cartDisplay = document.getElementById("cart-count");
cartDisplay.innerText = cartCount;

let buttons = document.querySelectorAll(".add-to-cart");
let toast = document.getElementById("toast");

buttons.forEach(function(btn) {
  btn.addEventListener("click", function() {
    cartCount++;
    cartDisplay.innerText = cartCount;
    localStorage.setItem("cart", cartCount);

    // 🔥 TOAST
    toast.style.display = "block";

    setTimeout(() => {
      toast.style.display = "none";
    }, 2000);
  });
});
});
