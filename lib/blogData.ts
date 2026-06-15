export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  paragraphs: string[]
}

export const posts: Post[] = [
  {
    slug: "the-hustle-is-a-local-maximum",
    title: "The Hustle Is a Local Maximum",
    date: "June 2026",
    excerpt:
      "On gradient descent, the Bay Area religion of velocity, and the rare discipline of knowing where to point your effort.",
    paragraphs: [
      "There's a particular religion in the Bay Area, and its liturgy is the changelog. We measure our days in commits and our worth in velocity, quietly mistaking motion for direction. The AI wave only sharpened the doctrine: ship faster, automate harder, let the models do the thinking so we can do more of the doing. But more doing is not the same as doing the right thing. Gradient descent will happily sprint you into a local maximum — fast, confident, and completely stuck — because at every step the only question it knows how to ask is \"which way is up from exactly here?\"",
      "I think the rarer skill, especially now, is stillness: the discipline to stop optimizing long enough to ask what you're optimizing for. The best engineers I know aren't the ones who never rest — they're the ones who can tell the difference between a problem that wants more effort and a problem that wants more thought. Intelligence, artificial or otherwise, is cheap when it's only ever pointed forward. The expensive, human part is knowing where to point it. So I'm trying to take more walks, write more than I ship, and treat a quiet afternoon not as wasted compute but as the only time the global picture ever shows up.",
    ],
  },
]

export const getPost = (slug: string) => posts.find((p) => p.slug === slug)
