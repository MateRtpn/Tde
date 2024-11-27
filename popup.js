
document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("image-popup");
    const popupImage = document.getElementById("popup-image");
    const closeBtn = document.querySelector(".popup-close");

    document.querySelectorAll(".popup-trigger").forEach(img => {
        img.addEventListener("click", () => {
            popupImage.src = img.src;
            popup.style.display = "flex";
        });
    });

    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });

    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.style.display = "none";
        }
    });
});
