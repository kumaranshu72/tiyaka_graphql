import express from 'express'
import * as bodyParser from 'body-parser'
import { connect } from 'mongoose'
import { PubSub } from 'graphql-yoga'
import { express_graphql } from 'express_graphql'

import router from './routes'
import { MONGO_URL } from './config'
import { typeDefs, resolvers } from './graphQL'

class App {
  constructor() {
    this.app = express()
    this.config()
    this.mountRoutes()
  }

  config() {
    // DB Connection
    connect(MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    // support application/json type post data
    this.app.use(bodyParser.json())
    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }))
    const pubsub = new PubSub()
    this.app.use('/graphql', express_graphql({
      typeDefs,
      rootValue: resolvers,
      context: { pubsub },
      graphiql: true,
    }))
  }

  mountRoutes() {
    this.app.use(router)
  }
}

export default new App().app
