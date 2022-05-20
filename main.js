class AsyncGame {
    constructor() {
        this.API_BASE = 'https://u-workshops.herokuapp.com'
    }

    /*
        Note: most of these methods will use the `fetch` API
        It's ok if you don't fully understand it yet! You can think of it as a 'blackbox' for now
    */

    async createUser(name) {
        // POST request to the /new_user endpoint
        console.log('creating user');
        const response_id = await fetch (this.API_BASE+"/new_user", {
          method: "POST",
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
          body: JSON.stringify({name})
        });
        if (!response_id.ok) {
          throw new Error(`Some error! status: ${response.status}`);
        } else {
          console.log(response_id);
        }
    }

    async addToQABank(ownerId, question, answer) {
        // POST request to /new_qa
        console.log('creating user');
        const response_id = await fetch (this.API_BASE+"/new_qa", {
          method: "POST",
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
          body: JSON.stringify({ownerId, question, answer})
        });
        if (!response_id.ok) {
          throw new Error(`Some error! status: ${response.status}`);
        } else {
          console.log(response_id);
        }
    }

    async getAllQuestions() {
        // GET request to /all_questions
        console.log('Getting questions');
        const response = await fetch (this.API_BASE+"/all_questions", {
          method: "GET",
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
        });
        if (!response) {
          throw new Error(`Some error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        // Note! More questions will be added as other students progress in this workshop.
        // Ask around to see who's added new questions!
    }

    async answerQuestion(qaId, answer, userId) {
        console.log('Answering question');
        const response = await fetch (this.API_BASE+"/answer_question", {
          method: "POST",
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
          body: JSON.stringify({qaId, answer, userId})
        });
        if (!response) {
          throw new Error(`Some error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        // POST request to /answer_question
        // Note! In the response of this request you'll see whether your answer was correct or not.
        // If you answered incorrectly, try again or bring it up with the user who posted the question!
    }

    async getAnswerSubmissions() {
        // GET request to /answer_submissions
        console.log('Getting answer submissions');
        const response = await fetch (this.API_BASE+"/answer_submission", {
          method: "GET",
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
        });
        if (!response) {
          throw new Error(`Some error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }

    async getUsers(){
        // GET request to /the_users
        console.log('Getting users');
        const response = await fetch (this.API_BASE+"/the_users", {
          method: "GET",
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
        });
        if (!response) {
          throw new Error(`Some error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    }

    async calculateUserScores() {
        // +1 points for questions you've answered correctly
        // -1 points for questions you've answered incorrectly

        // This is the most "complicated" method - but you've got this ;)

        // Guidelines for this part (ignore if you want an extra challenge!)
        /*
            - Get the users
            - Get the submissions
            - Create an `scores` object
            - Loop through each user ID
                - Extract the username
                - Filter the correct submissions with matching user ID
                - Filter the incorrect submissions with matching user ID
                - Add a new entry to `scores` with the user's name and their score (correct.length - incorrect.length)

            Example of `score` at the end of this:
            {
                Kayla: 12,
                Darwin: -1
            }
        */
        const users = await this.getUsers();
        console.log(users);
        const answers = await this.getAnswerSubmissions();
        console.log(answers);
        // const scores =  {};
        // users.forEach(user => {

        // });

    }
}

const game = new AsyncGame();
// game.createUser('Anna');
// game.getUsers();
// game.addToQABank(5, "What is the capital of GB?", 'London');
// game.getAllQuestions();
// game.answerQuestion(1, 100, 23);
// game.getAnswerSubmissions();
game.calculateUserScores();

// Remember the server is unexpected, it might return an error!

// Example of running the game:
// game.createUser("Frank")
// game.addToQABank({question: "How many legs does a cat have?", answer: 4, ownerId: YOUR_USER_ID})

// game.getAllQuestions()
// game.answerQuestion({qaId: ID_FROM_SERVER, answer: YOUR_ANSWER, userId: YOUR_USER_ID})

// game.getUsers() // <-- how can you output the results from here *without* console.log in the method?
// game.getAnswerSubmissions()
// game.calculateUserScores()
