//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value
  const url =  `https://api.tvmaze.com/search/shows?q=${choice}`
  
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        let show = data[0].show
        console.log(data[0].show)
        document.querySelector('img').src = show.image.original
        document.querySelector('h2').innerText = show.name
        document.getElementById('summary').innerHTML = String(show.summary.replaceAll('<p>','').replace('</p>',''))
      })
      .catch(err => {
        console.log(`error ${err}`)
      });
}