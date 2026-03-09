import { Controller, Get, Post, Req, Res, HttpStatus } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AppAuthService } from './service/auth';

@Controller()
export class AppController {
  constructor(private readonly appService: AppAuthService) {}

  @Post("/login")
  postLogin(@Req() req: Request, @Res() res: Response) {
    let username: string = req.body["username"]
    let password: string = req.body["password"]

    console.log(req.body["password"] === "123")

    if (!username || !password) {
      return res.status(HttpStatus.BAD_REQUEST).json({"message": "no credential provided"})
    }


    res.status(HttpStatus.OK).json({"message": "success", "token": req.headers["user-agent"]})
}

  @Post("/register")
  postRegister(): string {
    return this.appService.register()
  }
}
