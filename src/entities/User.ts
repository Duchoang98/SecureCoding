import { IsNotEmpty, IsEmail } from "class-validator";

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from "typeorm";
import {ValidationError} from '../specs/entities/ValidationError'
import { Session } from "./Session";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column()
  @IsNotEmpty()
  firstName!: String;
  
  @Column()
  @IsNotEmpty()
  lastName!: String;

  
  @IsEmail()
  @IsNotEmpty()
  @Column({
    type: "varchar",
    transformer: {
      from: (email: string) => email,
      to: (email: string) => email.toLowerCase()
    },
    unique: true
  })
  email!: string;


  @Column()
  @IsNotEmpty()
  passwordHash!: String;

  @OneToMany(() => Session, session => session.user)
  sessions!: Promise<Session[]>


  @BeforeInsert()
  @BeforeUpdate()
  validate() {
    if (!this.firstName) {
      throw new ValidationError("The firstName need to be specified", this, "firstName");
    }
    if (!this.lastName) {
      throw new ValidationError("The lastName need to be specified", this, "lastName");
    }
    if (!this.email) {
      throw new ValidationError("The email need to be specified", this, "email");
    }
    if (!this.passwordHash) {
      throw new ValidationError(
        "The passwordHash need to be specified",
        this,
        "passwordHash"
      );
    }
  }
}
