import { isFiveStarReview, type GoogleReview, type GoogleReviewsMeta } from "./reviews";

export function buildGoogleReviewsJsonLd(
  reviews: GoogleReview[],
  meta: GoogleReviewsMeta,
) {
  const visible = reviews.filter(isFiveStarReview);

  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: "Genesis Integrative Medicine",
    url: "https://genesisintegrativemed.com/",
    ...(meta.rating > 0 && meta.reviewCount > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: meta.rating,
            reviewCount: meta.reviewCount,
            bestRating: "5",
          },
        }
      : {}),
    ...(visible.length > 0
      ? {
          review: visible.map((review) => ({
            "@type": "Review",
            author: { "@type": "Person", name: review.name },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
            },
            reviewBody: review.quote,
          })),
        }
      : {}),
  };
}
