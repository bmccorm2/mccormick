import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Car } from "../entity/Car";

@Entity()
@ObjectType()
export class CarDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column({ length: 700 })
  @Field()
  url!: string;

  @Column({ length: 100 })
  @Field()
  displayName!: string;

  @Column({ length: 100, nullable: true })
  @Field({ nullable: true })
  color!: string;

  @Column({ type: "date" })
  @Field()
  effectiveDate!: string;

  @Column({ type: "int" })
  @Field(() => Int, { nullable: true })
  price!: number;

  @Column({ type: "int", nullable: true })
  @Field(() => Int, { nullable: true })
  miles!: number;

  @Column({ type: "int" })
  @Field(() => Int)
  year!: number;

  @Column({ type: "int", nullable: true })
  @Field(() => Int, { nullable: true })
  distance!: number;

  @ManyToOne(() => Car, (car: Car) => car.details)
  @Field(() => Car)
  car!: Car;
}
