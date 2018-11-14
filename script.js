window.onload = () => {

  const searchBtn = document.querySelector("#searchBtn");
  const query = document.querySelector("#query");
  const queryfield = document.querySelector(".queryfield");

  let saveBtn = document.createElement('button');


  queryfield.addEventListener('click', _ => {
    query.focus();
  });

  // request to Oxford dictionary API
  // https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=your-api-key

  let savedArr = [];

  searchBtn.addEventListener('click', _ => {
    // if a description of a word is displayed remove it before adding the next word searched
    const card = document.querySelector("#card");
    if (card) card.parentNode.removeChild(card);

    // user search word and API call using the users imput
    let word = query.value;
    let url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=1b93ab08-66da-40b0-be26-fe48d7400286`;

    // API call to retrieve data & display it on the page
    fetch(url).then(resp => {
      return resp.json();
    }).then(data => {
      let card = document.createElement('section');
      let h1 = document.createElement('h1');
      let para = document.createElement('p');
      let desc = document.createTextNode(data[0].shortdef[0]);
      word = word.charAt(0).toUpperCase() + word.slice(1);
      word = document.createTextNode(word);
      h1.appendChild(word);
      h1.appendChild(saveBtn);
      para.appendChild(desc);
      card.appendChild(h1);
      card.appendChild(para);
      card.setAttribute("id", "card");
      document.body.appendChild(card);

      word = document.querySelector("#card h1").textContent;

      if(savedArr.includes(word)) {
        saveBtn.style.backgroundColor = "yellow";
      } else {
        saveBtn.style.backgroundColor = "transparent";
      }

    }).catch(err => {
      let card = document.createElement('section');
      let desc = document.createTextNode('Sorry that word does not exist');
      card.setAttribute("id", "card");
      card.appendChild(desc);
      document.body.appendChild(card);
    })
  });

  saveBtn.addEventListener('click', _ => {
    let word = document.querySelector("#card h1").textContent;
    let size = savedArr.length;

    if (!savedArr.includes(word)) {
      savedArr.push(word);
      saveBtn.style.backgroundColor = "yellow";
    } else {
      const index = savedArr.indexOf(word);
      savedArr.splice(index, 1);
      saveBtn.style.backgroundColor = "transparent";
    }

    console.log(savedArr);
  });
}
