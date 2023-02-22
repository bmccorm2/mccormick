import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CarDetail } from "./CarDetail";
import { Consumption } from "./Consumption";

@Entity()
@ObjectType()
export class Car extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column({ length: 100 })
  @Field()
  displayName!: string;

  @Column({ length: 700, nullable: true })
  @Field({ nullable: true })
  searchUrl!: string;

  @Column()
  @Field()
  isOwned!: boolean;

  @OneToMany(() => Consumption, (consumption) => consumption.car)
  consumptions!: Consumption[];

  @OneToMany(() => CarDetail, (detail) => detail.car)
  details!: CarDetail[];
}
