import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';

import { MongooseModule } from '@nestjs/mongoose';
import { All_Entities } from './allEntities';
import { CommandHandlers } from './commands/person';
import { PersonController } from './person.controller';
import { QueryHandlers } from './queries/person';
import { RepositoryCollection } from './repository';

@Module({
  imports: [
    MongooseModule.forFeature([...All_Entities]),
    CqrsModule,
    JwtModule.register(
      {
        secret: "secret",
        signOptions: { expiresIn: '10s' },
      }
    )
  ],
  controllers: [PersonController],
  providers: [RepositoryCollection, ...QueryHandlers, ...CommandHandlers]
})
export class PersonModule { }
