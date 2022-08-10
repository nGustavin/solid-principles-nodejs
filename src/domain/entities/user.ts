import { Entity } from "../../core/domain/Entity";

type UserProps = {
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

class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string){
    super(props, id)
  }

  static create(props: UserProps, id?: string){
    const user = new User(props, id)
    return user
  }
}

export {User}