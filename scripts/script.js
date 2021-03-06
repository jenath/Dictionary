window.onload = () => {
  const searchBtn = document.querySelector("#searchBtn");
  const query = document.querySelector("#query");
  const queryfield = document.querySelector(".queryfield");
  const saveBtn = document.querySelectorAll(".utility button")[1];
  const history = document.querySelectorAll(".utility button")[0];

  let star = document.createElement('button');

  queryfield.addEventListener('click', _ => {
    query.focus();
  });

  // request to Oxford dictionary API
  // https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=your-api-key

  let savedArr = [];
  let historyArr = [];

  // Query search

  searchBtn.addEventListener('click', _ => {

    // If a description of a word is displayed remove it before adding the next word searched

    const card = document.querySelector("#card");
    const error = document.querySelector("#error");

    if (card) {
      card.parentNode.removeChild(card);
    } else if (error) {
      error.parentNode.removeChild(error);
    }

    // user search word and API call using the users imput

    let word = query.value.trim();
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
      h1.appendChild(star);
      para.appendChild(desc);
      card.appendChild(h1);
      card.appendChild(para);
      card.setAttribute("id", "card");
      document.body.appendChild(card);

      word = document.querySelector("#card h1").textContent;

      if(savedArr.includes(word) && localStorage.getItem("words") === null) {
        star.style.backgroundColor = "yellow";
      } else if (localStorage.getItem("words") !== null && localStorage.getItem("words").includes(word) || savedArr.includes(word)) {
        star.style.backgroundColor = "yellow";
      } else {
        star.style.backgroundColor = "transparent";
      }

      // Save searched work in history

      // Check to see if history array exists in localStorage

      if (localStorage.getItem("history")) {
        historyArr = JSON.parse(localStorage.getItem("history"));
      }

      // Check the length of the history array

      if (historyArr.length > 9) {
        historyArr.pop();
      }

      if (card) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
        historyArr.unshift(word);
        localStorage.setItem("history", JSON.stringify(historyArr));
      }

    }).catch(err => {
      let card = document.createElement('section');
      let desc = document.createTextNode('Sorry that word does not exist');
      card.setAttribute("id", "error");
      card.appendChild(desc);
      document.body.appendChild(card);
    })
  });

  // Star to save word

  star.addEventListener('click', _ => {
    let word = document.querySelector("#card h1").textContent;
    let size = savedArr.length;

    if (localStorage.getItem("words") === null) {
      localStorage.setItem("words", JSON.stringify(savedArr));
    }

    if (localStorage.getItem("words") !== null && star.style.backgroundColor === "transparent") {
      let arr = JSON.parse(localStorage.getItem("words"));
      arr.push(word);
      let newArray = Array.from(new Set(arr));
      localStorage.setItem("words", JSON.stringify(newArray));
    } else if (star.style.backgroundColor === "yellow") {
      let arr = JSON.parse(localStorage.getItem("words"));
      let index = arr.indexOf(word);
      if (index > -1) {
        arr.splice(index, 1);
      }
      let newArray = Array.from(new Set(arr));
      localStorage.setItem("words", JSON.stringify(newArray));
    }

    if (!savedArr.includes(word)) {
      savedArr.push(word);
      star.style.backgroundColor = "yellow";
    } else {
      const index = savedArr.indexOf(word);
      savedArr.splice(index, 1);
      star.style.backgroundColor = "transparent";
    }
    console.log(savedArr);
  });

  // Enter button to query search result

  queryfield.addEventListener("keyup", e => {
    if(e.keyCode === 13) searchBtn.click();
  })

  // Direct to saved page

  saveBtn.addEventListener("click", _ => {
    // window.location = "savedWords.html"
    window.location = "https://jenath.github.io/Dictionary/savedWords.html";
  });

  // Direct to history page

  history.addEventListener('click', _ => {
    // window.location = "history.html";
    window.location = "https://jenath.github.io/Dictionary/history.html";
  })

}
