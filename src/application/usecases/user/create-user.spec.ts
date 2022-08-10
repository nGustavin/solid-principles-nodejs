import { InMemoryUserRepository } from "../../../../tests/repositories/in-memory-user-repository"
import { User } from "../../../domain/entities/user"
import { CreateUser } from "./create-user"

describe("Create user use case", () => {
  it('should be able to create a new user', async () => {
    const userRepository = new InMemoryUserRepository()

    const sut = new CreateUser(userRepository)
    const response = await sut.execute({
      name: 'Teste',
      email: 'teste@example.com',
      address: {
        number: 123,
        street: 'test address street'
      },
      document: 13072864969,
      height: 180,
      weight: 80
    })

    expect(response).toBeTruthy()
  })

  it("shouldn't be able to create a user if the user already exists", async () => {
    const userRepository = new InMemoryUserRepository()

    const user = User.create({
      name: 'Teste_do_teste',
      email: 'teste@example.com',
      address: {
        number: 123,
        street: 'test address street'
      },
      document: 13072864969,
      height: 180,
      weight: 80
    })

    userRepository.items.push(user)

    const sut = new CreateUser(userRepository)
    try{
      await sut.execute({
        name: 'Teste',
        email: 'teste@example.com',
        address: {
          number: 123,
          street: 'test address street'
        },
        document: 13072864969,
        height: 180,
        weight: 80
      })

      expect(true).toBe(false);
    }catch(e){
      if(e instanceof Error){
        expect(e.message).toBe('User already exists')
      }
    }
  })
})