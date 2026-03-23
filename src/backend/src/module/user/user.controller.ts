import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from '../auth/auth.guard';
import { ZodValidationPipe } from '../../common/validators/zod-validation.pipe';
import { type PutMeDto, PutMeSchema } from './dtos/put-me.dtos';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { extname } from 'path';
import { USER_AVATAR_FILE_EXTENSION } from '../../common/constants/constants';
import { Throttle } from '@nestjs/throttler';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @HttpCode(HttpStatus.OK)
  @Get('/me')
  public async getUser(@Request() req) {
    return await this.userService.getUser(req.user.sub, [
      'id',
      'username',
      'name',
      'biography',
      'avatar',
      'created_at',
      'last_seen_at',
      'email',
      'status',
    ]);
  }

  @Auth()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);
        if (USER_AVATAR_FILE_EXTENSION.includes(ext)) {
          cb(null, true);
        } else {
          return cb(
            new BadRequestException(
              `Only ${USER_AVATAR_FILE_EXTENSION.join(', ')}, files are allowed!`,
            ),
            false,
          );
        }
      },
    }),
  )
  @Put('/me')
  @Throttle({ default: { ttl: 30000, limit: 2 } })
  public async putUser(
    @Request() req,
    @Body(new ZodValidationPipe(PutMeSchema)) body: PutMeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.userService.editUser(req.user.sub, body, file);
  }

  @Auth()
  @Header('Content-Type', 'image/png')
  @Get('/me/avatar')
  @Throttle({ default: { ttl: 1000, limit: 10 } })
  public async getUserAvatar(@Request() req) {
    return await this.userService.getUserAvatar(req.user.sub);
  }

  @Auth()
  @HttpCode(HttpStatus.OK)
  @Get('/user/:id')
  public async getUserById(@Param('id') id: number) {
    return await this.userService.getUser(id, [
      'id',
      'username',
      'name',
      'biography',
      'avatar',
      'created_at',
      'last_seen_at',
      'status',
    ]);
  }

  @Auth()
  @HttpCode(HttpStatus.OK)
  @Get('/user/:id/avatar')
  @Throttle({ default: { ttl: 1000, limit: 100 } })
  public async getUserAvatarById(@Param('id') id: number) {
    return await this.userService.getUserAvatar(id);
  }
}
