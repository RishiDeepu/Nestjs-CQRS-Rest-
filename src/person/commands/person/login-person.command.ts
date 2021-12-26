import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { RepositoryCollection } from "src/person/repository";
import { Person } from "../../../person/models/person.model";

export class LoginCommand{
  constructor(readonly data:any){}
}
@CommandHandler(LoginCommand)
export class LoginPersonHandler implements ICommandHandler<LoginCommand>{
  constructor(
    private readonly publisher:EventPublisher,
    private readonly repos:RepositoryCollection,
    private readonly jwt:JwtService
  ){}
  async execute(command: LoginCommand): Promise<any> {
    const person = await this.publisher.mergeObjectContext(
      new Person(this.repos),
    );  
    person.jwt=this.jwt
    const state= await person.login(command.data)
    person.commit()
    return state
  }
}