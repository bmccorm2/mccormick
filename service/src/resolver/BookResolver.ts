import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { Genre } from "../entity/Genre";
import { Book } from "../entity/Book";
import { In } from "typeorm";
import { log } from "console";

@Resolver()
export class BookResolver {
  @Mutation(() => Boolean)
  async createBook(
    @Args("title") title: string,
    @Args("author") author: string,
    @Args("pages", { type: () => Int }) pages: number,
    @Args("rating", { type: () => Int }) rating: number,
    @Args("isFiction", { type: () => Boolean }) isFiction: Boolean,
    @Args("genres", { type: () => [Int] }) genreList: [number],
    @Args("publishDate", { type: () => String, nullable: true })
    publishDate?: Date,
    @Args("review", { type: () => String, nullable: true }) review?: string
  ) {
    const genres = await Genre.find({
      where: {
        id: In(genreList),
      },
    });
    const book = new Book();
    book.title = title;
    book.author = author;
    book.pages = pages;
    book.isFiction = isFiction;
    book.rating = rating;
    book.publishDate = publishDate;
    book.genres = genres;
    book.review = review;

    await Book.save(book);
    return true;
  }

  @Mutation(() => Boolean)
  async updateBook(
    @Args("id", { type: () => Int }) id: number,
    @Args("title") title: string,
    @Args("author") author: string,
    @Args("pages", { type: () => Int }) pages: number,
    @Args("rating", { type: () => Int }) rating: number,
    @Args("isFiction", { type: () => Boolean }) isFiction: Boolean,
    @Args("selectedGenres", { type: () => [Int] }) selectedGenres: [number],
    @Args("publishDate", { type: () => String, nullable: true })
    publishDate?: Date,
    @Args("review", { type: () => String, nullable: true }) review?: string
  ) {
    const book = await Book.findOneByOrFail({ id });

    const genres = await Genre.find({
      where: {
        id: In(selectedGenres),
      },
    });

    // Update book properties
    book.title = title;
    book.author = author;
    book.pages = pages;
    book.rating = rating;
    book.isFiction = isFiction;
    book.publishDate = publishDate;
    book.review = review;

    // Update many-to-many relationship
    book.genres = genres;

    // Save changes
    await book.save();

    return true;
  }

  @Query(() => [Book])
  async books() {
    return Book.find({
      relations: {
        genres: true,
      },
      order: {
        id: "DESC",
      },
    });
  }

  @Query(() => Book, { nullable: true })
  async book(@Args("id", { type: () => Int }) id: number) {
    const book = await Book.findOne({
      where: {
        id,
      },
      relations: {
        genres: true,
      },
    });
    return book;
  }

  @Mutation(() => Boolean)
  async deleteBook(@Args("id", { type: () => Int }) id: number) {
    await Book.delete({ id });
    return true;
  }
}
