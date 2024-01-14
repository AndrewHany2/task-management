import {  Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredDto } from './dto/auth-cred.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ){
        
    }

    async signUp(authCred: AuthCredDto): Promise<void>{
        return this.userRepository.signUp(authCred)
    }
}
