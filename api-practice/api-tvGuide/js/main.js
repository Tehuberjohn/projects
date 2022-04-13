//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)
function arrayToString(arr){
  arr.join(', ')
}
function getFetch(){
  const choice = document.querySelector('input').value
  const url =  `https://api.tvmaze.com/search/shows?q=${choice}`
  
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        let show = data[0].show
        let score = show.rating.average ? `Rating: ${show.rating.average} / 10` : 'Rating: unrated'
        let genre = show.genres.join(', ')
        console.log(show.genres)
        document.querySelector('img').src = show.image.original
        document.querySelector('h2').innerText = show.name
        document.getElementById('summary').innerHTML = String(show.summary.replaceAll('<p>','').replace('</p>',''))
        document.getElementById('language').innerText = `language: ${show.language}`
        document.getElementById('site').innerText = `website: ${show.officialSite}`
        document.getElementById('score').innerText = score
        document.getElementById('genre').innerText = `genre: ${genre}`
      })
      .catch(err => {
        console.log(`error ${err}`)
      });
}