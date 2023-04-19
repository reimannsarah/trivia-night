export default class TriviaService {
  static getTrivia(questions, difficulty) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://opentdb.com/api.php?amount=${questions}&category=27&difficulty=${difficulty}&type=multiple`;
    
      request.addEventListener("loadend", function() {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      });
      request.open("GET", url, true);
      request.send();
    });
  }
}