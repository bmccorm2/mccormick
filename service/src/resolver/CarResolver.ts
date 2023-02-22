import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { Car } from "../entity/Car";

@Resolver()
export class CarResolver {
  @Mutation(() => Boolean)
  async createCar(
    @Args("displayName") displayName: string,
    @Args("searchUrl", { nullable: true }) searchUrl: string,
    @Args("isOwned") isOwned: boolean
  ) {
    await Car.insert({ displayName, searchUrl, isOwned });
    return true;
  }

  @Query(() => [Car], { nullable: true })
  cars(@Args("isOwned", { nullable: true }) isOwned: boolean) {
    return isOwned != null ? Car.find({ where: { isOwned } }) : Car.find();
  }
}
