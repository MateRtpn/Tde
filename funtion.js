
document.querySelector('.menu-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
});




// Variables for elements
const sexButtons = document.querySelectorAll(".calculator-sex button");
const weightInput = document.querySelector("input[placeholder='น้ำหนัก (kg)']");
const heightInput = document.querySelector("input[placeholder='ส่วนสูง (cm)']");
const ageInput = document.querySelector("input[placeholder='อายุ (ปี)']");
const bmrButton = document.querySelectorAll("button")[3];
const bmrResult = document.querySelectorAll(".result")[0];

const activitySelect = document.querySelector("select");
const tdeeButton = document.querySelectorAll("button")[4];
const tdeeResult = document.querySelectorAll(".result")[1];

const targetWeightInput = document.querySelector("input[placeholder='น้ำหนักที่ต้องการ (kg)']");
const timeInput = document.querySelector("input[placeholder='ระยะเวลา (เดือน)']");
const dailyIntakeButton = document.querySelectorAll("button")[5];
const dailyIntakeResult = document.querySelectorAll(".result")[2];

// Global variables to store user input and selection
let selectedSex = 'ผู้ชาย';

// Event listeners for sex selection
sexButtons.forEach((button) => {
    button.addEventListener("click", () => {
        selectedSex = button.textContent;
        sexButtons.forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
    });
});

// BMR Calculation
bmrButton.addEventListener("click", () => {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);
    const age = parseFloat(ageInput.value);
    
    if (!weight || !height || !age) {
        bmrResult.textContent = "กรุณากรอกข้อมูลให้ครบ";
        return;
    }
    
    let bmr;
    if (selectedSex === 'ผู้ชาย') {
        bmr = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
    } else {
        bmr = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
    }

    bmrResult.textContent = `ค่า BMR: ${Math.round(bmr)} แคลอรี่`;
});

// TDEE Calculation
tdeeButton.addEventListener("click", () => {
    const activityLevel = activitySelect.value;
    const bmr = parseFloat(bmrResult.textContent.replace("ค่า BMR: ", "").replace(" แคลอรี่", ""));
    
    if (isNaN(bmr)) {
        tdeeResult.textContent = "กรุณาคำนวณ BMR ก่อน";
        return;
    }

    let multiplier;
    switch (activityLevel) {
        case "ไม่ทำกิจกรรม":
            multiplier = 1.2;
            break;
        case "กิจกรรมเบาๆ 1-3 วัน":
            multiplier = 1.375;
            break;
        case "กิจกรรมปานกลาง 3-5 วัน":
            multiplier = 1.55;
            break;
        case "กิจกรรมหนัก 5-7 วัน":
            multiplier = 1.725;
            break;
        default:
            multiplier = 1.2;
    }

    const tdee = bmr * multiplier;
    tdeeResult.textContent = `ค่า TDEE: ${Math.round(tdee)} แคลอรี่`;
});

// Daily Intake Calculation for Target Weight
dailyIntakeButton.addEventListener("click", () => {
    const targetWeight = parseFloat(targetWeightInput.value);
    const months = parseFloat(timeInput.value);
    const tdee = parseFloat(tdeeResult.textContent.replace("ค่า TDEE: ", "").replace(" แคลอรี่", ""));
    
    if (isNaN(tdee) || isNaN(targetWeight) || isNaN(months) || months <= 0) {
        dailyIntakeResult.textContent = "กรุณากรอกข้อมูลให้ครบและคำนวณ TDEE ก่อน";
        return;
    }

    const weightDifference = targetWeight - parseFloat(weightInput.value);
    const dailyCaloricAdjustment = (weightDifference * 7700) / (months * 30);
    const recommendedIntake = tdee + dailyCaloricAdjustment;

    dailyIntakeResult.textContent = `พลังงานแนะนำต่อวัน: ${Math.round(recommendedIntake)} แคลอรี่`;
});