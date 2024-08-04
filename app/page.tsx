import { Card, CardContent } from "@/components/ui/card";
import { client } from "@/lib/sanity";
import { blogSummaryType } from "@/Types";
import axios from "axios";
import Image from "next/image";
import { urlFor } from "../lib/sanity";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const getData = async () => {
  const query = `*[_type == "blog"] | order(_createdAt desc) {
  title,
    description,
    "currentSlug" : slug.current,
    titleImage
}`;

  const data = await client.fetch(query);
  // const { data } = await axios.get(
  //   "https://fdzd1u12.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22blog%22%5D+%7C+order%28_createdAt+desc%29+%7B%0A++title%2C%0A++++description%2C%0A++++%22currentSlug%22+%3A+slug.current%2C%0A++titleImage%0A%7D&perspective=published"
  // );

  return data;
};

export default async function Home() {
  const blogPosts: blogSummaryType[] = await getData();
  // console.log(blogs);
  // const blogsPost: blogSummaryType[] = data.result;
  // console.log(blogsPost);
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-4 max-w-screen-md px-4">
      {blogPosts.map((post, id) => (
        <Card key={id}>
          <Image
            className="rounded-t-xl h-[200px] object-cover"
            width={600}
            height={400}
            alt="blog-image"
            src={urlFor(post.titleImage).url()}
          ></Image>

          <CardContent className="mt-5">
            <h3 className="text-lg line-clamp-2 font-semibold">{post.title}</h3>
            <p className="text-sm mt-2 line-clamp-3">{post.description}</p>
            <Button className="w-full mt-7" asChild>
              <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </main>
  );
}
