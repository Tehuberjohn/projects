//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

const docId = (ele => document.getElementById(ele))
const qrySel = (ele => document.querySelector(ele))

function getFetch(){
  const choice = document.querySelector('input').value
  const url = `https://pokeapi.co/api/v2/pokemon/${choice}`
  console.log(url)
  document.getElementById('type').innerText = ''
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
      let id = data.id
      let idUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}`
      console.log(idUrl)
      let weight = data.weight/10, height = data.height/10
      console.log(height)
      qrySel('h3').innerText = `${data.name} - #${data.id}`
      qrySel('img').src = data.sprites.front_default
      docId('weight').innerText = `Weight: ${weight} kg`
      docId('height').innerText = `Height: ${height} m`
      for(let i = 0; i < data.types.length;i++){
      let ul = docId("type");
      let li = document.createElement("li");
        li.value = data.types[i].type.name
        li.innerText = data.types[i].type.name
        ul.appendChild(li)
        fetch(idUrl)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
          let flavorText = data.flavor_text_entries[0].flavor_text
          docId('about').innerText = flavorText.replace('\f', ' ').replace('\n', ' ')
        })
      }
      })
      .catch(err => {
          console.log(`error ${err}`)
      })
}