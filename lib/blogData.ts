export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  paragraphs: string[]
  highlight?: string
  image?: string
  imageCaption?: string
}

export const posts: Post[] = [
  {
    slug: "optimize-for-curiosity",
    title: "Optimize for Curiosity",
    date: "June 2026",
    excerpt:
      "Why depth outlasts any trend, and the money tends to follow mastery, not the other way around.",
    highlight: "Sarthak Chauhan",
    image: "/blog-nyc.jpg",
    imageCaption: "P.S. a picture from my fav city.",
    paragraphs: [
      "Spend enough time in the Bay Area and you start to feel the gravity of it: everyone is optimizing for the same number, and the number is money. I used to chase it too, going after prosperity, the title, the next big role, as if the goal were a fixed point you could sprint toward. But the world here rewrites itself every few weeks; the model that mattered last month is a footnote by the next. Chasing money in a world that keeps changing is like aiming at a target moving faster than you are.",
      "What I've come around to is simpler: chase learning, not money. Being genuinely the best at something is the one bet that compounds no matter how the landscape shifts. As my friend Sarthak Chauhan puts it, \"learning is what matters, not money.\" The money tends to follow mastery, not the other way around, and it follows for longer. So I'm trying to optimize for the steeper learning curve over the bigger paycheck, betting that depth outlasts any single trend. Credit to Sarthak for the framing; it was his thought before it was mine, and it stuck.",
    ],
  },
]

export const getPost = (slug: string) => posts.find((p) => p.slug === slug)
