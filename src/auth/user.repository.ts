import { DataSource, EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredDto } from "./dto/auth-cred.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    constructor(dataSource: DataSource) {
       super(User, dataSource.createEntityManager());
    }
    async signUp(authCred: AuthCredDto): Promise<void>{
        const { username, password } = authCred;
        const user = new User();
        user.username = username;
        user.salt =  await bcrypt.genSalt(10);
        user.password = await this.hashPassword(password, user.salt);
        try {
            await user.save();
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(authCred: AuthCredDto): Promise<string> {
        const { username, password } = authCred;
        const user = await this.findOne({ where: { username } });
        if(user && await user.validatePassword(password)){
            return user.username;
        } else {
            return null;
        }
    }

    private async hashPassword(pass: string, salt: string): Promise<string>{
        return bcrypt.hash(pass, salt)
    }
}