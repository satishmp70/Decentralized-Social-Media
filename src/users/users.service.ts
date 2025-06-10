import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUpdateUserDto } from './dto/create-update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findByWallet(wallet: string) {
    return this.repo.findOneBy({ wallet_address: wallet });
  }

  async createOrUpdate(dto: CreateUpdateUserDto) {
    const user = await this.repo.findOneBy({ wallet_address: dto.wallet_address });
    if (user) {
      return this.repo.save({ ...user, ...dto });
    }
    return this.repo.save(dto);
  }
}