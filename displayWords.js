let savedWords = JSON.parse(localStorage.getItem("words"));

savedWords.forEach(val => {
 document.write(`<h1>${val}<h1>` + '<br>');
})
