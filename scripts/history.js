let back = document.querySelector("#back");
let history = JSON.parse(localStorage.getItem("history"));
let historySection = document.querySelector("#historySection")

back.addEventListener('click', _ => {
  window.location = "../index.html"
  // window.location = "https://jenath.github.io/Dictionary/";
});

history.forEach(val => {
  let li = document.createElement('li');
  let textNode = document.createTextNode(val);
  li.appendChild(textNode);
  historySection.appendChild(li);
})
