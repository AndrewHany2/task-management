import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredDto } from './dto/auth-cred.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService) {}
    
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCred: AuthCredDto): Promise<void> {
        return this.authService.signUp(authCred);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCred: AuthCredDto) {
        return this.authService.signIn(authCred);
    }
}
