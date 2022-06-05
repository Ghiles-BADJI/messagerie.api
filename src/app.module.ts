import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'ghiles',
      database: 'messaging',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
