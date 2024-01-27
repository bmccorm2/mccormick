import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./Book";

@Entity()
@ObjectType()
export class Genre extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column({ length: 200, unique: true })
  @Field()
  description!: string;

  @Field(() => [Book])
  @ManyToMany(() => Book, book => book.genres)
  books!: Genre[]  
}