import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { draftMode } from "next/headers";

import { getClient } from "@/app/sanity/client";
import { Header } from "@/components/layout";
import { HeroSection, ServicesSection } from "@/components/sections";
import { DraftModeIndicator } from "@/components/DraftModeIndicator";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const HOMEPAGE_QUERY = `*[_type == "homepage"][0]{
  _id,
  _updatedAt,
  title,
  heroSection {
    headline,
    subheadline,
    ctaText,
    ctaLink,
    benefits,
    socialProofText,
    clientAvatars[] {
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        },
        crop,
        hotspot
      },
      name,
      fallbackInitials
    }
  },
  servicesSection {
    sectionTitle,
    sectionSubtitle,
    services[] {
      title,
      description,
      iconName,
      featured
    }
  },
  seo {
    metaTitle,
    metaDescription,
    ogImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      crop,
      hotspot
    }
  }
}`;

// Optimized caching strategy
const fetchOptions = { next: { revalidate: 60 } }; // Homepage content changes less frequently
const postsOptions = { next: { revalidate: 300 } }; // Posts can be cached longer

export default async function IndexPage() {
  const { isEnabled: isDraftMode } = await draftMode();
  const sanityClient = getClient(isDraftMode);
  
  const posts = await sanityClient.fetch<SanityDocument[]>(POSTS_QUERY, {}, postsOptions);
  const homepage = await sanityClient.fetch<SanityDocument>(HOMEPAGE_QUERY, {}, fetchOptions);

  return (
    <>
      {isDraftMode && <DraftModeIndicator />}
      <div className={isDraftMode ? "pt-14" : ""}>
        <Header />
        <main>
        <HeroSection data={homepage?.heroSection} />
        <ServicesSection data={homepage?.servicesSection} />
        
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
      </div>
    </>
  );
}