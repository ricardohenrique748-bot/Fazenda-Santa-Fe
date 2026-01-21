import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class DebugJwtGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        console.log('DEBUG: --- Guard Debug Start ---');
        console.log('DEBUG: URL:', request.url);
        console.log('DEBUG: Method:', request.method);
        console.log('DEBUG: Auth Header:', request.headers.authorization);
        if (info) console.log('DEBUG: Info (Error):', info.message);
        if (err) console.log('DEBUG: Error:', err);
        if (user) console.log('DEBUG: User decoded:', user);
        console.log('DEBUG: --- Guard Debug End ---');
        return super.handleRequest(err, user, info, context);
    }
}
