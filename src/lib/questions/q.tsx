/*
  Question Library
  ©2025 AlcuPhi. Open source under the CC0 license.
*/
import * as fs from "fs";

/*
  Generate the question with an algorithm based on type and user score, will work on that later
*/
export function generateQuestion(tags: string) {
  let possibleQuestions = [];
  // Get working directory
  const cwd = process.cwd();
  // Find all files in the working directory
  for (const file of fs.readdirSync(cwd)) {
    console.log(file);
  }
  console.log(cwd);
  // Read each type of question
  // Check all question sets
  for (const file of fs.readdirSync("./questions")) {
    // Reading all question sets
    const questionSet = JSON.parse(
      fs.readFileSync(`./questions/${file}`, "utf-8"),
    );
    // Random matching
    for (const question of questionSet.questions) {
      if (question.tags.includes(tags) || tags == "*") {
        possibleQuestions.push(
          {
            displayMethod: question.displayMethod,
            id: question.id,
            question: question.question,
            difficulty: question.difficulty,
            tags: question.tags,
            type: question.type,
            answerMethod: question.answerMethod,
          }
        );
      }
    }

    
  }
  return possibleQuestions[0];
}

/*
  Fetch the question by ID
*/
export function fetchQuestion(id: string) {
  // Read each type of question
  // Check all question sets
  for (const file of fs.readdirSync("./questions")) {
    // Reading all question sets
    const questionSet = JSON.parse(
      fs.readFileSync(`./questions/${file}`, "utf-8"),
    );
    // Random matching
    for (const question of questionSet.questions) {
      if (id == question.id) {
        return question;
      }
    }
  }
}
