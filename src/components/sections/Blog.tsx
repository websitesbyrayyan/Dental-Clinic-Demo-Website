import { useState } from "react";

import {
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";

import { clinic } from "../../data/clinic";

import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

export function Blog() {
  const { blog } = clinic;

  const [expandedPosts, setExpandedPosts] = useState<
    string[]
  >([]);

  function togglePost(postId: string): void {
    setExpandedPosts((current) =>
      current.includes(postId)
        ? current.filter((id) => id !== postId)
        : [...current, postId],
    );
  }

  return (
    <Section
      id="blog"
      labelledBy="blog-heading"
      tone="sage"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={blog.eyebrow}
            title={blog.heading}
            description={blog.description}
            id="blog-heading"
          />
        </Reveal>

        <div className="mt-14 grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blog.posts.map((post, index) => {
            const isExpanded =
              expandedPosts.includes(post.id);

            const contentId =
              `blog-content-${post.id}`;

            const buttonId =
              `blog-button-${post.id}`;

            return (
              <Reveal
                key={post.id}
                delay={index * 0.1}
              >
                <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-forest/10 bg-warmwhite p-7 shadow-soft transition-shadow duration-300 hover:shadow-card sm:p-8">
                  {/* Category and article label */}

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full bg-lightsage px-3 py-2 text-xs font-semibold text-forest">
                      {post.category}
                    </span>

                    <span className="text-xs font-medium text-charcoal">
                      {post.sampleLabel}
                    </span>
                  </div>

                  {/* Article heading */}

                  <h3 className="mt-7 text-editorial text-2xl leading-snug text-forest sm:text-3xl">
                    {post.title}
                  </h3>

                  {/* Summary */}

                  <p className="mt-4 flex-1 text-sm leading-7 text-charcoal sm:text-base">
                    {post.summary}
                  </p>

                  {/* Expandable article */}

                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isExpanded}
                    className="mt-6 border-t border-forest/15 pt-5"
                  >
                    <p className="text-sm leading-8 text-charcoal">
                      {post.sampleContent}
                    </p>
                  </div>

                  {/* Disclosure button */}

                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={contentId}
                    onClick={() => togglePost(post.id)}
                    className="mt-7 inline-flex min-h-12 w-fit items-center gap-2 rounded-lg text-sm font-bold text-forest transition-colors hover:text-charcoal"
                  >
                    {isExpanded
                      ? blog.readLessLabel
                      : blog.readMoreLabel}

                    {isExpanded ? (
                      <ChevronDown
                        size={17}
                        aria-hidden="true"
                        className="rotate-180"
                      />
                    ) : (
                      <ArrowUpRight
                        size={17}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}