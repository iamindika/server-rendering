import express from 'express'
import cors from 'cors'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../shared/App';

const PORT = 3000
const app = express()

app.use(cors())
app.use(express.static('public'))

app.get('*', (req, res, next) => {
  const markup = renderToString(
    <App data='Scruffy'/>
  )

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR with RR</title>
        <script src='/bundle.js' defer></script>
      </head>
      <body>
        <div id='app'>${markup}</div>
      </body>
    </html>
  `)
})
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})