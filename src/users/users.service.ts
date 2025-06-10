import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUpdateUserDto } from './dto/create-update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findOne(walletAddress: string): Promise<User> {
    const user = await this.repo.findOneBy({ wallet_address: walletAddress });
    if (!user) {
      throw new NotFoundException(`User with wallet address ${walletAddress} not found`);
    }
    return user;
  }

  async create(dto: CreateUpdateUserDto): Promise<User> {
    const user = this.repo.create(dto);
    return this.repo.save(user);
  }

  async update(walletAddress: string, dto: CreateUpdateUserDto): Promise<User> {
    const user = await this.findOne(walletAddress);
    Object.assign(user, dto);
    return this.repo.save(user);
  }
}