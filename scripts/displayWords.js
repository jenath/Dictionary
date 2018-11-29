let savedWords = JSON.parse(localStorage.getItem("words"));
let savedList = document.querySelector("#savedList");
let back = document.querySelector("#back");

// create Li and append to document
if (savedWords) {
  savedWords.forEach(val => {
    let li = document.createElement('li');
    let textNode = document.createTextNode(val);
    let btn = document.createElement('button');
    btn.className = "deleteBtn"
    li.appendChild(textNode);
    li.appendChild(btn);
    savedList.appendChild(li);
  });
}

// Delete button to remove from document

let deleteBtn = document.querySelectorAll(".deleteBtn");
if (deleteBtn) {
  deleteBtn.forEach(btn => {
    btn.addEventListener('click', event => {
      event.stopPropagation();
      let liItem = btn.parentElement;
      if (liItem.getElementsByTagName('p').length == 1) {
        liItem.removeChild(liItem.getElementsByTagName('p')[0]);
      };
      savedList.removeChild(liItem);
      let word = liItem.textContent;
      let index = savedWords.indexOf(word);
      if (index > -1) {
        savedWords.splice(index, 1);
      }
      localStorage.setItem("words", JSON.stringify(savedWords));
    })
  })
}



// Display description

savedList.addEventListener("click", e => {
  if (e.target.tagName == 'LI' && e.target.children.length == 1) {
    let word = e.target.textContent;
    let url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=1b93ab08-66da-40b0-be26-fe48d7400286`;
    fetch(url).then(resp => {
      return resp.json();
    }).then(data => {
      let para = document.createElement('p');
      let desc = document.createTextNode(data[0].shortdef[0]);
      para.style.display = "block";
      para.appendChild(desc);
      e.target.appendChild(para);
    });
  } else if (e.target.tagName == 'P') {
    e.target.style.display = "none";
  } else if (e.target.tagName == 'LI' && e.target.children[1].style.display == "block") {
    e.target.children[1].style.display = "none";
  } else {
    e.target.children[1].style.display = "block";
  }
});

// Back button redirect

back.addEventListener('click', _ => {
  window.location = "../index.html"
  // window.location = "https://jenath.github.io/Dictionary/";
});
