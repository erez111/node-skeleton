// src/users/usersController.ts
import {
  Body,
  Controller,
  Example,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse, Tags,
} from 'tsoa';
import { inject } from 'inversify';
import { provideSingleton } from '../util/provideSingleton';
import { User } from './user';
import { UsersService, UserCreationParams } from './usersService';
import { Logger } from '../util/logger';

@Route('users')
@provideSingleton(UsersController)
export class UsersController extends Controller {
  constructor(
    @inject(Logger) private logger: Logger,
    @inject(UsersService) private usersService: UsersService,
  ) {
    super();
    this.logger.log('debug', this.usersService.get);
  }

  /**
   * Retrieves the details of an existing user.
   * Supply the unique user ID from either and receive corresponding user details.
   * @example userId "52907745-7672-470e-a803-a2f8feb52944"
   * @example userId "e77ef155-bd12-46f0-8559-bf55f6dd4c63"
   * @example name "example name"
   */
  @SuccessResponse('200', 'Success') // Custom success response
  @Tags('Users')
  @Example<User>({
    id: '52907745-7672-470e-a803-a2f8feb52944',
    name: 'tsoa user',
    email: 'hello@tsoa.com',
    phoneNumbers: [],
    status: 'Happy',
  })
  @Get('{userId}')
  public async getUser(
    @Path() userId: string,
    @Query() name?: string,
  ): Promise<User> {
    return new UsersService().get(userId, name);
  }

  @SuccessResponse('201', 'Created') // Custom success response
  @Tags('Users')
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams,
  ): Promise<void> {
    this.setStatus(201); // set return status 201
    new UsersService().create(requestBody);
  }
}
