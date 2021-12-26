import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { RepositoryCollection } from "src/person/repository";

export class GetOnePersonCommand{
   constructor(readonly id:string){
   console.log("inside GetOnePersonCommand...............");

   }
  
}
@QueryHandler(GetOnePersonCommand)
export class GetOnePersonHandler implements IQueryHandler<GetOnePersonCommand>{
  constructor(private readonly repos:RepositoryCollection){}
  async execute(query: GetOnePersonCommand): Promise<any> {
   console.log("inside handler...............",query);

    return this.repos.personModel.findOne({id:query.id})
  }
}