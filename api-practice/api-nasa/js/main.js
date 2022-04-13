//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value
  const url = `https://api.nasa.gov/planetary/apod?date=${choice}&api_key=x70f00qQ9Fsz27dDNMFXnpn8QxYQptA2gaLQmgHs`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        let credited = data.copyright? data.copyright : 'uncredited'
        let title = `${data.title} by ${credited}`
        let video = document.querySelector('iframe')
        let image = document.querySelector('img')
        console.log(url)
        document.querySelector('h2').innerText = title
        document.querySelector('h5').innerText = data.date
        document.querySelector('p').innerText = data.explanation
        if(data.media_type === 'image'){
            image.src = data.hdurl
            video.classList.add("hidden")
            image.classList.remove("hidden")
        }else if(data.media_type === 'video'){
            video.src = data.url
            image.classList.add("hidden")
            video.classList.remove("hidden") 
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}