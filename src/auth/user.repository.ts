import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredDto } from "./dto/auth-cred.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(authCred: AuthCredDto): Promise<void>{
        const { username, password } = authCred;

        const user = new User();
        user.username = username;
        user.password = password;

        await user.save()
    }
}