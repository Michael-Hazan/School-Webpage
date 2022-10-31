var max = 25;

var calculationsAmount = 5;
var initialCalculationsAmount = calculationsAmount;
var calculationsAnswers = [];
var signatures = [];
var currentSignature = -1;

window.onload = function () {
    load();
};
function load() {
    document.getElementById("calculations").innerHTML = "";
    document.getElementById("calsAmount").value = calculationsAmount;

    placeCalculations();
    placeNumbers();

}

function setCalsAmount() {
    var cals = document.getElementById("calsAmount");
    var res = document.getElementById("badCalsAmount");
    if (cals.value != "" && cals.value > 3) calculationsAmount = cals.value;
    if (cals.value < 3 && cals.value != "") res.innerHTML = "Bad Value! Value Must Be Above 3!";

    load();

}

function placeCalculations() {
    var cals = document.getElementById("calculations");
    
    for (var i = 0; i < calculationsAmount; i++) {
        var signature = getSignature();
        cals.innerHTML += `<div class="calculation">
                        <input type="number" id="cal${i}1" disabled /> ${signature} <input type="number" id="cal${i}2" disabled /> = <input class="answer" type="text" id="cal${i}ans" />
                        <p id="res${i}"></p>
                        </div>`;
    }
}

function placeNumbers() {
    for (var i = 0; i < calculationsAmount; i++) {
        var num1 = Math.floor(Math.random() * max);
        var num2 = Math.floor(Math.random() * max)+1;
        document.getElementById(`cal${i}1`).value = num1;
        document.getElementById(`cal${i}2`).value = num2;
        calculateAnswers(num1, num2, i)
    }
}

function calculateAnswers(x, y, i) {
    if (signatures[i] == "+") (calculationsAnswers[i] = x + y);
    if (signatures[i] == "-") (calculationsAnswers[i] = x - y);
    if (signatures[i] == "*") (calculationsAnswers[i] = x * y);
    if (signatures[i] == "/") (calculationsAnswers[i] = x / y).toFixed(2);
}


function checkAnswers() {
    for (var i = 0; i < calculationsAmount; i++) {
        var answer = document.getElementById(`cal${i}ans`);
        var res = document.getElementById(`res${i}`);
        if (answer.value == null || answer.value == "") {
            res.innerHTML = `Please write an answer`;
            continue;
        }
        if (answer.value == calculationsAnswers[i]) res.innerHTML = "Correct!";
        else res.innerHTML = `Wrong by ${calculationsAnswers[i] - answer.value}`;
    }
}


function getSignature() {
    currentSignature++;
    var rand = Math.random() * 4;

    if (rand <= 1) { signatures[currentSignature] = "+"; return "+"; }
    if (rand <= 2) { signatures[currentSignature] = "-"; return "-"; }
    if (rand <= 3) { signatures[currentSignature] = "*"; return "*"; }
    if (rand <= 4) { signatures[currentSignature] = "/"; return ":"; }
}