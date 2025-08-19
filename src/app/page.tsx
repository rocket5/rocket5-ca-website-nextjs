import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/app/sanity/client";
import { Header } from "@/components/layout";
import { HeroSection, ServicesSection } from "@/components/sections";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        
        {/* Demo section showing existing posts - this would be replaced with actual content sections */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Blog Posts</h2>
            <ul className="flex flex-col gap-y-4">
              {posts.map((post) => (
                <li className="hover:underline bg-card p-4 rounded-lg" key={post._id}>
                  <Link href={`/${post.slug.current}`}>
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <p className="text-muted-foreground">{new Date(post.publishedAt).toLocaleDateString()}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}