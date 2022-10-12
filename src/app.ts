import express, { Express } from "express"
import { UserController } from "./users/users.controller"
import { Server } from "http"
import { LoggerService } from "./logger/logger.service"
import { ExeptionFilter } from "./errors/exeption.filter"

export class App {
  app: Express
  port: number
  server: Server
  logger: LoggerService
  userController: UserController
  exeptionFilter: ExeptionFilter

  constructor(
    logger: LoggerService,
    userController: UserController,
    exeptionFilter: ExeptionFilter
  ) {
    this.app = express()
    this.port = 8000
    this.logger = logger
    this.userController = userController
    this.exeptionFilter = exeptionFilter
  }

  useRoutes() {
    this.app.use("/users", this.userController.router)
  }

  public async init() {
    this.useRoutes()
    this.useExceptionFilters()
    this.server = this.app.listen(this.port)
    this.logger.log(`server started on https://localhost:${this.port}`)
  }

  useExceptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
  }
}
