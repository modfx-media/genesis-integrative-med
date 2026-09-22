/**
 * Legacy review list. Live 5-star Google reviews now come from
 * lib/reviews.ts + lib/google-reviews.ts. Keep this file only as a
 * historical transcript; do not render it unfiltered.
 */

export type GoogleReview = {
  name: string;
  meta: string;
  time: string;
  rating: 5;
  text?: string;
};

export const GOOGLE_REVIEWS: readonly GoogleReview[] = [
  {
    name: "Melissa Miller",
    meta: "Local Guide • 12 reviews • 1 photo",
    time: "4 weeks ago",
    rating: 5,
    text: "I've been going to Genesis for a few months now primarily for a shoulder issue. Dr. Nate and his team has taught me a lot about treating and working with the surrounding areas that impact my joint mobility and have been working on that for several months with adjustments. I've never had chiropractic services and this combined with PT has had such a positive impact on my mobility. The entire staff is amazing and so very kind which makes the stress of these physical challenges more manageable.",
  },
  {
    name: "Tina Hardersen",
    meta: "4 reviews",
    time: "13 weeks ago",
    rating: 5,
    text: "I have been seeing Dr. Nate for 20 years, and I can confidently say he is exceptional. Over the years, he has helped me maintain my overall health and well-being, and his care has made a significant difference in my life. Additionally, he has been amazing with my son, helping him with his allergies and ear infections. His expertise, compassion, and dedication truly set him apart. I highly recommend him to anyone seeking a caring and experienced chiropractor.",
  },
  {
    name: "Robert Wicklund",
    meta: "3 reviews",
    time: "13 weeks ago",
    rating: 5,
    text: "I have experienced nearly sixty years of back pain. Over the years, I have been treated with acupuncture, and have seen chiropractors, massage therapists, and medical doctors. In the fall of 2025, the issues returned with a vengeance and didn't let up. Again, nothing helped. I was referred to Dr. Nate by a trusted friend. I could barely walk when I met with Dr. Nate who explained a clear and understandable reason for the pain. I agreed to follow his plan of treatment, which included me doing my part. Relief began within a short while and I continue to improve. Dr. Nate helped me where other treatments failed. I am very grateful!",
  },
  {
    name: "Angela Lowell",
    meta: "2 reviews",
    time: "18 weeks ago",
    rating: 5,
    text: "Dr Nate and team are very helpful and thorough. Came in for shoulder pain and they were very helpful to make it feel so much better better.",
  },
  {
    name: "Brandon Otten",
    meta: "1 review",
    time: "18 weeks ago",
    rating: 5,
    text: "Dr.Nate did a great job of speeding up the healing process with my back. He also helped speed up recovery time on my sprained ankle. Would recommend",
  },
  {
    name: "Ashley Falkos",
    meta: "Local Guide • 8 reviews • 8 photos",
    time: "21 weeks ago",
    rating: 5,
    text: "I've had such a positive experience with Integrative Medicine! From the moment you walk in, the staff is incredibly friendly and welcoming—they truly make you feel like part of the family. It's clear they genuinely care about their patients and go out of their way to create a comfortable, supportive environment. Dr. Nate is especially impressive. He's professional, knowledgeable, and takes the time to really listen and explain things in a way that's easy to understand. You never feel rushed, and it's obvious he's committed to providing thoughtful, personalized care. I highly recommend Integrative Medicine to anyone looking for a place where you're treated with kindness, respect, and expert care!",
  },
  {
    name: "Tri-City CPR",
    meta: "12 reviews • 1 photo",
    time: "29 weeks ago",
    rating: 5,
  },
  {
    name: "Eric F",
    meta: "Local Guide • 67 reviews • 9 photos",
    time: "29 weeks ago",
    rating: 5,
    text: "Very nice family-run business in Geneva. They offer a lot of innovative health services, and they were very nice to work with.",
  },
  {
    name: "Lee Petit",
    meta: "9 reviews",
    time: "40 weeks ago",
    rating: 5,
    text: "My knees are pain free. Thank you to Genesis and their wonderful staff!",
  },
  {
    name: "Tina Maurizio",
    meta: "6 reviews • 1 photo",
    time: "49 weeks ago",
    rating: 5,
    text: "The program sounded fine during the presentation, and aligned with what I was hoping to accomplish. But in reality, it did not go well. I expressed concerns about 0 loss multiple weeks, and Dr Nate never met with me once to discuss. The app for logging in food was off as well, with different options for the same protein or different options for the same milk, etc all having way different fat- protein- carb counts. It always threw my pie graph way off. We found examples that were supposed to be reported and corrected- but it never happened. In the end, they basically told me my plan was up and wished me well, with almost 0 loss through the duration of the program, so beware as this could happen to you as well and it's quite a large investment with no results. To say I'm disappointed is an understatement.",
  },
  {
    name: "Olivia Martinez",
    meta: "Local Guide • 31 reviews • 4 photos",
    time: "4 Apr 2025",
    rating: 5,
    text: "amazing staff but weight loss plan did not work for me...",
  },
  {
    name: "Cosmo Vivirito",
    meta: "8 reviews",
    time: "28 Mar 2025",
    rating: 5,
    text: "Great experience Dr Nate is the best, whole team is phenomenal, highly recommend",
  },
  {
    name: "Judy Nelson",
    meta: "7 reviews",
    time: "27 Mar 2025",
    rating: 5,
    text: "I've been going to Genesis Integrative Medicine for over 8 years and have nothing but good things to say about Dr. Nate and his staff.",
  },
  {
    name: "Maggie Nelson",
    meta: "2 reviews",
    time: "27 Mar 2025",
    rating: 5,
    text: "Dr. Nate is so great, he is always open to helping you with anything you need! The rest of the staff that I've interacted with have been great, super friendly and helpful as well! The team at Genesis Integrative Medicine is the one you want to go to for any of your holistic medicine needs!",
  },
  {
    name: "SueEllen Edwards",
    meta: "10 reviews",
    time: "26 Mar 2025",
    rating: 5,
    text: "Angela is just fabulous! Easy, helpful, caring and a great reset to feeling your best! Treat yourself and your friends to more energy today!",
  },
  {
    name: "Kurt Weber",
    meta: "7 reviews • 8 photos",
    time: "26 Mar 2025",
    rating: 5,
    text: "Dr. Nate and his team of highly qualified staff bring a very personalized approach to helping you in your recovery journey.",
  },
  {
    name: "Ryan Spier",
    meta: "2 reviews",
    time: "26 Mar 2025",
    rating: 5,
    text: "Best chiropractor out there. Has helped me since high school through many injuries through sports/working out",
  },
  {
    name: "Claire K",
    meta: "6 reviews • 5 photos",
    time: "26 Mar 2025",
    rating: 5,
    text: "I've been seeing Dr Nate for years (10, I believe)! He has helped me in so many ways beyond the typical adjustments. I had terrible jaw issues that he corrected, along with shoulder, back, and arm problems. I highly recommend him and his team.",
  },
  {
    name: "K Kearby",
    meta: "8 reviews • 17 photos",
    time: "26 Mar 2025",
    rating: 5,
    text: "Great help with my chronic pain management. From shoe inserts to physical therapy, I feel much better.",
  },
  {
    name: "Marissa Jackson",
    meta: "1 review",
    time: "26 Mar 2025",
    rating: 5,
    text: "I have been going to Dr.Nate since I was a little girl. And you know that popping sound when your neck gets cracked? Well it used to scare me when I was little but he had a solution. He called it popcorn. Even though it was such a little thing that he said to make it fun. It stuck with both me and my brother. And I feel as though having the ability to make those around you comfortable is one of the most important qualities you could have. We originally started going to go to Dr.Nate because I was a toe walker, but as my mom was looking at the diagram she started to wonder if he could fix my speech as well, because the multiple speech therapist I had seen all said it couldn't be fixed. But after a few appointments, I was speaking like normal. I truly don't think there is a place that is filled with more kind people who have a passion to help others than Genesis Integrated Medicine.",
  },
  {
    name: "Susan Petschke",
    meta: "13 reviews",
    time: "24 Mar 2025",
    rating: 5,
    text: "I came to Genesis for their weight loss program. My results exceeded anything I could ever have hoped for. The staff is encouraging and supportive, continuing to guide me through this journey.",
  },
  {
    name: "Bill Winsininski",
    meta: "3 reviews",
    time: "24 Mar 2025",
    rating: 5,
    text: "Me and my family have been coming to Genesis Interactive since they opened. It is a part of our wellness routine and above all that we look forward to seeing Dr Nate and his team. Everyone is fantastic.",
  },
  {
    name: "Heather Ingevaldson",
    meta: "4 reviews",
    time: "21 Mar 2025",
    rating: 5,
    text: "I have been a patient of Dr. Nate's for 2 years and I can honestly say that this place has changed my life! Dr. Nate and his staff stay up to date on all the latest technology, techniques and methods for chiropractic care, pain management and for weight loss. You will not find another practice that does it better than this one stop shop! They teach methods to avoid pain throughout your life by changing the way you do everyday things and they never push extra treatments you don't need. I highly recommend coming in and trying everything they have to offer!",
  },
  {
    name: "Tom Bryson",
    meta: "1 review",
    time: "21 Mar 2025",
    rating: 5,
    text: "Great place and the staff is phenomenal! They have really been able to help me in my weight loss journey",
  },
  {
    name: "Nancy Molitor",
    meta: "Local Guide • 15 reviews • 11 photos",
    time: "21 Mar 2025",
    rating: 5,
    text: "Dr Nate and staff are amazing!! Highly recommended for kids as well!",
  },
  {
    name: "Chris Vanko",
    meta: "2 reviews",
    time: "21 Mar 2025",
    rating: 5,
    text: "Great service and was seen quickly.",
  },
] as const;
