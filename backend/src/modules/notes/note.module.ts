import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesController } from 'src/controllers/notes/notes.controller';
import { NoteEntity } from 'src/models/note/note.entity';
import { NotesService } from 'src/services/notes/notes.service';
import { EnvironmentConfigService } from 'src/services/environment-config/environment-config.service';
import { CategoryEntity } from 'src/models/category/category.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtOptions } from '../constants';
import { UserEntity } from 'src/models/user/user.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([NoteEntity, CategoryEntity, UserEntity]),
    JwtModule.register(jwtOptions),
  ],
  controllers: [NotesController],
  providers: [NotesService, EnvironmentConfigService],
  exports: [TypeOrmModule],
})
export class NotesModule {}
