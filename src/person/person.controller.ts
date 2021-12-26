import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePersonCommand } from './commands/person/create-person.command';
import { LoginCommand } from './commands/person/login-person.command';
import { UpdatePersonCommand } from './commands/person/update-person.command';
import { CreatePersonDto } from './dtos/personDto/createPerson.dto';
import { LoginDto } from './dtos/personDto/login.dto';
import { UpdatePersonDto } from './dtos/personDto/updatePerson.dto';
import { GetOnePersonCommand } from './queries/person/get-one-person.handlers';
import { GetPersonQuery } from './queries/person/get-persons.handlers';

@Controller('person')
export class PersonController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) { }

  @Get()
  async getAllPerson() {
    return await this.queryBus.execute(new GetPersonQuery)
  }

  @Post()
  async addPerson(@Body() createPersonDto: CreatePersonDto) {
    return await this.commandBus.execute(new CreatePersonCommand(createPersonDto))
  }

  @Patch()
  async updatePerson(@Body() updatePersonDto: UpdatePersonDto) {
    return this.commandBus.execute(new UpdatePersonCommand(updatePersonDto))
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    console.log("inside controller...............");
    return await this.queryBus.execute(new GetOnePersonCommand(id))
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) { 
    return await this.commandBus.execute(new LoginCommand(loginDto))
  }
}
