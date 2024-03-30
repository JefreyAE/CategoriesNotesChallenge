import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { NotesModule } from './modules/notes/note.module';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { DbModule } from './modules/typeorm/db.module';
import { CategoriesModule } from './modules/categories/category.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    HttpModule,
    DbModule,
    NotesModule,
    AuthModule,
    UsersModule,
    CategoriesModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.develop'],
      isGlobal: true,
    }),
    RouterModule.register([
      {
        path: '',
        module: AppModule,
      },
      {
        path: '',
        module: NotesModule,
      },
      {
        path: '',
        module: CategoriesModule,
      },
      {
        path: '',
        module: AuthModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
