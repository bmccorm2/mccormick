import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { Genre } from "../entity/Genre";

@Resolver()
export class GenreResolver {
  @Mutation(() => Boolean)
  async createGenre(@Args("description") description: string) {
    await Genre.insert({ description });
    return true;
  }

  @Mutation(() => Boolean)
  async deleteGenre(@Args("id", { type: () => Int }) id: number) {
    await Genre.delete({ id });
    return true;
  }

  @Query((returns) => [Genre])
  genres() {
    return Genre.find();
  }
}
