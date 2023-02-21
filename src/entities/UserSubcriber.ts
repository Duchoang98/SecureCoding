import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { validate } from 'class-validator';
import { User } from './User';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    const errors = await validate(event.entity)
    if (errors.length > 0) throw new Error("Validation failed!")
  }
}
