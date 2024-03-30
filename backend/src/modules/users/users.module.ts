import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from 'src/models/note/note.entity';
import { UserEntity } from 'src/models/user/user.entity';
import { EnvironmentConfigService } from 'src/services/environment-config/environment-config.service';
import { UsersService } from 'src/services/users/users.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([NoteEntity, UserEntity])],
  providers: [UsersService, EnvironmentConfigService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
