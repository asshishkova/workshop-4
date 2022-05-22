class AsyncGame {
    constructor() {
        this.API_BASE = 'https://u-workshops.herokuapp.com',
        this.headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'}
    }
    failureHandler(error, method) {
      console.log(`Request in ${method} failed: ${JSON.stringify(error)}`);
    }

    async createUser(name) {
        // POST request to the /new_user endpoint
        const method = 'createUser'
        try {
          const response = await fetch (this.API_BASE+"/new_user", {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({name})
          });
          const data = await response.json();
          if (data.error) {
            this.failureHandler(data, method);
            return;
          }
          return data.userId;
        } catch (error) {
          this.failureHandler(error, method);
        }
    }

    async addToQABank(ownerId, question, answer) {
        // POST request to /new_qa
        const method = "addToQABank";
        try {
          const response = await fetch (this.API_BASE+"/new_qa", {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ownerId, question, answer})
          });
          const data = await response.json();
          if (data.error) {
            this.failureHandler(data, method);
            return;
          }
          console.log(method, data);
        } catch (error) {
          this.failureHandler(error, method);
        }
    }

    async getAllQuestions() {
        // GET request to /all_questions
        const method = 'getAllQuestions';
        try {
          const response = await fetch (this.API_BASE+"/all_questions", {
            method: "GET",
            headers: this.headers
          });
          const data = await response.json();
          if (data.error) {
            this.failureHandler(data, method);
            return;
          }
          console.log(method, data);
        } catch (error) {
          this.failureHandler(error, method);
        }
    }

    async answerQuestion(qaId, answer, userId) {
        // POST request to /answer_question
        const method = 'answerQuestion'
        try {
          const response = await fetch (this.API_BASE+"/answer_question", {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({qaId, answer, userId})
          });
          const data = await response.json();
          if (data.error) {
            this.failureHandler(data, method);
            return;
          }
          console.log(method, data);
        } catch (error) {
          this.failureHandler(error, method);
        }
        // Note! In the response of this request you'll see whether your answer was correct or not.
        // If you answered incorrectly, try again or bring it up with the user who posted the question!
    }

    async getAnswerSubmissions() {
        // GET request to /answer_submissions
        const method = 'getAnswerSubmissions';
        try {
          const response = await fetch (this.API_BASE+"/answer_submission", {
            method: "GET",
            headers: this.headers,
          });
          const data = await response.json();
          if (data.error) {
            this.failureHandler(data, method);
            return;
          }
          return data;
        } catch (error) {
          this.failureHandler(error, method);
        }
    }

    async getUsers(){
        // GET request to /the_users
        const method = 'getUsers';
        try {
          const response = await fetch (this.API_BASE+"/the_users", {
            method: "GET",
            headers: this.headers,
          });
          const data = await response.json();
          // console.log(data);
          if (data.error) {
            this.failureHandler(data, method);
            return;
          }
          return data;
        } catch (error) {
          this.failureHandler(error, method);
        }
    }

    async calculateUserScores() {
        // +1 points for questions you've answered correctly
        // -1 points for questions you've answered incorrectly
        const method = 'calculateUserScores';
        const users = await this.getUsers();
        const answers = await this.getAnswerSubmissions();
        const scores = [];
        try {
          for (const userId in users) {
            const username = users[userId].name;
            const correctAnswers = answers.filter(answer => answer.userId == userId && answer.correct);
            const incorrectAnswers = answers.filter(answer => answer.userId == userId && !answer.correct);
            const score = correctAnswers.length - incorrectAnswers.length;
            scores.push({'userId': userId, 'name': username, 'score': score});
          }
        } catch (error) {
          this.failureHandler(error, method)
        }
        const sortedScores = scores.sort((a, b) => { return a.score > b.score ? -1 : 1 });
        for (const i in sortedScores) {
          console.log(`${sortedScores[i].name}(${sortedScores[i].userId}), score: ${sortedScores[i].score}`);
        }
    }
}

const game = new AsyncGame();
async function run() {
  const username = "Anna";
  const addQuestion = "What is the capital of GB?";
  const addAnswer = "London";
  const answerQuestionId = 1;
  const giveAnswer = 100;

  const userId = await game.createUser(username);
  console.log(userId);
  game.addToQABank(userId, addQuestion, addAnswer);
  game.answerQuestion(answerQuestionId, giveAnswer, userId);

  game.getAllQuestions();
  game.getAnswerSubmissions();
  game.calculateUserScores();
};

run();

// Remember the server is unexpected, it might return an error!

// Example of running the game:
// game.createUser("Frank")
// game.addToQABank({question: "How many legs does a cat have?", answer: 4, ownerId: YOUR_USER_ID})

// game.getAllQuestions()
// game.answerQuestion({qaId: ID_FROM_SERVER, answer: YOUR_ANSWER, userId: YOUR_USER_ID})

// game.getUsers() // <-- how can you output the results from here *without* console.log in the method?
// game.getAnswerSubmissions()
// game.calculateUserScores()
