import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Car } from "./Car";

@Entity()
@ObjectType()
export class Consumption extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column({ type: "float" })
  @Field(() => Float)
  price!: number;

  @Column({ type: "float" })
  @Field(() => Float)
  gallons!: number;

  @Column({ type: "float" })
  @Field(() => Float)
  miles!: number;

  @Field(() => Float, { nullable: true })
  get miles_per_gallon(): number | null {
    return this.gallons === 0 ? null : this.miles / this.gallons;
  }

  @Field(() => Float, { nullable: true })
  get price_per_gallon(): number | null {
    return this.gallons === 0 ? null : this.price / this.gallons;
  }

  @CreateDateColumn()
  @Field()
  date!: Date;

  @Column({ nullable: true, length: 100 })
  @Field({ nullable: true })
  notes!: string;

  @ManyToOne(() => Car, (car) => car.consumptions)
  @Field(() => Car)
  car!: Car;
}
