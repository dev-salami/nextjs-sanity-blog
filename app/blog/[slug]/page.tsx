import React from "react";
import { client, urlFor } from "@/lib/sanity";
import { blogDetailsType } from "@/Types";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
const query = `*[_type == "blog" && slug.current == "test-hello-sanity-blog" ] {
  title,
    description,
    "currentSlug" : slug.current,
    content,
  titleImage,
} [0]`;

const getData = async (slug: string) => {
  const data = await client.fetch(query);
  return data;
};

async function BlogArticle({ params }: { params: string }) {
  const blogPost: blogDetailsType = await getData(params);
  console.log(blogPost);
  return (
    <div className="mt-28 max-w-screen-md mx-auto px-4">
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          XtreMechanics - Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-xl">
          {blogPost.title}
        </span>
      </h1>
      <Image
        className="rounded-md mt-6 mx-auto"
        width={400}
        height={300}
        priority
        objectFit="cover"
        objectPosition="center"
        alt="blog-image"
        src={urlFor(blogPost.titleImage).url()}
      ></Image>
      <div className="mt-6 prose prose-blue prose-base  mx-auto dark:prose-invert">
        <PortableText value={blogPost.content} />
      </div>
    </div>
  );
}

export default BlogArticle;
