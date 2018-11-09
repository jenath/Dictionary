window.onload = () => {
  const search = document.querySelector("#searchBtn");
  const query = document.querySelector("#query");
  // request to Oxford dictionary API
  // https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=your-api-key



  search.addEventListener('click', _ => {
    // if a description of a word is displayed remove it before adding the next word searched
    const card = document.querySelector("#card");
    if (card) card.parentNode.removeChild(card);

    // user search word and API call using the users imput
    const word = query.value;
    let url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=1b93ab08-66da-40b0-be26-fe48d7400286`;

    // API call to retrieve data & display it on the page
    fetch(url).then(resp => {
      return resp.json();
    }).then(data => {
      let card = document.createElement('section');
      let desc = document.createTextNode(data[0].shortdef[0]);
      card.setAttribute("id", "card");
      card.appendChild(desc);
      document.body.appendChild(card);
    }).catch(err => {
      let card = document.createElement('section');
      let desc = document.createTextNode('Sorry that word does not exist');
      card.setAttribute("id", "card");
      card.appendChild(desc);
      document.body.appendChild(card);
    })
  });
}
