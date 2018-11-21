let savedWords = JSON.parse(localStorage.getItem("words"));
let savedList = document.querySelector("#savedList");
let back = document.querySelector("h1 button");

// Removal button for word

savedWords.forEach(val => {
  let li = document.createElement('li');
  let textNode = document.createTextNode(val);
  li.appendChild(textNode);
  savedList.appendChild(li);
})


savedList.addEventListener("click", e => {

  if (event.target.children[0] === undefined) {
    let word = e.target.textContent;
    let url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=1b93ab08-66da-40b0-be26-fe48d7400286`;

    fetch(url).then(resp => {
      return resp.json();
    }).then(data => {
      let para = document.createElement('p');
      let desc = document.createTextNode(data[0].shortdef[0]);
      para.appendChild(desc);
      e.target.appendChild(para);
    });
  } else if (event.target.children[0].style.display === "none") {
    event.target.children[0].style.display = "block";
  } else {
    event.target.children[0].style.display = "none";
  }
});

back.addEventListener('click', _ => {
  window.location = "../public/index.html";
})
