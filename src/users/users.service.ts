import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>
    ){}

    async signUp(signUpDto: SignUpDto): Promise<Users> {
        const { username, password } = signUpDto;

        const existingUser = await this.usersRepository.findOne({ where: { username } });
        if (existingUser) {
            throw new ConflictException({
                message: ['username already in use']
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = this.usersRepository.create({
            username,
            password: hashedPassword,
        });

        return await this.usersRepository.save(user);
    }

    async findOneUser(username: string): Promise<Users | null>{
        const user = this.usersRepository.findOne({where:{username:username}})
        return user
    }
}
