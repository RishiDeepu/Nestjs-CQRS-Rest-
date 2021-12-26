import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonController } from './person/person.controller';
import { PersonModule } from './person/person.module';

@Module({
  imports: [PersonModule, MongooseModule.forRoot('mongodb://localhost/Person')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
