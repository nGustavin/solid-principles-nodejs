import { UserRepository } from "../../src/application/repositories/UserRepository";
import { User } from "../../src/domain/entities/user";

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find(user => user.props.email === email)

    if(!user){
      return null;
    }

    return user
  }
}