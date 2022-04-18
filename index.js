require('dotenv').config()
const axios = require('axios')
const cors = require('cors')
const express = require('express')
const titleCase = require('title-case')
const _ = require('underscore')

const {GOOGLE_KEY, GOOGLE_SHEET_NAME, GOOGLE_SHEET_PRE_PROGRAMACAO_ID, GOOGLE_BASE_URL_SHEET, PORT} = process.env


const app = express()
app.use(express.json())
app.use(cors())
app.get('/pre_prog/ranking', async (req, res) => {
    try{
        const url = `${GOOGLE_BASE_URL_SHEET}${GOOGLE_SHEET_PRE_PROGRAMACAO_ID}/values/${GOOGLE_SHEET_NAME}?key=${GOOGLE_KEY}`
        const dados = await axios.get(url)
        const ranking = dados.data.values.slice(1).map(dado => {
            return {
                ra: dado[0],
                nome: titleCase.titleCase((dado[1])),
                ies: titleCase.titleCase((dado[2])),
                pontos: dado.slice(3).reduce((acc, curr) => acc + Number(curr), 0)
            }
        })
        res.json(_.sortBy(ranking, 'pontos').reverse())
    }
    catch(error){
        console.log(error)
        res.send('Tente novamente mais tarde')
    }
})

app.get('/tech_in_oracle/ranking', (req, res) => {
    res.end()
})

app.get('/', (req, res) => {
    res.send('Yep, I\'m around')
})


app.listen(PORT, () => {
    console.log(`Up and running on port ${PORT}`)
})
