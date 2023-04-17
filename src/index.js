import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}



function getTrivia(questions, difficulty) {
  let request = new XMLHttpRequest();
  const url = `https://opentdb.com/api.php?amount=${questions}&category=27&difficulty=${difficulty}&type=multiple`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response);
    }
  });
  request.open("GET", url, true);
  request.send();
}

function printElements(apiResponse) {
  const outputDiv = document.querySelector('#q-cards');
  apiResponse.results.forEach((element, index) => {
    const div = document.createElement("div");
    div.classList = "q-card";
    const p = document.createElement("p");
    p.innerHTML = element.question;
    div.append(p);
    // const
    let array = element.incorrect_answers.slice();
    array.push(element.correct_answer);
    const shuffledArray = shuffleArray(array);
    shuffledArray.forEach((q) => { 
      let radio = document.createElement("input");
      let label = document.createElement("label");
      let br = document.createElement("br")
      radio.setAttribute("id", `${q.toLowerCase().replace(/([\s])/g, "-")}`);
      radio.type = "radio";
      radio.value = q;
      radio.name = `question${index}`;
      label.setAttribute("for", `${q.toLowerCase().replace(/([\s])/g, "-")}`);
      label.innerText = q;
      div.append(radio, label, br);
    });

    outputDiv.prepend(div);
  });

}


function handleFormSubmission(e) {
  e.preventDefault();
  const numOfQs = document.getElementById("numOfQuestions").value;
  const difficulty = document.getElementById("difficulty").value;
  getTrivia(numOfQs, difficulty);
}




window.addEventListener("load", function() {
  this.document.querySelector("form").addEventListener("submit", handleFormSubmission);
});