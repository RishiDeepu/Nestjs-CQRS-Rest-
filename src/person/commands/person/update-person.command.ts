import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Person } from "src/person/models/person.model";
import { RepositoryCollection } from "src/person/repository";

export class UpdatePersonCommand {
  constructor(
    readonly data: any
    ) { }
}
@CommandHandler(UpdatePersonCommand)
export class UpdatePersonHandler implements ICommandHandler<UpdatePersonCommand>{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repos: RepositoryCollection
  ) { }
  async execute(command: UpdatePersonCommand): Promise<any> {
    let person = await this.publisher.mergeObjectContext(
      new Person(this.repos, command.data.id)
    )
    const state = await person.update(command.data);
    person.commit();
    return state;
  }
}