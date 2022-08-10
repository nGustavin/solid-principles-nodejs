import { User } from "../../../domain/entities/user";
import { UserRepository } from "../../repositories/UserRepository";

type CreateUserProps = {
  name: string;
  email: string;
  height: number;
  weight: number;
  document: number;
  address: {
    street: string;
    number: number;
  }
}

class CreateUser {
  constructor(
    private userRepository: UserRepository
  ) {}

  async execute({address, email, height, weight,document, name}: CreateUserProps){
    const user = await this.userRepository.findByEmail(email)

    if(user){
      throw new Error('User already exists')
    }

    const creation = User.create({
      address, 
      email, 
      height, 
      weight,
      document, 
      name
    })
    
    return creation
  }
}

export {CreateUser}