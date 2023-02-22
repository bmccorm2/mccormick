import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Summary {
  @Field(() => Float, { nullable: true })
  total_miles!: number | null;

  @Field(() => Float, { nullable: true })
  total_price!: number | null;

  @Field(() => Float, { nullable: true })
  total_gallons!: number | null;

  @Field(() => Float, { nullable: true })
  total_miles_per_gallon!: number | null;

  @Field(() => Float, { nullable: true })
  total_price_per_gallon!: number | null;
}
