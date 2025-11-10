
document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const resetBtn = document.getElementById("resetBtn");
    const colorPicker = document.getElementById("colorPicker");

    const size = 10;

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const square = document.createElement("div");
            square.classList.add("square");

            const isLight = (row + col) % 2 === 0;
            const originalColor = isLight ? "#f0d9b5" : "#b58863";

            square.classList.add(isLight ? "light" : "dark");
            square.dataset.originalColor = originalColor;
            square.dataset.active = "false";
            square.style.backgroundColor = originalColor;

            square.addEventListener("click", function () {
                const isActive = square.dataset.active === "true";

                if (!isActive) {
                    const selectedColor = colorPicker.value || "#ff0000";
                    square.style.backgroundColor = selectedColor;
                    square.dataset.active = "true";
                    square.classList.add("active");
                } else {
                    square.style.backgroundColor = square.dataset.originalColor;
                    square.dataset.active = "false";
                    square.classList.remove("active");
                }
            });

            board.appendChild(square);
        }
    }

    resetBtn.addEventListener("click", function () {
        const squares = document.querySelectorAll(".square");
        squares.forEach(square => {
            square.style.backgroundColor = square.dataset.originalColor;
            square.dataset.active = "false";
            square.classList.remove("active");
        });
    });
});
