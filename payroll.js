const readline = require("readline-sync");

const employees = [];
const numberOfEmployees = 3;

function getPositiveNumber(promptText) {
  let value;

  while (true) {
    value = Number(readline.question(promptText));

    if (!isNaN(value) && value > 0) {
      return value;
    }

    console.log("Invalid input. Please enter a number greater than 0.");
  }
}

function getHoursWorked(promptText) {
  let value;

  while (true) {
    value = Number(readline.question(promptText));

    if (!isNaN(value) && value >= 0 && value <= 80) {
      return value;
    }

    console.log("Invalid input. Hours must be between 0 and 80.");
  }
}

function calculatePayroll(hourlyWage, hoursWorked) {
  const regularHours = Math.min(hoursWorked, 40);
  const overtimeHours = Math.max(hoursWorked - 40, 0);

  const regularPay = regularHours * hourlyWage;
  const overtimePay = overtimeHours * hourlyWage * 1.5;
  const totalPay = regularPay + overtimePay;

  return {
    regularPay,
    overtimePay,
    totalPay
  };
}

console.log("=== Payroll Program ===");

for (let i = 0; i < numberOfEmployees; i++) {
  console.log(`\nEnter information for employee #${i + 1}`);

  const name = readline.question("Employee name: ").trim();
  const hourlyWage = getPositiveNumber("Hourly wage: ");
  const hoursWorked = getHoursWorked("Hours worked: ");

  const payInfo = calculatePayroll(hourlyWage, hoursWorked);

  employees.push({
    name: name,
    hourlyWage: hourlyWage,
    hoursWorked: hoursWorked,
    regularPay: payInfo.regularPay,
    overtimePay: payInfo.overtimePay,
    totalPay: payInfo.totalPay
  });
}

let highestPaidEmployee = employees[0];

for (let i = 1; i < employees.length; i++) {
  if (employees[i].totalPay > highestPaidEmployee.totalPay) {
    highestPaidEmployee = employees[i];
  }
}

console.log("\n=== Payroll Report ===");
console.log(
  "Name".padEnd(20) +
    "Hours".padEnd(10) +
    "Regular Pay".padEnd(15) +
    "Overtime Pay".padEnd(15) +
    "Total Pay"
);
console.log("-".repeat(75));

for (const employee of employees) {
  console.log(
    employee.name.padEnd(20) +
      employee.hoursWorked.toFixed(2).padEnd(10) +
      (`$${employee.regularPay.toFixed(2)}`).padEnd(15) +
      (`$${employee.overtimePay.toFixed(2)}`).padEnd(15) +
      `$${employee.totalPay.toFixed(2)}`
  );
}

console.log("\nHighest-paid employee: " + highestPaidEmployee.name);
console.log("Total pay: $" + highestPaidEmployee.totalPay.toFixed(2));
