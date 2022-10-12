import { Request, Response, NextFunction, Router } from "express"

export interface IRoute {
  path: string
  function: (req: Request, res: Response, next: NextFunction) => void
  method: keyof Pick<Router, "get" | "post" | "delete" | "patch" | "put">
}
