import { CommandHandler, EventPublisher, ICommandHandler, } from "@nestjs/cqrs";
import { Person } from "src/person/models/person.model";
import { RepositoryCollection } from "src/person/repository";

export class CreatePersonCommand{
  constructor(readonly data:any){}
}
@CommandHandler(CreatePersonCommand)
export class CreatePersonHandler implements ICommandHandler<CreatePersonCommand>{
  constructor(
    private readonly publisher:EventPublisher,
    private readonly repos:RepositoryCollection
  ){}
  async execute(command: CreatePersonCommand): Promise<any> {
    const person = await this.publisher.mergeObjectContext(
      new Person(this.repos),
    );
    const state = await person.create(command.data);
    person.commit();
    return state;
  }
}