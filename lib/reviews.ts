/**
 * Per-client Google review types + fallback.
 * Fallback quotes must be real 5-star Google reviews for THIS business.
 * Leave googleReviews empty if none are on file.
 */
export const googleReviewsMeta = {
  rating: 4.9, // FALLBACK_RATING — Google's overall, not "5" by default
  reviewCount: 300, // FALLBACK_REVIEW_COUNT — Google's total, all stars
  fiveStarCount: 0,
  placeId: "ChIJnc8OryDjDogRyMliAgrmNZI",
  reviewsUrl: "https://maps.google.com/?cid=10535579833967233480",
} as const;

export type GoogleReview = {
  quote: string;
  name: string;
  rating: number;
  relativeTime?: string;
};

export type GoogleReviewsMeta = {
  rating: number;
  reviewCount: number;
  fiveStarCount: number;
  placeId: string;
  reviewsUrl: string;
};

export const googleReviews: GoogleReview[] = [
  {
    name: "Maggie Kries",
    rating: 5,
    relativeTime: "a month ago",
    quote:
      "Dr. Nate and his entire care team are amazing! From the moment you walk into the door and are greeted by Kim or Dr. Nate's wife, Oksana in PT, Angela in nutrition/dietary, and Dr. Nate himself, everyone truly listens to your concerns and provides genuine and compassionate care. In just the short time I have been going, I've noticed a huge improvement in my neck/back issues, pain, and sleep. I highly recommend these guys to anyone who  could benefit from a chiropractic need.\n\nAdditionally, I have been to other chiropractors in the area and I've felt like a customer in a sales office. At Dr. Nate's office, no one is trying to upsell you on anything.\n\nHands down amazing!",
  },
  {
    name: "Melissa Miller",
    rating: 5,
    relativeTime: "2 months ago",
    quote:
      "I've been going to Genesis for a few months now primarily for a shoulder issue. Dr. Nate and his team has taught me a lot about treating and working with the surrounding areas that impact my joint mobility and have been working on that for several months with adjustments. I've never had chiropractic services and this combined with PT has had such a positive impact on my mobility. The entire staff is amazing and so very kind which makes the stress of these physical challenges more manageable.",
  },
  {
    name: "Tina Hardersen",
    rating: 5,
    relativeTime: "4 months ago",
    quote:
      "I have been seeing Dr. Nate for 20 years, and I can confidently say he is exceptional. Over the years, he has helped me maintain my overall health and well-being, and his care has made a significant difference in my life. Additionally, he has been amazing with my son, helping him with his allergies and ear infections. His expertise, compassion, and dedication truly set him apart. I highly recommend him to anyone seeking a caring and experienced chiropractor.",
  },
  {
    name: "Robert Wicklund",
    rating: 5,
    relativeTime: "4 months ago",
    quote:
      "I have experienced nearly sixty years of back pain. Over the years, I have been treated with acupuncture, and have seen chiropractors, massage therapists, and medical doctors. In the fall of 2025, the issues returned with a vengeance and didn't let up. Again, nothing helped. I was referred to Dr. Nate by a trusted friend. I could barely walk when I met with Dr. Nate who explained a clear and understandable reason for the pain. I agreed to follow his plan of treatment, which included me doing my part. Relief began within a short while and I continue to improve. Dr. Nate helped me where other treatments failed. I am very grateful!",
  },
  {
    name: "Angela Lowell",
    rating: 5,
    relativeTime: "18 weeks ago",
    quote:
      "Dr Nate and team are very helpful and thorough. Came in for shoulder pain and they were very helpful to make it feel so much better better.",
  },
  {
    name: "Brandon Otten",
    rating: 5,
    relativeTime: "18 weeks ago",
    quote:
      "Dr.Nate did a great job of speeding up the healing process with my back. He also helped speed up recovery time on my sprained ankle. Would recommend",
  },
  {
    name: "Ashley Falkos",
    rating: 5,
    relativeTime: "6 months ago",
    quote:
      "I've had such a positive experience with Integrative Medicine! From the moment you walk in, the staff is incredibly friendly and welcoming—they truly make you feel like part of the family. It's clear they genuinely care about their patients and go out of their way to create a comfortable, supportive environment. Dr. Nate is especially impressive. He's professional, knowledgeable, and takes the time to really listen and explain things in a way that's easy to understand. You never feel rushed, and it's obvious he's committed to providing thoughtful, personalized care. I highly recommend Integrative Medicine to anyone looking for a place where you're treated with kindness, respect, and expert care!",
  },
  {
    name: "Eric F",
    rating: 5,
    relativeTime: "29 weeks ago",
    quote:
      "Very nice family-run business in Geneva. They offer a lot of innovative health services, and they were very nice to work with.",
  },
  {
    name: "Lee Petit",
    rating: 5,
    relativeTime: "40 weeks ago",
    quote: "My knees are pain free. Thank you to Genesis and their wonderful staff!",
  },
  {
    name: "Adam L Maldonado",
    rating: 5,
    relativeTime: "March 19, 2025",
    quote:
      "Excellent place to go for overall wellness with a comprehensive team of professionals who show they care. My overall daily vibe changed and improved thanks to going. Never just go to a chiro, go to an office like this who looks at all angles of wellness and body care. Our physical and mental health interact with each other and taking care of one can help the other. Keep that in mind and check these guys out. And no I'm not paid or anything for this I just love them.",
  },
  {
    name: "Chris Wonsowski",
    rating: 5,
    relativeTime: "November 14, 2024",
    quote:
      "Dr. Nate and his staff are terrific. I came in when I had an issue where I could barely move my arm or neck and they helped clear that up immediately. Been receiving ongoing treatment to help straighten my spine and support my back with the work that I do. Definitely try them out!",
  },
  {
    name: "Cosmo Vivirito",
    rating: 5,
    relativeTime: "28 Mar 2025",
    quote: "Great experience Dr Nate is the best, whole team is phenomenal, highly recommend",
  },
  {
    name: "Judy Nelson",
    rating: 5,
    relativeTime: "27 Mar 2025",
    quote:
      "I've been going to Genesis Integrative Medicine for over 8 years and have nothing but good things to say about Dr. Nate and his staff.",
  },
  {
    name: "Maggie Nelson",
    rating: 5,
    relativeTime: "27 Mar 2025",
    quote:
      "Dr. Nate is so great, he is always open to helping you with anything you need! The rest of the staff that I've interacted with have been great, super friendly and helpful as well! The team at Genesis Integrative Medicine is the one you want to go to for any of your holistic medicine needs!",
  },
  {
    name: "SueEllen Edwards",
    rating: 5,
    relativeTime: "26 Mar 2025",
    quote:
      "Angela is just fabulous! Easy, helpful, caring and a great reset to feeling your best! Treat yourself and your friends to more energy today!",
  },
  {
    name: "Kurt Weber",
    rating: 5,
    relativeTime: "26 Mar 2025",
    quote:
      "Dr. Nate and his team of highly qualified staff bring a very personalized approach to helping you in your recovery journey.",
  },
  {
    name: "Ryan Spier",
    rating: 5,
    relativeTime: "26 Mar 2025",
    quote:
      "Best chiropractor out there. Has helped me since high school through many injuries through sports/working out",
  },
  {
    name: "Claire K",
    rating: 5,
    relativeTime: "26 Mar 2025",
    quote:
      "I've been seeing Dr Nate for years (10, I believe)! He has helped me in so many ways beyond the typical adjustments. I had terrible jaw issues that he corrected, along with shoulder, back, and arm problems. I highly recommend him and his team.",
  },
  {
    name: "K Kearby",
    rating: 5,
    relativeTime: "26 Mar 2025",
    quote:
      "Great help with my chronic pain management. From shoe inserts to physical therapy, I feel much better.",
  },
  {
    name: "Marissa Jackson",
    rating: 5,
    relativeTime: "26 Mar 2025",
    quote:
      "I have been going to Dr.Nate since I was a little girl. And you know that popping sound when your neck gets cracked? Well it used to scare me when I was little but he had a solution. He called it popcorn. Even though it was such a little thing that he said to make it fun. It stuck with both me and my brother. And I feel as though having the ability to make those around you comfortable is one of the most important qualities you could have. We originally started going to go to Dr.Nate because I was a toe walker, but as my mom was looking at the diagram she started to wonder if he could fix my speech as well, because the multiple speech therapist I had seen all said it couldn't be fixed. But after a few appointments, I was speaking like normal. I truly don't think there is a place that is filled with more kind people who have a passion to help others than Genesis Integrated Medicine.",
  },
  {
    name: "Susan Petschke",
    rating: 5,
    relativeTime: "24 Mar 2025",
    quote:
      "I came to Genesis for their weight loss program. My results exceeded anything I could ever have hoped for. The staff is encouraging and supportive, continuing to guide me through this journey.",
  },
  {
    name: "Bill Winsininski",
    rating: 5,
    relativeTime: "24 Mar 2025",
    quote:
      "Me and my family have been coming to Genesis Interactive since they opened. It is a part of our wellness routine and above all that we look forward to seeing Dr Nate and his team. Everyone is fantastic.",
  },
  {
    name: "Heather Ingevaldson",
    rating: 5,
    relativeTime: "21 Mar 2025",
    quote:
      "I have been a patient of Dr. Nate's for 2 years and I can honestly say that this place has changed my life! Dr. Nate and his staff stay up to date on all the latest technology, techniques and methods for chiropractic care, pain management and for weight loss. You will not find another practice that does it better than this one stop shop! They teach methods to avoid pain throughout your life by changing the way you do everyday things and they never push extra treatments you don't need. I highly recommend coming in and trying everything they have to offer!",
  },
  {
    name: "Tom Bryson",
    rating: 5,
    relativeTime: "21 Mar 2025",
    quote:
      "Great place and the staff is phenomenal! They have really been able to help me in my weight loss journey",
  },
  {
    name: "Nancy Molitor",
    rating: 5,
    relativeTime: "21 Mar 2025",
    quote: "Dr Nate and staff are amazing!! Highly recommended for kids as well!",
  },
  {
    name: "Chris Vanko",
    rating: 5,
    relativeTime: "21 Mar 2025",
    quote: "Great service and was seen quickly.",
  },
  {
    name: "A B",
    rating: 5,
    relativeTime: "January 25, 2022",
    quote:
      "Every step of my healing process has been incredibly quick and easy thanks to the folks over at genesis integrative medicine! They were able to get me in for a new patient appointment the same day that I called. After that it was some quick tests and X-rays to figure out a plan. Dr. Nate was able to assess the damage done to my spine and create a 10 week healing plan. I am a little over half way done with the plan and I can definitely feel a difference! My mobility and pain has improved greatly. I would recommend this place to anyone!",
  },
  {
    name: "Grace Molina",
    rating: 5,
    relativeTime: "September 23, 2019",
    quote:
      "Everyone is very professional, kind, patient, and knowledgeable here. Dr. Nate has done so much for my daughter who started a year ago when she couldn't hardly walk and was in so much pain. Today she is pain free, playing softball again, she is happy, and we owe it to Dr Nate and everyone there. Kim and all the staff are phenomenal as well. Highly recommended!",
  },
  {
    name: "Dennis Johnson",
    rating: 5,
    relativeTime: "May 3, 2021",
    quote:
      "I have had a great experience! Dr. Nate is always very positive and has done an incredible job in keeping my body well adjusted. Maintaining regular appointments has proven to be the key to maintaining my health and well being. HIs staff is very friendly and always helpful. A five star recommendation for sure!!!",
  },
];

/** The only acceptance test for a card or a JSON-LD review. */
export function isFiveStarReview(review: GoogleReview): boolean {
  return review.rating === 5 && review.quote.trim().length > 0 && review.name.trim().length > 0;
}

export const fiveStarReviews = googleReviews.filter(isFiveStarReview);
