// src/users/usersService.ts
import { User } from './user';
import { provideSingleton } from '../util/provideSingleton';

// A post request should not contain an id.
export type UserCreationParams = Pick<User, 'email' | 'name' | 'phoneNumbers'>;

@provideSingleton(UsersService)
export class UsersService {
  /* constructor(
    // maybe even more dependencies to be injected...
  ) {
  } */
  public get(id: string, name?: string): User {
    return {
      id,
      email: 'jane@doe.com',
      name: name ?? 'Jane Doe',
      status: 'Happy',
      phoneNumbers: [],
    };
  }

  public create(userCreationParams: UserCreationParams): User {
    return {
      id: ` ${Math.floor(Math.random() * 10000)}`, // Random
      status: 'Happy',
      ...userCreationParams,
    };
  }
}
