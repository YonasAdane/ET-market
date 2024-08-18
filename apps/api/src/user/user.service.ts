import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from 'src/database/database.service';
import { Prisma as PrismaSchema } from '@repo/database/src';
@Injectable()
export class UserService {
  constructor(private readonly prisma:Prisma){}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number): Promise<object | null> {
    return this.prisma.user.findFirst({ where: { id } });
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number):Promise<any> {
    return this.prisma.user.delete({where:{id}});
  }
}
