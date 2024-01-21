import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthCredDto } from './dto/auth-cred.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator'
import { User } from './user.entity';
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService) {}
    
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCred: AuthCredDto): Promise<void> {
        return this.authService.signUp(authCred);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCred: AuthCredDto): Promise<{ accessToken:string }> {
        return this.authService.signIn(authCred);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User){
        console.log("🚀 ~ AuthController ~ test ~ req:", user)
    }
}
