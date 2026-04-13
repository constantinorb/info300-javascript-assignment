const readline = require("readline-sync");

function getValidScore(promptText) {
  let score;

  while (true) {
    score = Number(readline.question(promptText));

    if (!isNaN(score) && score >= 0 && score <= 100) {
      return score;
    }

    console.log("Invalid input. Please enter a score between 0 and 100.");
  }
}

function getLetterGrade(score) {
  if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}

function compareGrades(currentAverage, newAverage) {
  if (newAverage > currentAverage) {
    return "Improved";
  } else if (newAverage < currentAverage) {
    return "Declined";
  } else {
    return "Stayed the same";
  }
}

console.log("=== Grade Forecast Simulator ===");

const currentAverage = getValidScore("Enter your current average: ");
const examScores = [];

let howManyScores;

while (true) {
  howManyScores = Number(
    readline.question("How many hypothetical final exam scores would you like to enter? ")
  );

  if (!isNaN(howManyScores) && howManyScores > 0 && Number.isInteger(howManyScores)) {
    break;
  }

  console.log("Invalid input. Please enter a whole number greater than 0.");
}

for (let i = 0; i < howManyScores; i++) {
  const finalExamScore = getValidScore(`Enter hypothetical final exam score #${i + 1}: `);
  examScores.push(finalExamScore);
}

console.log("\n=== Grade Forecast Report ===");
console.log(
  "Final Exam".padEnd(15) +
    "Course Average".padEnd(18) +
    "Letter Grade".padEnd(15) +
    "Result"
);
console.log("-".repeat(60));

for (const finalExamScore of examScores) {
  const finalCourseAverage = currentAverage * 0.75 + finalExamScore * 0.25;
  const letterGrade = getLetterGrade(finalCourseAverage);
  const result = compareGrades(currentAverage, finalCourseAverage);

  console.log(
    finalExamScore.toFixed(2).padEnd(15) +
      finalCourseAverage.toFixed(2).padEnd(18) +
      letterGrade.padEnd(15) +
      result
  );
}
