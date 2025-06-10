import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUpdateUserDto } from './dto/create-update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':wallet')
  getProfile(@Param('wallet') wallet: string) {
    return this.usersService.findByWallet(wallet);
  }

  @Post()
  createOrUpdate(@Body() dto: CreateUpdateUserDto) {
    return this.usersService.createOrUpdate(dto);
  }
}