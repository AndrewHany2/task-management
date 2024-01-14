import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredDto } from './dto/auth-cred.dto';

@Controller('auth')
export class AuthController {

    @Post('/signup')
    signUp(@Body() authCred: AuthCredDto){
        console.log("🚀 ~ AuthController ~ signUp ~ authCred:", authCred)
    }
}
