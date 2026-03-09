import { Controller, Param, Get, Post, Req, Res, HttpStatus } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AppUserService } from './service/user';

@Controller()
export class AppController {
  constructor(private readonly userService: AppUserService) {}

  @Get("/user/:id")
  postLogin(@Param('id') id: string) {
    return this.userService.get_user(id)
  }
}