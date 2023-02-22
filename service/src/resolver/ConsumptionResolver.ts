import { Consumption } from "../entity/Consumption";
import { Resolver, Query, Mutation, Int, Float, Args } from "@nestjs/graphql";
import { Summary } from "../entity/Summary";
import { Car } from "../entity/Car";

@Resolver()
export class ConsumptionResolver {
  @Query(() => [Consumption])
  consumption(@Args("carId", { type: () => Int }) carId: number) {
    return Consumption.find({
      where: {
        car: {
          id: carId,
        },
      },
      take: 50,
      order: {
        id: "DESC",
      },
    });
  }

  @Query(() => Summary)
  async summary(@Args("carId", { type: () => Int }) carId: number) {
    const {
      total_miles,
      total_price,
      total_gallons,
      total_miles_per_gallon,
      total_price_per_gallon,
    } = await Consumption.createQueryBuilder("consumption")
      .select("SUM(consumption.miles)", "total_miles")
      .addSelect("SUM(consumption.price)", "total_price")
      .addSelect("SUM(consumption.gallons)", "total_gallons")
      .addSelect(
        "SUM(consumption.miles) / SUM(consumption.gallons)",
        "total_miles_per_gallon"
      )
      .addSelect(
        "SUM(consumption.price) / SUM(consumption.gallons)",
        "total_price_per_gallon"
      )
      .where("consumption.carId = :carId", { carId })
      .getRawOne();

    const summary = {
      total_miles,
      total_price,
      total_gallons,
      total_miles_per_gallon,
      total_price_per_gallon,
    };

    return summary;
  }

  @Mutation(() => Boolean)
  async createConsumption(
    @Args("price", { type: () => Float }) price: number,
    @Args("gallons", { type: () => Float }) gallons: number,
    @Args("miles", { type: () => Float }) miles: number,
    @Args("notes", { nullable: true }) notes: string,
    @Args("carId", { type: () => Int }) carId: number
  ) {
    const car = new Car();
    car.id = carId;
    const consumption = new Consumption();
    consumption.price = price;
    consumption.gallons = gallons;
    consumption.miles = miles;
    consumption.notes = notes;
    consumption.car = car;
    await Consumption.save(consumption, { reload: false });
    return true;
  }
}
