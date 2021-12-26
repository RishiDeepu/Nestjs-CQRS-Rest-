import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { RepositoryCollection } from "src/person/repository";

export class GetPersonQuery{

}

@QueryHandler(GetPersonQuery)
export class GetPersonHandler implements IQueryHandler<GetPersonQuery>{
  constructor(private readonly repos:RepositoryCollection){}
  async execute(query: GetPersonQuery): Promise<any> {
    return await this.repos.personModel.find() 
  }
}
 