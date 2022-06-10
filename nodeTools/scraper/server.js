const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const app = express()

const PORT = process.env.PORT || 8000
const url = 'https://www.scotts.com/en-us/library/grass-seed/identify-your-grass'

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        let grassTypes = []

        $('.paragraph--view-mode--article-side-image', html).each(function() {
            const name = $(this).find('h3').attr('id')
            const description = $(this).find('p').text()
            const blade = $(this).find('p > span:nth(0)').text()
            const appearance = $(this).find('p > span:nth(1)').text()
            const growth = $(this).find('p > span:nth(2)').text()
            const water = $(this).find('p > span:nth(3)').text()
            const popularity = $(this).find('p > span:nth(4)').text()
            const activity = $(this).find('h3').text()
           grassTypes.push({
               name,
               description,
               blade,
               appearance,
               growth,
               water,
               popularity,
               activity
           })
        })
        console.log(grassTypes)
    }).catch(err => console.log(err))

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})