import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Genre } from "./Genre";

@Entity()
@ObjectType()
@Unique("author_title", ["title", "author"])
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column({ length: 200 })
  @Field()
  title!: string;

  @Column({ length: 200 })
  @Field()
  author!: string;

  @Column({ length: 300, nullable: true })
  @Field({ nullable: true })
  review?: string | null;

  @Column("int")
  @Field(() => Int)
  pages!: number;

  @Column("int")
  @Field(() => Int)
  rating!: number;

  @Column()
  @Field()
  isFiction!: Boolean;

  @CreateDateColumn()
  @Field()
  createDate!: Date;

  @Column("date", { nullable: true })
  @Field(() => String, { nullable: true })
  publishDate?: Date | null;

  @Field(() => [Genre])
  @ManyToMany(() => Genre, (genre) => genre.books)
  @JoinTable()
  genres!: Genre[];
}
