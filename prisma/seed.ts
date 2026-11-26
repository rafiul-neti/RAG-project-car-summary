import "dotenv/config";
import { readFile } from "node:fs/promises";
import { prisma } from "../src/lib/prisma";

type Review = { author: string; rating: number; content: string };
type Car = {
  id: string;
  name: string;
  year: number;
  bodyType: string;
  fuelType: "Petrol" | "Hybrid" | "Electric";
  price: number;
  description: string;
  features: string;
  imageUrl: string | null;
  reviews: Review[];
};

async function main(): Promise<void> {
  const json = await readFile(
    new URL("./seed-data.json", import.meta.url),
    "utf8",
  );
  const { cars } = JSON.parse(json) as { cars: Car[] };

  await Promise.all(
    cars.map(({ reviews, ...car }) => {
      return prisma.car.upsert({
        where: { id: car.id },
        create: {
          ...car,
          reviews: {
            create: reviews.map((review) => ({
              ...review,
              rating: review.rating,
            })),
          },
        },
        update: car,
      });
    }),
  );

  console.log(`Seeded ${cars.length} cars and ${cars.length * 10} reviews.`);
}

main()
  .catch((error: unknown) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
