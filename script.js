const search = document.querySelector("#search");

// request to Oxford dictionary API

search.addEventListener('click', _ => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = _ => {
    if (this.readyState == 4 && this.status == 200) {

    }
  }
});
