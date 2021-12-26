import { AggregateRoot } from "@nestjs/cqrs";
import { RepositoryCollection } from "../repository";
import * as bcrypt from 'bcrypt'
import { NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export class Person extends AggregateRoot {
  id: string
  repos: RepositoryCollection
  jwt: JwtService
  constructor(repos, id?, jwt?) {
    super()
    this.id = id
    this.repos = repos
    this.jwt = jwt
  }

  async create(dto: any) {

    const saltOrRounds = 10;
    const passwordHash = await bcrypt.hash(dto.password, saltOrRounds);
    let data = Object.assign({}, dto, { password: passwordHash })
    let state = await this.repos.personModel.create(data)
    console.log("state", state);
    return state;
  }
  async update(dto: any) {
    console.log("dto", dto);
    console.log("id", this.id);

    let state = await this.repos.personModel.findByIdAndUpdate(
      this.id, dto, { new: true }
    )
    console.log("state", state);

    return state;
  }

  async login(dto: any) {

    let person = await this.repos.personModel.findOne({
      email: dto.email
    })
    console.log("person", person);

    if (!person) {
      throw new NotFoundException("Can't Find User");
    }
    if (!(dto.email == person.email)) {
      throw new NotFoundException("Email Is Not Valid");
    }
    if (!(await bcrypt.compare(dto.password, person.password))) {
      throw new NotFoundException("Password Is Not Valid");
    }
    let jwtToken = await this.jwt.sign({ email: person.email, pass: person.password })
    console.log("jwtToken",jwtToken);
    
    return jwtToken
  }
}