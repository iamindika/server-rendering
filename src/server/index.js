import express from 'express'
import cors from 'cors'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../shared/App'
import serialize from 'serialize-javascript'
import { matchPath, StaticRouter } from 'react-router-dom'
import routes from '../shared/routes'

const PORT = 3000
const app = express()

app.use(cors())
app.use(express.static('public'))

app.get('*', (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve()

  promise.then((data) => {
    const context = { data }

    const markup = renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    )
  
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SSR with RR</title>
          <script src='/bundle.js' defer></script>
          <script>
            window.__INITIAL_DATA__ = ${serialize(data)}
          </script>
        </head>
        <body>
          <div id='app'>${markup}</div>
        </body>
      </html>
    `)
  }).catch(next)
})
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})