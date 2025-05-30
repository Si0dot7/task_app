import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local/local-auth.guards';

@Controller('auth')
export class AuthController {

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    signin(@Request() req:any): Promise<any>{
        return req.user
    }

}
