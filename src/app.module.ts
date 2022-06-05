import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
  providers: [AppService],
})
export class AppModule { }
