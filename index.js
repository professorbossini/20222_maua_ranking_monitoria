require('dotenv').config()
const axios = require('axios')
const cors = require('cors')
const express = require('express')
const titleCase = require('title-case')
const _ = require('underscore')



const {
        GOOGLE_KEY, GOOGLE_SHEET_NAME, GOOGLE_SHEET_ID, GOOGLE_BASE_URL_SHEET, PORT
} = process.env


const app = express()
app.use(express.json())
app.use(cors())
app.get('/ranking', async (req, res) => {
    try{
        const url = `${GOOGLE_BASE_URL_SHEET}/${GOOGLE_SHEET_ID}/values/${GOOGLE_SHEET_NAME}?key=${GOOGLE_KEY}`
        const dados = await axios.get(url)
        const ranking = dados.data.values.slice(1).map(dado => {
            return {
                ra: dado[0],
                nome: dado[1],
                pontos: dado.slice(2).reduce((acc, curr) => acc + Number(curr), 0)
            }
        })
        res.json(_.sortBy(_.sortBy(ranking, 'nome').reverse(), 'pontos').reverse())
    }
    catch(error){
        console.log(error)
        res.send('Tente novamente mais tarde')
    }
})

app.get('/', (req, res) => {
    res.send('Yep, I\'m around')
})


app.listen(PORT || 3000, () => {
    console.log(`Up and running on port ${PORT}`)
})
