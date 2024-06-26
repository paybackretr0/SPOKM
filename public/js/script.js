var swiper = new Swiper(".home-slider", {
  loop: true,
  grabCursor: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper = new Swiper(".reviews-slider", {
  loop: true,
  spaceBetween: 20,
  autoHeight: true,
  grabCursor: true,
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
  });
  calendar.render();
});

let loadMoreBtn = document.querySelector(".packages .load-more .btn");
let currentItem = 3;

if (loadMoreBtn) {
  loadMoreBtn.onclick = () => {
    let boxes = [...document.querySelectorAll(".packages .box-container .box")];
    for (let i = currentItem; i < currentItem + 3 && i < boxes.length; i++) {
      boxes[i].style.display = "inline-block";
    }
    currentItem += 3;
    if (currentItem >= boxes.length) {
      loadMoreBtn.style.display = "none";
    }
  };
}
