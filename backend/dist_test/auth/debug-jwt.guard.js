"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugJwtGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let DebugJwtGuard = class DebugJwtGuard extends (0, passport_1.AuthGuard)('jwt') {
    handleRequest(err, user, info, context) {
        const request = context.switchToHttp().getRequest();
        console.log('DEBUG: --- Guard Debug Start ---');
        console.log('DEBUG: URL:', request.url);
        console.log('DEBUG: Method:', request.method);
        console.log('DEBUG: Auth Header:', request.headers.authorization);
        if (info)
            console.log('DEBUG: Info (Error):', info.message);
        if (err)
            console.log('DEBUG: Error:', err);
        if (user)
            console.log('DEBUG: User decoded:', user);
        console.log('DEBUG: --- Guard Debug End ---');
        return super.handleRequest(err, user, info, context);
    }
};
exports.DebugJwtGuard = DebugJwtGuard;
exports.DebugJwtGuard = DebugJwtGuard = __decorate([
    (0, common_1.Injectable)()
], DebugJwtGuard);
//# sourceMappingURL=debug-jwt.guard.js.map