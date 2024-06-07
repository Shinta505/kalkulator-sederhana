const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

const modeButton = document.querySelector('.mode');

modeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});



const specialChars = ["sin", "cos", "tan", "%", "*", "/", "-", "+", "^", "log", "ln", "sqrt", "!", "1/", "mod", "π", "e", "="];
let output = "";

let isDegreeMode = true; // Mode default adalah degree

// Fungsi untuk mengubah mode antara degree dan radian
const toggleMode = () => {
    isDegreeMode = !isDegreeMode; // Toggle mode antara true (degree) dan false (radian)
    // Ubah teks tombol menjadi "rad" atau "deg" sesuai dengan mode yang aktif
    const radBtn = document.querySelector('.rad-btn');
    radBtn.textContent = isDegreeMode ? 'rad' : 'deg';
}

// Tambahkan event listener untuk tombol "rad"
const radBtn = document.querySelector('.rad-btn');
radBtn.addEventListener('click', toggleMode);

//console.log(display, buttons);

const handleSpecialCharacters = (btnValue) => {
    if (btnValue === "π") {
        output += "3.14";
    } else if (btnValue === "mod") {
        output += "%";
    } else if (btnValue === "%") {
        output += "/100";
    } else if (btnValue === "1/") {
        // Ambil angka sebelum "1/"
        const prevNumber = output.match(/(\d+)(?!.*\d)/);
        // Jika ada angka sebelumnya, hitung hasil pembagian 1/angka tersebut
        if (prevNumber) {
            output = output.slice(0, -prevNumber[0].length) + (1 / parseFloat(prevNumber[0])).toString();
        }
    } else if (btnValue === "!") {
        // Ambil angka sebelum "!"
        const prevNumber = output.match(/(\d+)(?!.*\d)/);
        // Jika ada angka sebelumnya, hitung faktorial dari angka tersebut
        if (prevNumber) {
            const factorial = calculateFactorial(parseInt(prevNumber[0]));
            output = output.slice(0, -prevNumber[0].length) + factorial.toString();
        }
    } else if (btnValue === "sqrt") {
        // Ambil angka sebelum "√"
        const prevNumber = output.match(/(\d+)(?!.*\d)/);
        // Jika ada angka sebelumnya, hitung akar kuadrat dari angka tersebut
        if (prevNumber) {
            const akar = Math.sqrt(parseFloat(prevNumber[0]));
            output = output.slice(0, -prevNumber[0].length) + akar.toString();
        }
    } else if (btnValue === "^") {
        output += "^";
    } else if (btnValue === "log") {
        // Ambil angka sebelum "log"
        const prevNumber = output.match(/(\d+)(?!.*\d)/);
        // Jika ada angka sebelumnya, hitung akar kuadrat dari angka tersebut
        if (prevNumber) {
            const logaritma = Math.log10(parseFloat(prevNumber[0]));
            output = output.slice(0, -prevNumber[0].length) + logaritma.toString();
        }
    } else if (btnValue === "ln") {
        // Ambil angka sebelum "ln"
        const prevNumber = output.match(/(\d+)(?!.*\d)/);
        // Jika ada angka sebelumnya, hitung logaritma natural dari angka tersebut
        if (prevNumber) {
            const logNatural = Math.log(parseFloat(prevNumber[0]));
            output = output.slice(0, -prevNumber[0].length) + logNatural.toString();
        }
    } else if (btnValue === "sin" || btnValue === "cos" || btnValue === "tan") {
        // Ambil angka setelah "sin", "cos", atau "tan"
        const prevNumber = output.match(/(\d+)(?!.*\d)/);
        // Jika ada angka setelahnya, hitung nilai trigonometri sesuai mode yang aktif
        if (prevNumber) {
            const angle = parseFloat(prevNumber[0]);
            let result;
            if (isDegreeMode) {
                // Jika mode adalah degree, ubah sudut ke radian
                const angleInRadians = angle * (Math.PI / 180);
                if (btnValue === "sin") {
                    result = Math.sin(angleInRadians);
                } else if (btnValue === "cos") {
                    result = Math.cos(angleInRadians);
                } else if (btnValue === "tan") {
                    result = Math.tan(angleInRadians);
                }
            } else {
                // Jika mode adalah radian, langsung hitung trigonometri
                if (btnValue === "sin") {
                    result = Math.sin(angle);
                } else if (btnValue === "cos") {
                    result = Math.cos(angle);
                } else if (btnValue === "tan") {
                    result = Math.tan(angle);
                }
            }
            output = output.slice(0, -prevNumber[0].length) + result.toString();
        }
    } else {
        output += btnValue;
    }
}

// Fungsi untuk menghitung faktorial
const calculateFactorial = (num) => {
    let result = 1;
    for (let i = 2; i <= num; i++) {
        result *= i;
    }
    return result;
}

// Define function to calculate based on button clicked
const calculate = (btnValue) => {
    //console.log(btnValue);
    if (btnValue === "=" && output !== "") {
        // Tambahkan penanganan khusus untuk perhitungan pangkat
        if (output.includes("^")) {
            const parts = output.split("^");
            if (parts.length === 2) {
                const base = parseFloat(parts[0]);
                const exponent = parseFloat(parts[1]);
                output = Math.pow(base, exponent).toString();
            }
        } 
        else {
            output = eval(output);
        }
    } else if (btnValue === "AC") {
        output = ""
    } else if (btnValue === "DEL") {
        output = output.toString().slice(0, -1);
    } else {
        if (output === "" && specialChars.includes(btnValue)) return;

        if (specialChars.includes(btnValue)) {
            handleSpecialCharacters(btnValue);
        } else {
            output += btnValue;
        }
    }
    if (output === "undefined") {
        output = "";
    }
    display.value = output;
}

// Tambah event listener untuk buttons, memanggil calculate() on click
buttons.forEach(button => {
    // Button click listener calls calculate() with dataset value as argument
    button.addEventListener("click", (e) => calculate(e.target.dataset.value));
})