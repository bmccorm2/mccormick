import { Resolver, Query, Args, Mutation, Int } from "@nestjs/graphql";
import { Car } from "../entity/Car";
import { CarDetail } from "../entity/CarDetail";

@Resolver()
export class CarDetailResolver {
  @Query(() => [CarDetail])
  carDetails(@Args("carId", { type: () => Int }) carId: number) {
    const currentDate = new Date().toLocaleString("en-CA").split(",")[0];
    return CarDetail.find({
      where: {
        car: {
          id: carId,
        },
        effectiveDate: currentDate,
      },
    });
  }

  @Mutation(() => Boolean)
  async createCarDetail(
    @Args("price", { type: () => Int }) price: number,
    @Args("miles", { type: () => Int }) miles: number,
    @Args("year", { type: () => Int }) year: number,
    @Args("displayName") displayName: string,
    @Args("url") url: string,
    @Args("distance", { type: () => Int, nullable: true }) distance: number,
    @Args("carId", { type: () => Int }) carId: number,
    @Args("effectiveDate") effectiveDate: string
  ) {
    const car = new Car();
    car.id = carId;
    const carDetail = new CarDetail();
    carDetail.price = price;
    carDetail.miles = miles;
    carDetail.year = year;
    carDetail.displayName = displayName;
    carDetail.url = url;
    carDetail.distance = distance;
    carDetail.effectiveDate = effectiveDate;
    carDetail.car = car;
    CarDetail.save(carDetail, { reload: false });

    return true;
  }
}
