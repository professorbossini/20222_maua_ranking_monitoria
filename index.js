require('dotenv').config()
const axios = require('axios')
const express = require('express')

const {GOOGLE_KEY, GOOGLE_SHEET_PRE_PROGRAMACAO_ID, GOOGLE_BASE_URL_SHEET} = process.env


// const testeAxios = () => {
//     const url = `${GOOGLE_BASE_URL_SHEET}${GOOGLE_SHEET_PRE_PROGRAMACAO_ID}/values/Sheet1?key=${GOOGLE_KEY}`
//     console.log(url)
//     console.log(url)
//     axios.get(url)
//         .then(response => {
//             console.log(response.data)
//         })
//         .catch(error => {
//             console.log(JSON.stringify(error))
//         })
// }

// testeAxios()