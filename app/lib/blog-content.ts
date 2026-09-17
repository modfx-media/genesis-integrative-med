/**
 * Blog content data source.
 *
 * Post metadata is sourced verbatim from the live site
 * (https://genesisintegrativemed.com/blog/), titles, dates, and excerpts
 * are preserved exactly. Slugs match the live root-level URLs (WordPress
 * default) so internal links from the /blog/ index continue to resolve to
 * the same canonical URLs when individual posts are cloned in the
 * upcoming Blog batches.
 */

export type BlogPost = {
  /** URL slug, matches live site (e.g. "living-with-neuropathy-when-seek-treatment"). */
  slug: string;
  /** Post title, preserved verbatim from the live site. */
  title: string;
  /** Publish date in ISO format, YYYY-MM-DD. */
  date: string;
  /** Short excerpt/dek preserved from the live site. */
  excerpt: string;
  /** Path to the hero/thumbnail image (optional, falls back to gradient when absent). */
  image?: string;
  /** Rough category surfaced as a chip on the card (derived from title). */
  category?: string;
};

/** Publish date formatter (matches live "Jul 5, 2026" style). */
export function formatPostDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Href for a post, served under /blog/<slug>/ by the dynamic route. */
export function postHref(slug: string): string {
  return `/blog/${slug}/`;
}

export function isRemoteImage(src: string | undefined): boolean {
  return Boolean(src && /^https?:\/\//i.test(src));
}

/** Unique category names across all posts, alphabetically sorted. */
export function getBlogCategories(): readonly string[] {
  const categories = new Set<string>();
  for (const post of BLOG_POSTS) {
    if (post.category) categories.add(post.category);
  }
  return Array.from(categories).sort((a, b) => a.localeCompare(b));
}

/** All posts in a given category, newest first (matches BLOG_POSTS order). */
export function postsByCategory(category: string): readonly BlogPost[] {
  return BLOG_POSTS.filter((post) => post.category === category);
}

/**
 * All posts in reverse-chronological order (newest first).
 *
 * The full 59-post list is mirrored verbatim from the live site
 * (https://genesisintegrativemed.com/blog/ pages 1–5). Slugs, titles,
 * publish dates, and excerpts are preserved exactly as served by the
 * live index. Local hero images are wired only for posts whose full
 * body has been cloned into `blog-post-content.ts`; all other posts
 * fall back to the gradient card and link to `/{slug}/` (matching the
 * live URL pattern).
 */
export const BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: "geneva-disc-pain-care-non-surgical-and-surgical-paths",
    title: "Questioning Disc Surgery? Disc Pain Specialists in Geneva Explain Options",
    date: "2026-09-17",
    excerpt: "Rethink Disc Surgery Before You Say Yes Back pain from disc problems can wear you down fast. After a summer of flare-ups, missed activities, and restless nights, it is easy to feel like surgery is the only way out\u2026",
    image: "/images/blog/geneva-disc-pain-care-non-surgical-and-surgical-paths.jpg",
    category: "Disc Pain",
  },
  {
    slug: "laser-lipo-effectiveness-for-stubborn-midlife-belly-fat",
    title: "Laser Lipo Effectiveness for Stubborn Midlife Belly Fat",
    date: "2026-09-14",
    excerpt: "Shrinking Stubborn Belly Fat Without Major Surgery Midlife belly fat can feel very unfair. You eat better than you did when you were younger, you try to move more, yet your waistband still feels tight\u2026",
    image: "/images/blog/laser-lipo-for-stubborn-belly-fat.webp",
    category: "Cold Laser",
  },
  {
    slug: "understanding-neuropathy-treatment-options-in-geneva-il",
    title: "Understanding Neuropathy Treatment Options in Geneva IL",
    date: "2026-09-07",
    excerpt: "Neuropathy can make simple daily tasks feel hard and frustrating. When your feet burn, tingle, or feel numb, walking across the room may feel like walking on pebbles. When your hands are weak or clumsy, buttoning a shirt or gripping the steering wheel can feel scary\u2026",
    image: "/images/blog/understanding-neuropathy-treatment-options-in-geneva-il.png",
    category: "Neuropathy",
  },
  {
    slug: "prp-for-sports-joint-injuries-timeline-return-to-play",
    title: "PRP for Sports Joint Injuries in Geneva: Timeline and Return to Play",
    date: "2026-08-24",
    excerpt: "PRP Support for Active Geneva Adults Between Seasons Joint pain can turn a fun season of sports into a constant struggle. If you are an active adult in Geneva who runs, golfs, plays tennis\u2026",
    image: "/images/conditions/prp-joint-injections-for-athletes-in-geneva-il.webp",
    category: "PRP",
  },
  {
    slug: "prp-vs-cortisone-vs-hyaluronic-acid-joint-injection",
    title: "PRP vs. Cortisone vs. Hyaluronic Acid in Geneva: Which Joint Injection?",
    date: "2026-08-17",
    excerpt: "Move Pain-Free in Every Season in Geneva Joint pain has a way of showing up right when you want to\u2026",
    image: "/images/blog/prp-vs-cortisone-vs-hyaluronic-acid-joint-injection.jpg",
    category: "PRP",
  },
  {
    slug: "non-surgical-back-pain-treatment-therapies",
    title: "Non-Surgical Back Pain Treatment: First Visit, Evaluation, and Therapies",
    date: "2026-08-10",
    excerpt: "What Really Happens with Non-Surgical Back Pain Care Non-surgical back pain treatment is a real option for many people who want relief without surgery or long-term pain\u2026",
    image: "/images/blog/non-surgical-back-pain-treatment-therapies.jpg",
    category: "Back Pain",
  },
  {
    slug: "summer-sports-injuries-hip-pain-doctor",
    title: "Summer Sports Injuries in Geneva: When Hip Pain Needs a Doctor",
    date: "2026-08-03",
    excerpt: "Summer Hip Pain: When It\u2019s More Than Just Soreness Hip pain has a way of sneaking up on people during\u2026",
    image: "/images/blog/summer-sports-injuries-hip-pain-doctor.jpg",
    category: "Hip Pain",
  },
  {
    slug: "cold-laser-therapy-for-arthritis-pain",
    title: "What Cold Laser Therapy in Geneva Means for Arthritis Pain",
    date: "2026-07-24",
    excerpt: "Discover a Gentler Option for Arthritis Relief Arthritis pain can make even simple days feel long. Stiff mornings, sore fingers\u2026",
    image: "/images/blog/cold-laser-therapy-for-arthritis-pain.jpg",
    category: "Cold Laser",
  },
  {
    slug: "everyday-habits-knee-pain-worse",
    title: "Everyday Habits That Make Knee Pain Worse in Geneva",
    date: "2026-07-17",
    excerpt: "Simple Daily Choices That Can Fuel Knee Pain Knee pain often sneaks up on people. It is not always one\u2026",
    image: "/images/blog/everyday-habits-knee-pain-worse.jpg",
    category: "Knee Pain",
  },
  {
    slug: "shockwave-and-cold-laser-heel-pain",
    title: "Comparing Shockwave and Cold Laser Therapy for Heel Pain",
    date: "2026-07-10",
    excerpt: "Find Lasting Relief From Heel Pain This Summer Heel pain can turn a fun, active season into something you dread.\u2026",
    image: "/images/blog/shockwave-and-cold-laser-heel-pain.jpg",
    category: "Shockwave Therapy",
  },
  {
    slug: "living-with-neuropathy-when-seek-treatment",
    title: "Living with Neuropathy in Geneva: When to Seek Treatment",
    date: "2026-07-03",
    excerpt: "When Numbness and Tingling Start Changing Your Life Living in Geneva can feel pretty special. There are walks along the\u2026",
    image: "/images/blog/living-with-neuropathy-when-seek-treatment.jpg",
    category: "Neuropathy",
  },
  {
    slug: "turning-to-shockwave-therapy-for-tendonitis",
    title: "Why Geneva Residents Are Turning to Shockwave Therapy for Tendonitis",
    date: "2026-06-26",
    excerpt: "Why Tendinitis Pain Is Rising in Active Geneva Tendinitis is a common problem for active people. It happens when a\u2026",
    image: "/images/blog/turning-to-shockwave-therapy-for-tendonitis.jpg",
    category: "Shockwave Therapy",
  },
  {
    slug: "arthritis-pain-without-relying-surgery",
    title: "Managing Arthritis Pain in Geneva Without Relying on Surgery",
    date: "2026-06-19",
    excerpt: "Move Freely Again: Arthritis Pain Relief in Geneva Arthritis pain can make simple things feel hard. Walking through downtown Geneva,\u2026",
    image: "/images/blog/arthritis-pain-without-relying-surgery.jpg",
    category: "Arthritis",
  },
  {
    slug: "peptide-therapy-medical-weight-loss",
    title: "Is Peptide Therapy the Missing Link in Medical Weight Loss?",
    date: "2026-06-12",
    excerpt: "Could Peptide Therapy Be Your Weight Loss Breakthrough This Summer? Weight loss can feel very frustrating when you are doing\u2026",
    image: "/images/blog/peptide-therapy-medical-weight-loss.jpg",
    category: "Weight Loss",
  },
  {
    slug: "non-surgical-back-pain-treatment",
    title: "Questioning Knee Surgery? Non-Surgical Back Pain Treatment Links You May Miss",
    date: "2026-06-05",
    excerpt: "Rethinking Knee Surgery When Your Back Also Hurts Knee surgery is a big decision, especially when your back has been\u2026",
    image: "/images/blog/non-surgical-back-pain-treatment.jpg",
    category: "Knee Pain",
  },
  {
    slug: "shockwave-therapy-in-geneva-for-heel-pain",
    title: "What to Expect From Shockwave Therapy in Geneva for Heel Pain",
    date: "2026-05-29",
    excerpt: "Faster Relief From Heel Pain with Shockwave Therapy Heel pain can turn simple things into a chore. Walking the Fox\u2026",
    image: "/images/blog/shockwave-therapy-in-geneva-for-heel-pain.jpg",
    category: "Shockwave Therapy",
  },
  {
    slug: "chiropractic-care-disc-pain-relief",
    title: "Chiropractic Care in Geneva for Long-Lasting Disc Pain Relief",
    date: "2026-05-22",
    excerpt: "Finally Find Disc Pain Relief That Lets You Live Again Disc pain can make even simple things around Geneva feel\u2026",
    image: "/images/blog/chiropractic-care-disc-pain-relief.jpg",
    category: "Disc Pain",
  },
  {
    slug: "signs-knee-pain-needs-specialist",
    title: "Signs Your Knee Pain Needs a Specialist in Geneva",
    date: "2026-05-15",
    excerpt: "Knee pain has a way of sneaking up at the worst time. You kneel to pull a few weeds, go\u2026",
    image: "/images/blog/signs-knee-pain-needs-specialist.jpg",
    category: "Knee Pain",
  },
  {
    slug: "knee-joint-pain-treatment-for-summer",
    title: "Knee Joint Pain Treatment in Geneva for Summer Activities",
    date: "2026-05-08",
    excerpt: "Enjoy Summer in Geneva Without Knee Pain Holding You Back Knee pain has a way of turning simple summer fun\u2026",
    image: "/images/blog/knee-joint-pain-treatment-for-summer.jpg",
    category: "Knee Pain",
  },
  {
    slug: "when-shoulder-pain-demands-specialist",
    title: "When Shoulder Pain Demands a Specialist in Geneva",
    date: "2026-05-01",
    excerpt: "Stop Shoulder Pain From Ruining Your Spring and Summer Shoulder pain has a way of sneaking into everything you do.\u2026",
    image: "/images/blog/when-shoulder-pain-demands-specialist.jpg",
    category: "Shoulder Pain",
  },
  {
    slug: "sciatica-treatment-in-geneva",
    title: "Sciatica Treatment in Geneva IL: When Chiropractic Is Enough",
    date: "2026-04-24",
    excerpt: "Stop Sciatica From Ruining Your Spring in Geneva Sciatica can make even simple movement feel scary. That sharp, burning, or\u2026",
    image: "/images/blog/sciatica-treatment-in-geneva.jpg",
    category: "Sciatica",
  },
  {
    slug: "prp-injection-therapy-in-geneva-for-joint-pain",
    title: "Understanding PRP Injection Therapy in Geneva for Joint Pain",
    date: "2026-04-17",
    excerpt: "Find Lasting Relief From Joint Pain This Spring Joint pain has a way of stealing the joy from simple things.\u2026",
    image: "/images/blog/prp-injection-therapy-in-geneva-for-joint-pain.jpg",
    category: "PRP",
  },
  {
    slug: "cold-laser-therapy-for-knee-pain-in-geneva",
    title: "Cold Laser Therapy for Knee Pain Relief in Geneva",
    date: "2026-04-10",
    excerpt: "Find Lasting Knee Pain Relief Without Surgery Knee pain has a way of stealing the fun from simple things. Walking\u2026",
    image: "/images/blog/cold-laser-therapy-for-knee-pain-in-geneva.jpg",
    category: "Cold Laser",
  },
  {
    slug: "avoid-knee-surgery-in-geneva-with-regenerative-options",
    title: "Avoiding Knee Surgery in Geneva With Regenerative Options",
    date: "2026-04-03",
    excerpt: "Step Into Spring Without Knee Surgery Knee pain can make even simple things feel hard. Walking along the Fox River,\u2026",
    image: "/images/blog/avoid-knee-surgery-in-geneva-with-regenerative-options.jpg",
    category: "Knee Pain",
  },
  {
    slug: "when-everyday-movements-suddenly-feel-hard",
    title: "When Everyday Movements Suddenly Feel Hard",
    date: "2026-03-27",
    excerpt: "Life\u2019s challenges can feel overwhelming. Learn effective strategies to navigate tough times, regain strength, and find balance in everyday movements.",
    image: "/images/blog/when-everyday-movements-suddenly-feel-hard.webp",
    category: "Wellness",
  },
  {
    slug: "runners-rescue-plan-how-shockwave-therapy-helps-you-beat-tendinitis-without-losing-momentum",
    title: "Runner\u2019s Rescue Plan: How Shockwave Therapy Helps You Beat Tendinitis Without Losing Momentum",
    date: "2025-12-05",
    excerpt: "When Pain Steals What You Love Most If you\u2019re a runner, an athlete, or just someone who enjoys staying active,\u2026",
    image: "/images/blog/runners-rescue-plan-how-shockwave-therapy-helps-you-beat-tendinitis-without-losing-momentum.png",
    category: "Shockwave Therapy",
  },
  {
    slug: "the-hidden-dangers-of-ignoring-myofascial-pain-and-how-shockwave-therapy-stops-the-damage-early",
    title: "The Hidden Dangers of Ignoring Myofascial Pain, And How Shockwave Therapy Stops the Damage Early",
    date: "2025-12-05",
    excerpt: "When Muscle Pain Turns Into a Daily Battle There\u2019s a certain kind of muscle pain that feels impossible to stretch\u2026",
    image: "/images/blog/the-hidden-dangers-of-ignoring-myofascial-pain-and-how-shockwave-therapy-stops-the-damage-early.png",
    category: "Shockwave Therapy",
  },
  {
    slug: "re-ignite-your-recovery-how-cold-laser-therapy-speeds-post-surgical-healing-gets-you-back-on-track",
    title: "Re-Ignite Your Recovery: How Cold Laser Therapy Speeds Post-Surgical Healing & Gets You Back on Track",
    date: "2025-11-17",
    excerpt: "When Recovery Doesn\u2019t Go as Planned Surgery is supposed to be the beginning of healing, not the start of a new\u2026",
    image: "/images/blog/re-ignite-your-recovery-how-cold-laser-therapy-speeds-post-surgical-healing-gets-you-back-on-track.png",
    category: "Cold Laser",
  },
  {
    slug: "why-your-shoulder-wont-heal-the-hidden-role-of-cold-laser-therapy-in-restoring-real-mobility",
    title: "Why Your Shoulder Won\u2019t Heal: The Hidden Role of Cold Laser Therapy in Restoring Real Mobility",
    date: "2025-11-17",
    excerpt: "The Pain That Follows You Everywhere Shoulder pain has a way of interrupting your entire life. It\u2019s the kind of\u2026",
    image: "/images/blog/why-your-shoulder-wont-heal-the-hidden-role-of-cold-laser-therapy-in-restoring-real-mobility.webp",
    category: "Cold Laser",
  },
  {
    slug: "break-free-from-chronic-pain-how-noninvasive-pain-care-in-geneva-il-is-changing-lives",
    title: "Break Free from Chronic Pain: How Noninvasive Pain Care in Geneva, IL, Is Changing Lives",
    date: "2025-10-11",
    excerpt: "Pain changes everything. It can turn simple joys, like playing with your kids, going for a walk, or sleeping comfortably, into daily\u2026",
    image: "/images/blog/break-free-from-chronic-pain-how-noninvasive-pain-care-in-geneva-il-is-changing-lives.png",
    category: "Pain Care",
  },
  {
    slug: "stop-living-with-heel-pain-heres-the-science-that-helps-you-walk-again",
    title: "Stop Living with Heel Pain, Here\u2019s the Science That Helps You Walk Again",
    date: "2025-10-11",
    excerpt: "Waking up with stabbing heel pain the moment your feet hit the floor can set the tone for your entire\u2026",
    image: "/images/blog/stop-living-with-heel-pain-heres-the-science-that-helps-you-walk-again.png",
    category: "Foot Pain",
  },
  {
    slug: "say-goodbye-to-chronic-pain-how-cold-laser-therapy-in-geneva-can-transform-your-life",
    title: "Say Goodbye to Chronic Pain: How Cold Laser Therapy in Geneva Can Transform Your Life",
    date: "2025-09-15",
    excerpt: "At Genesis Integrative Medicine, we understand how chronic pain can disrupt your daily life. From making it difficult to sleep\u2026",
    image: "/images/blog/say-goodbye-to-chronic-pain-how-cold-laser-therapy-in-geneva-can-transform-your-life.png",
    category: "Cold Laser",
  },
  {
    slug: "end-chronic-tendon-pain-with-shockwave-therapy",
    title: "End Chronic Tendon Pain With Shockwave Therapy",
    date: "2025-09-15",
    excerpt: "At Genesis Integrative Medicine, we know that tendon pain is more than just a physical issue, it\u2019s something that can quietly\u2026",
    image: "/images/blog/end-chronic-tendon-pain-with-shockwave-therapy.png",
    category: "Shockwave Therapy",
  },
  {
    slug: "how-regenerative-medicine-can-help-with-sciatica",
    title: "How Regenerative Medicine Can Help with Sciatica",
    date: "2025-09-15",
    excerpt: "If you\u2019ve ever felt a sharp, shooting pain that radiates from your lower back down to your leg, you may\u2026",
    image: "/images/blog/how-regenerative-medicine-can-help-with-sciatica.png",
    category: "Sciatica",
  },
  {
    slug: "why-a-healthy-spine-equals-a-healthy-life",
    title: "Why a Healthy Spine Equals a Healthy Life",
    date: "2025-09-15",
    excerpt: "Your spine is the central support structure of your body, connecting various parts and allowing you to stand, move, and\u2026",
    image: "/images/blog/why-a-healthy-spine-equals-a-healthy-life.png",
    category: "Back Pain",
  },
  {
    slug: "how-regenerative-medicine-helps-with-athlete-recovery",
    title: "How Regenerative Medicine Helps with Athlete Recovery",
    date: "2025-09-15",
    excerpt: "Athletes constantly push their bodies to the limit, whether in training, competition, or recovery. Unfortunately, this level of physical exertion\u2026",
    image: "/images/blog/how-regenerative-medicine-helps-with-athlete-recovery.png",
    category: "Regenerative Medicine",
  },
  {
    slug: "genesis-lipotropic-peptides",
    title: "Is Medical Weight Loss Safe?",
    date: "2025-01-18",
    excerpt: "Medical weight loss has become an increasingly popular option for individuals struggling to lose weight through traditional diet and exercise.\u2026",
    image: "/images/blog/genesis-lipotropic-peptides.jpg",
    category: "Weight Loss",
  },
  {
    slug: "genesis-weight-loss",
    title: "Medical Weight Loss and Wellness: A Sustainable Path to Health",
    date: "2025-01-18",
    excerpt: "Weight loss is often framed as a purely aesthetic goal, but its impact on overall wellness is profound. Achieving and\u2026",
    image: "/images/blog/genesis-weight-loss.jpg",
    category: "Weight Loss",
  },
  {
    slug: "neck-pain-genesis",
    title: "How to Relieve Neck Pain from Sleeping Wrong",
    date: "2025-01-18",
    excerpt: "Neck pain can be a frustrating start to your day, especially when it stems from something as simple as sleeping\u2026",
    image: "/images/blog/neck-pain-genesis.jpg",
    category: "Neck Pain",
  },
  {
    slug: "peptides-for-weight-loss",
    title: "Why Are People Choosing Peptides for Weight Loss? A Natural Alternative to Popular Medications",
    date: "2025-01-12",
    excerpt: "The weight loss industry continues to evolve, with more people seeking science-backed solutions beyond traditional methods. As mainstream medications dominate\u2026",
    image: "/images/blog/peptides-for-weight-loss.jpg",
    category: "Weight Loss",
  },
  {
    slug: "diet-and-exercise-not-working",
    title: "Why Are Diet and Exercise Not Working for Weight Loss? The Truth about Metabolic Resistance",
    date: "2025-01-12",
    excerpt: "The scale won\u2019t budge. Your clothes still fit the same. The mirror shows no changes. When diet and exercise are\u2026",
    image: "/images/blog/diet-and-exercise-not-working.jpg",
    category: "Weight Loss",
  },
  {
    slug: "lipotropic-injections-genesis",
    title: "What Are Lipotropic Injections?",
    date: "2024-12-31",
    excerpt: "Lipotropic injections are a new treatment designed to support weight loss and overall wellness by enhancing the body\u2019s natural fat-burning\u2026",
    image: "/images/blog/lipotropic-injections-genesis.jpg",
    category: "Weight Loss",
  },
  {
    slug: "how-to-lose-weight-without-starving",
    title: "How to Lose Weight without Starving",
    date: "2024-12-31",
    excerpt: "Losing weight is a common goal for many people, but the process often feels defeating. From trendy diets to extreme\u2026",
    image: "/images/blog/how-to-lose-weight-without-starving.jpg",
    category: "Weight Loss",
  },
  {
    slug: "genesis-and-bursitis",
    title: "Where Is Shoulder Bursitis Pain Felt?",
    date: "2024-12-31",
    excerpt: "Shoulder pain can significantly impact daily life, making it difficult to perform even the simplest tasks, such as reaching for\u2026",
    image: "/images/blog/genesis-and-bursitis.jpg",
    category: "Shoulder Pain",
  },
  {
    slug: "best-chiropractor-near-me",
    title: "Find the Best Chiropractor Near You at Genesis Integrative Medicine",
    date: "2024-12-10",
    excerpt: "When it comes to finding the best chiropractor near you, Genesis Integrative Medicine is dedicated to providing top-quality, holistic care\u2026",
    image: "/images/blog/best-chiropractor-near-me.jpg",
    category: "Chiropractic",
  },
  {
    slug: "best-peptides-weight-loss",
    title: "Compare the Best Peptides for Weight Loss",
    date: "2024-12-10",
    excerpt: "If you\u2019re seeking natural, effective methods for weight loss, peptides can offer a powerful solution. Genesis Integrative Medicine in Geneva,\u2026",
    image: "/images/blog/best-peptides-weight-loss.jpg",
    category: "Weight Loss",
  },
  {
    slug: "when-to-go-to-the-hospital-for-knee-pain",
    title: "When to Go to the Hospital for Knee Pain",
    date: "2024-06-20",
    excerpt: "Knee pain is a common issue that can result from various causes, including minor injuries and more serious conditions requiring\u2026",
    image: "/images/blog/when-to-go-to-the-hospital-for-knee-pain.png",
    category: "Knee Pain",
  },
  {
    slug: "healing-strategies-elbow-tendonitis",
    title: "Healing Strategies for Elbow Tendonitis: From Rest to Rehabilitation",
    date: "2024-06-19",
    excerpt: "Elbow tendonitis, also known as tennis elbow, can be a debilitating condition resulting from overuse of the elbow, particularly due\u2026",
    image: "/images/blog/healing-strategies-elbow-tendonitis.png",
    category: "Shockwave Therapy",
  },
  {
    slug: "choosing-the-right-chiropractor-in-geneva-illinois",
    title: "Choosing the Right Chiropractor in Geneva, Illinois: What to Look for",
    date: "2024-06-07",
    excerpt: "Selecting the best bone and joint expert in Geneva, Illinois, may be a simple choice that significantly impacts your prosperity.\u2026",
    image: "/images/blog/choosing-the-right-chiropractor-in-geneva-illinois.png",
    category: "Chiropractic",
  },
  {
    slug: "knee-joint-pain-treatment-options",
    title: "Comprehensive Knee Joint Pain Treatment: What Are Your Options?",
    date: "2024-05-28",
    excerpt: "Knee pain management is a common problem that affects individuals of all ages and in many settings. It often results\u2026",
    image: "/images/blog/knee-joint-pain-treatment-options.png",
    category: "Knee Pain",
  },
  {
    slug: "stretching-and-exercise-in-treating-plantar-fasciitis",
    title: "The Role of Stretching and Exercise in Treating Plantar Fasciitis",
    date: "2024-04-04",
    excerpt: "A common foot condition known as plantar fasciitis is characterized by inflammation and disruption of the plantar sash, a thick\u2026",
    image: "/images/blog/stretching-and-exercise-in-treating-plantar-fasciitis.jpg",
    category: "Foot Pain",
  },
  {
    slug: "strategies-to-prevent-degenerative-disc",
    title: "10 Effective Strategies To Prevent Degenerative Disc",
    date: "2024-04-04",
    excerpt: "The spreading collapse of the intervertebral rings within the spine is a common sign of degenerative plate malady. This breakdown\u2026",
    image: "/images/blog/strategies-to-prevent-degenerative-disc.jpg",
    category: "Disc Pain",
  },
  {
    slug: "prp-treatment-for-athletes",
    title: "Enhancing Performance and Recovery: PRP Treatment for Athletes",
    date: "2024-03-01",
    excerpt: "In the realm of athletics, where the pursuit of optimal performance is paramount, rivals are constantly exploring new methods to\u2026",
    image: "/images/blog/prp-treatment-for-athletes.jpg",
    category: "PRP",
  },
  {
    slug: "causes-of-knee-pain",
    title: "Must-know Causes of Knee Pain and the Best-suited Treatments",
    date: "2024-02-05",
    excerpt: "One of the most common joint problems globally is knee joint pain, which often involves a restricted range of motion\u2026",
    image: "/images/blog/causes-of-knee-pain.jpg",
    category: "Knee Pain",
  },
  {
    slug: "need-to-know-about-laser-lipo",
    title: "Five Things You Need to Know About Laser Lipo",
    date: "2024-02-02",
    excerpt: "If you are wondering how the therapy of laser for weight loss works, contact one of our lipo laser experts\u2026",
    image: "/images/blog/need-to-know-about-laser-lipo.jpg",
    category: "Weight Loss",
  },
  {
    slug: "telehealth-the-advantages-of-telemedicine",
    title: "Telehealth: The Advantages of Telemedicine",
    date: "2021-11-29",
    excerpt: "The COVID-19 pandemic has triggered dramatic changes throughout everyday life, and in the medical community as well. Not only\u2026",
    image: "/images/blog/telehealth-the-advantages-of-telemedicine.jpg",
    category: "Telehealth",
  },
  {
    slug: "new-advancements-in-peripheral-neuropathy-treatment",
    title: "New Advancements in Peripheral Neuropathy Treatment",
    date: "2021-10-19",
    excerpt: "Have you been told that drugs and surgery are your only option for treating Peripheral Neuropathy? You\u2019re not alone! Maybe\u2026",
    image: "/images/blog/new-advancements-in-peripheral-neuropathy-treatment.webp",
    category: "Neuropathy",
  },
  {
    slug: "do-i-have-plantar-fasciitis",
    title: "Do I Have Plantar Fasciitis?",
    date: "2021-06-26",
    excerpt: "You\u2019re waking up from a good night\u2019s sleep, take your first step out of bed, and BAM! you get a\u2026",
    image: "/images/blog/do-i-have-plantar-fasciitis.webp",
    category: "Foot Pain",
  },
  {
    slug: "get-to-the-root-cause-of-headaches",
    title: "Get to the Root Cause of Headaches",
    date: "2021-05-28",
    excerpt: "Every now and then, we all get headaches. However, if you are suffering from headaches or migraines more regularly you\u2019re\u2026",
    image: "/images/blog/get-to-the-root-cause-of-headaches.webp",
    category: "Headaches",
  },
  {
    slug: "eliminate-unwanted-fat-with-invisa-red-laser-treatments",
    title: "Eliminate Unwanted Fat With invisa-RED\u2122 Laser Treatments",
    date: "2020-02-01",
    excerpt: "Carrying excess weight can be quite harmful to your health. In fact, obesity is a chronic condition impacting more than\u2026",
    image: "/images/blog/eliminate-unwanted-fat-with-invisa-red-laser-treatments.jpg",
    category: "Wellness",
  },
  {
    slug: "take-a-nonsurgical-approach-to-pain-with-regenerative-medicine",
    title: "Take a Nonsurgical Approach to Pain with Regenerative Medicine",
    date: "2019-12-31",
    excerpt: "Chronic pain is a growing epidemic in the United States. According to the Centers for Disease Control and Prevention (CDC),\u2026",
    image: "/images/blog/take-a-nonsurgical-approach-to-pain-with-regenerative-medicine.jpg",
    category: "Regenerative Medicine",
  },
  {
    slug: "why-is-rehabilitation-so-important-after-an-injury",
    title: "Why Is Rehabilitation So Important After an Injury?",
    date: "2019-11-30",
    excerpt: "After an injury, the most important task you have is rehabilitating yourself. While minor injuries can mean a quick recovery,\u2026",
    image: "/images/blog/why-is-rehabilitation-so-important-after-an-injury.jpg",
    category: "Rehab",
  },
  {
    slug: "suffering-from-chronic-headaches-chiropractic-care-can-help",
    title: "Suffering From Chronic Headaches? Chiropractic Care Can Help",
    date: "2019-11-01",
    excerpt: "There are several kinds of headaches. Some creep in with a dull, persistent throb while others knock you off your\u2026",
    image: "/images/blog/suffering-from-chronic-headaches-chiropractic-care-can-help.jpg",
    category: "Headaches",
  },
  {
    slug: "losing-weight-lowers-your-risk-of-these-common-conditions",
    title: "Losing Weight Lowers Your Risk of These Common Conditions",
    date: "2019-10-01",
    excerpt: "Losing weight is one of the best things you can do for your health and longevity. This is because being\u2026",
    image: "/images/blog/losing-weight-lowers-your-risk-of-these-common-conditions.jpg",
    category: "Weight Loss",
  },
  {
    slug: "cold-laser-therapy-drug-free-treatment-for-joint-and-muscle-pain",
    title: "Cold Laser Therapy: Drug-Free Treatment for Joint and Muscle Pain",
    date: "2019-08-01",
    excerpt: "Consider that 54 million Americans have been diagnosed with arthritis and that number is expected to rise to 78 million\u2026",
    image: "/images/blog/cold-laser-therapy-drug-free-treatment-for-joint-and-muscle-pain.jpg",
    category: "Cold Laser",
  },
  {
    slug: "how-prp-is-revolutionizing-arthritis-treatment",
    title: "How PRP is Revolutionizing Arthritis Treatment",
    date: "2019-07-12",
    excerpt: "There are more than 54 million people who suffer from arthritis in the United States, and this number is expected\u2026",
    image: "/images/blog/how-prp-is-revolutionizing-arthritis-treatment.jpg",
    category: "Arthritis",
  },
  {
    slug: "finish-off-your-weight-loss-journey-with-lipo-mino-injections",
    title: "Finish Off Your Weight-Loss Journey With Lipo-Mino Injections",
    date: "2019-07-04",
    excerpt: "Weight loss and maintaining a healthy weight throughout the course of your life is something with which nearly half of\u2026",
    image: "/images/blog/finish-off-your-weight-loss-journey-with-lipo-mino-injections.jpg",
    category: "Weight Loss",
  },
];

/** Posts per page (matches live site's 12 per page). */
export const POSTS_PER_PAGE = 12;

/** Total number of pages the live site currently exposes. */
export const LIVE_TOTAL_PAGES = 5;

/**
 * Number of pages the index should render. Uses whichever is greater between
 * the number of pages actually required to hold `BLOG_POSTS` and the live
 * site's known total, so early Blog batches keep the pagination links
 * visible even before all posts are cloned locally.
 */
export function totalBlogPages(): number {
  const local = Math.max(1, Math.ceil(BLOG_POSTS.length / POSTS_PER_PAGE));
  return Math.max(local, LIVE_TOTAL_PAGES);
}

/** Slice of posts for a given 1-based page number. */
export function paginatedPosts(page: number): readonly BlogPost[] {
  const start = (page - 1) * POSTS_PER_PAGE;
  return BLOG_POSTS.slice(start, start + POSTS_PER_PAGE);
}

/** Href for a given page number (page 1 → /blog/, others → /blog/page/N/). */
export function pageHref(page: number): string {
  return page <= 1 ? "/blog/" : `/blog/page/${page}/`;
}

export const BLOG_INDEX_META = {
  title: "Blog",
  description:
    "Read the latest health, wellness, and integrative-medicine articles from the team at Genesis Integrative Medicine in Geneva, Illinois.",
  canonicalOrigin: "https://genesisintegrativemed.com/blog/",
} as const;
