
function isPrime(n) {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    for (let i = 3; i * i <= n; i += 2) {
        if (n % i === 0) return false;
    }
    return true;
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("numberForm");
    const input = document.getElementById("numberInput");
    const result = document.getElementById("result");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); 

        const value = input.value.trim();
        const number = Number(value);

        if (
            value === "" ||
            !Number.isInteger(number) ||
            number <= 0
        ) {
            alert("Zadej prosím celé kladné číslo.");
            result.textContent = "";
            result.className = "error";
            return;
        }

        let message = "";
        if (number % 2 === 0) {
            message = `Číslo ${number} je sudé.`;
            alert("Číslo je sudé");
        } else {
            message = `Číslo ${number} je liché.`;
            alert("Číslo je liché");
        }

        if (isPrime(number)) {
            message += " Zároveň je to prvočíslo.";
        } else {
            message += " Není to prvočíslo.";
        }
        
        result.textContent = message;
        result.className = "ok";
    });
});
