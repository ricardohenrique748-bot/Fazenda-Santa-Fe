import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth_new/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    create(@Body() createUsuarioDto: Prisma.UsuarioCreateInput) {
        return this.usersService.create(createUsuarioDto);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOneById(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUsuarioDto: Prisma.UsuarioUpdateInput) {
        return this.usersService.update(id, updateUsuarioDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
