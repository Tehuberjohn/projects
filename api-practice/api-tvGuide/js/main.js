//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value
  const url =  `https://api.tvmaze.com/search/shows?q=${choice}`
  
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        let show = data[0].show
        let score = show.rating.average ? `Rating: ${show.rating.average} / 10` : 'Rating: unrated'
        let genre = show.genres.join(', ')
        let showEnd = show.ended ? show.ended : 'present'
        let runningStats = `Original release: ${show.premiered} - ${showEnd}`
        console.log(show.genres)
        document.querySelector('img').src = show.image.original
        document.querySelector('h2').innerText = show.name
        document.getElementById('summary').innerHTML = String(show.summary.replaceAll('<p>','').replace('</p>',''))
        document.getElementById('language').innerText = `language: ${show.language}`
        document.getElementById('site').innerText = `website: ${show.officialSite}`
        document.getElementById('score').innerText = `${score} | Episode Length: ${show.averageRuntime} mins`
        document.getElementById('genre').innerText = `genre: ${genre}`
        document.getElementById('runningStats').innerText = runningStats

      })
      .catch(err => {
        console.log(`error ${err}`)
      });
}