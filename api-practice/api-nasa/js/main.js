//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/
document.querySelector('button').addEventListener('click', getFetch)

function cleanStr(str){
    let strArr = str.split('')
    let result = strArr.map(ele => ele === ' '|| ele === '/' ? ele = '-' :ele = ele);
    if(result.length >10 || result.length <10){
        alert('Enter a correct date')
    }else{
        return result.join('')
    }
}
function getFetch(){
  const choice = cleanStr(document.querySelector('input').value)
  const url = `https://api.nasa.gov/planetary/apod?date=${choice}&api_key=x70f00qQ9Fsz27dDNMFXnpn8QxYQptA2gaLQmgHs`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        let title = `${data.title} by ${data.copyright}`
        console.log(choice)
        document.querySelector('h2').innerText = title
        document.querySelector('h5').innerText = data.date
        document.querySelector('img').src = data.hdurl
        document.querySelector('p').innerText = data.explanation
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}