import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Yield extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column({ type: "float", nullable: true })
  @Field(() => Float)
  oneMonth!: number;

  @Column({ type: "float", nullable: true })
  @Field(() => Float)
  twoMonth!: number;

  @Column({ type: "float", nullable: true })
  @Field(() => Float)
  threeMonth!: number;

  @Column({ type: "float", nullable: true })
  @Field(() => Float)
  sixMonth!: number;

  @Column({ type: "float", nullable: true })
  @Field(() => Float)
  oneYear!: number;

  @Column({ type: "float", nullable: true })
  @Field(() => Float)
  twoYear!: number;

  @Column({ type: "float", nullable: true })
  @Field(() => Float)
  threeYear!: number;

  @Column({ type: "float", nullable: true })
  @Field(() => Float)
  fiveYear!: number;

  @Column({ type: "float", nullable: true })
  @Field(() => Float)
  sevenYear!: number;

  @Column({ type: "float", nullable: true })
  @Field(() => Float)
  tenYear!: number;

  @Column({ type: "float", nullable: true })
  @Field(() => Float)
  twentyYear!: number;

  @Column({ type: "float", nullable: true })
  @Field(() => Float)
  thirtyYear!: number;

  @Column({ type: "date", unique: true })
  @Field()
  effectiveDate!: string;
}
