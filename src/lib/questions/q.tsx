/*
  Question Library
  ©2025 AlcuPhi. Open source under the CC0 license.
*/
import { db } from "@/db/db";
import { questionLog } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as fs from "fs";

/*
  Generate the question with an algorithm based on type and user score, will work on that later
*/
export async function generateQuestion(tags: string, user: any) {
  let log = (await (await db()).select().from(questionLog).where(eq(user.id, questionLog.userID)))
  // Define variables for log
  let totalQuestions = 0;
  let correctQuestions = 0;
  // Foreach
  log.forEach((element) => {
    // Check if element includes tags and if element is correct
    if (element.correct && ((element.tags.includes(tags) || tags == "*"))) {
      // TODO: Make better difficulty rating algorithm
      correctQuestions++;
    }
    totalQuestions++;
  })

  let possibleQuestions = [];
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
  // Check possible questions
  // @ts-expect-error ofc we would have this
  let questions = [];
  // Append if difficulty is greater
  possibleQuestions.forEach((question) => {
    // Check if ratio is greater than difficulty or question difficulty is 0
    if ((((1.0 * correctQuestions)/totalQuestions) * 10) >= question.difficulty || question.difficulty == 0) {
      questions.push(question)
    }
  })
  // Return
  // @ts-expect-error ofc we would have this issue
  return questions[Math.trunc((Math.random() * questions.length))];
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
