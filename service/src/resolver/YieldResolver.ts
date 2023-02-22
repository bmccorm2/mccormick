import { Resolver, Query, Mutation, Float, Args } from "@nestjs/graphql";
import { Yield } from "../entity/Yield";
import * as dayjs from "dayjs";

@Resolver()
export class YieldResolver {
  dayjsFormatString = "YYYY-MM-DD";

  getPreviousDay = (d: Date) => {
    const t = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);
    return this.getBusinessDay(t);
  };

  getPreviousMonthEnd = (d: Date) => {
    const t = new Date(d.getFullYear(), d.getMonth(), 0);
    return this.getBusinessDay(t);
  };

  getPreviousYearEnd = (d: Date) => {
    const t = new Date(d.getFullYear() - 1, 12, 0);
    return this.getBusinessDay(t);
  };

  getBusinessDay = (d: Date) => {
    const day = d.getDay();
    switch (day) {
      case 0:
        return new Date(d.setDate(d.getDate() - 2));
      case 6:
        return new Date(d.setDate(d.getDate() - 1));
      default:
        return d;
    }
  };

  @Query(() => [Yield])
  yields() {
    const currentDay = new Date();
    const previousDay = dayjs(this.getPreviousDay(currentDay)).format(
      this.dayjsFormatString
    );
    const previousMonth = dayjs(this.getPreviousMonthEnd(currentDay)).format(
      this.dayjsFormatString
    );
    const previousYear = dayjs(this.getPreviousYearEnd(currentDay)).format(
      this.dayjsFormatString
    );

    return Yield.find({
      where: [
        {
          effectiveDate: previousDay,
        },
        {
          effectiveDate: previousMonth,
        },
        {
          effectiveDate: previousYear,
        },
      ],
      order: {
        effectiveDate: "DESC",
      },
    });
  }

  @Mutation(() => Boolean)
  async createYield(
    @Args("oneMonth", { type: () => Float }) oneMonth: number,
    @Args("twoMonth", { type: () => Float }) twoMonth: number,
    @Args("threeMonth", { type: () => Float }) threeMonth: number,
    @Args("sixMonth", { type: () => Float }) sixMonth: number,
    @Args("oneYear", { type: () => Float }) oneYear: number,
    @Args("twoYear", { type: () => Float }) twoYear: number,
    @Args("threeYear", { type: () => Float }) threeYear: number,
    @Args("fiveYear", { type: () => Float }) fiveYear: number,
    @Args("sevenYear", { type: () => Float }) sevenYear: number,
    @Args("tenYear", { type: () => Float }) tenYear: number,
    @Args("twentyYear", { type: () => Float }) twentyYear: number,
    @Args("thirtyYear", { type: () => Float }) thirtyYear: number,
    @Args("effectiveDate") effectiveDate: string
  ) {
    try {
      const myYield = new Yield();
      myYield.oneMonth = oneMonth;
      myYield.twoMonth = twoMonth;
      myYield.threeMonth = threeMonth;
      myYield.sixMonth = sixMonth;
      myYield.oneYear = oneYear;
      myYield.twoYear = twoYear;
      myYield.threeYear = threeYear;
      myYield.fiveYear = fiveYear;
      myYield.sevenYear = sevenYear;
      myYield.tenYear = tenYear;
      myYield.twentyYear = twentyYear;
      myYield.thirtyYear = thirtyYear;
      myYield.effectiveDate = effectiveDate;
      Yield.save(myYield, { reload: false });

      return true;
    } catch (error) {
      return false;
    }
  }
}
