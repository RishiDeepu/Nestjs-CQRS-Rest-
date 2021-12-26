import { CreatePersonHandler } from "./create-person.command";
import { LoginPersonHandler } from "./login-person.command";
import { UpdatePersonHandler } from "./update-person.command";

export const CommandHandlers= [
  CreatePersonHandler,
  UpdatePersonHandler,
  LoginPersonHandler
]