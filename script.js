const url = 'http://localhost:8080';
const img = document.querySelector('#questionImage');

let question = {};

function getNewQuestion() {
  return fetch(`${url}/question`)
    .then(response => response.json())
    .then((json) => {
      return new Promise((resolve, reject) => {
        resolve(json);
      })
    });
}

function update(firstTime) {
  getNewQuestion().then(data => {
    question = data;
    const downloadingImg = new Image();
    downloadingImg.src = question.imageUrl;
    setTimeout(() => {
      question.options.forEach((option, i) => {
        let optionElement = document.querySelector(`#option${i + 1}`);
        optionElement.classList.remove('incorrect');
        optionElement.classList.remove('correct');
        optionElement.textContent = option.title;
        optionElement.dataset.id = option.id;
      });
      questionImage.src = downloadingImg.src;
    }, firstTime ? 0 : 50);
  });
}


document.querySelectorAll('.options li').forEach(option => {
  option.addEventListener('click', (e) => {
    if (e.currentTarget.dataset.id == question.correctOptionArticleId)  {
      e.currentTarget.classList.add('correct');
    } else {
      e.currentTarget.classList.add('incorrect');
      document.querySelector(`[data-id='${question.correctOptionArticleId}']`).classList.add('correct');
    }
    update();
  });
});

update();
