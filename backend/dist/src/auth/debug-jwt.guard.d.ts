import { ExecutionContext } from '@nestjs/common';
declare const DebugJwtGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class DebugJwtGuard extends DebugJwtGuard_base {
    handleRequest(err: any, user: any, info: any, context: ExecutionContext): any;
}
export {};
