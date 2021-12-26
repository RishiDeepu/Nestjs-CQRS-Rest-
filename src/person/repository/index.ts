import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Person } from "../entities/person.interface";

export class RepositoryCollection {
  constructor(
    @InjectModel('person') public readonly personModel:Model<Person> 
  ){}
}