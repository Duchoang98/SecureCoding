import {
    Entity,
    Column,
    ManyToOne,
    CreateDateColumn
  } from "typeorm";
import { User } from "./User";

@Entity()
export class Session {
    @Column({ type: 'varchar', length: 51, unique: true })
    token!: string
  
    @ManyToOne(type => User, user => user.sessions)
    user!: User
  
    @CreateDateColumn()
    createdAt!: Date
  
    @Column()
    expiresAt!: Date
  
    @Column({ nullable: true })
    revokedAt!: Date
}