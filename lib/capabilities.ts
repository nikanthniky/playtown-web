// Product claims are grounded in the mobile source. See docs/playtown-audit.md.
export const capabilities = [
  {
    id: "identity",
    number: "01",
    title: "A sporting identity that goes beyond a name.",
    name: "Athlete identity & discovery",
    text: "Bring your sport, position, sporting background and affiliations into one athlete profile. Discover other publicly visible athletes by sport and location, so a local connection can begin beyond the people you already know.",
    detail:
      "Public profiles respect the athlete’s sharing choices. An affiliation on a profile does not automatically establish verified membership.",
  },
  {
    id: "achievements",
    number: "02",
    title: "Give your sporting journey a record.",
    name: "Sports Passport & achievements",
    text: "Keep playing history and eligible achievements connected to your sporting identity. Sports Passport distinguishes reviewed records from self-reported information, helping others understand what sits behind an achievement.",
    detail:
      "Recognition is based on eligible evidence and review, not an automatic certification of every claim.",
  },
  {
    id: "discovery",
    number: "03",
    title: "Find the competition. Understand the opportunity.",
    name: "Tournament discovery",
    text: "Explore published tournaments, upcoming matches and event details in one place. Athletes and teams can understand when and where to play, then register where the tournament’s rules and availability allow.",
    detail:
      "Discovery supports sporting opportunities; participation depends on the event’s eligibility and registration status.",
  },
  {
    id: "organizing",
    number: "04",
    title: "Less scattered coordination. More time for the game.",
    name: "Tournament & team management",
    text: "Create a tournament, review team entries and rosters, assign staff and manage its progress. Keep the people running a competition working around the same event, with actions tied to their responsibilities.",
    detail:
      "Team pages represent entries in a particular tournament. They are not yet permanent team profiles across competitions.",
  },
  {
    id: "scoring",
    number: "05",
    title: "Keep everyone on the same side of the score.",
    name: "Fixtures, live scoring & results",
    text: "Bring fixtures, match schedules and scoring into the tournament experience. Authorized officials record the action; spectators can follow published match information and results without needing scoring access.",
    detail:
      "The current scoring workflow focuses on volleyball. Support for other scoring engines is part of the longer-term direction.",
  },
  {
    id: "rankings",
    number: "06",
    title: "Recognition with something behind it.",
    name: "Athlete & team rankings",
    text: "Explore athlete rankings based on eligible individual awards and team standings based on competition results. See the sporting context and ranking rules, so a place on the board has a clear basis.",
    detail:
      "Rankings are not a universal skill rating. Club rankings are not currently available.",
  },
  {
    id: "social",
    number: "07",
    title: "Stay connected between match days.",
    name: "Social sports engagement",
    text: "Follow public athlete profiles, share text updates, and take part through likes and comments. Give your sporting community a way to keep the conversation going after the final point.",
    detail:
      "Photo-posting workflows are implemented but still awaiting end-to-end release verification. Following individual tournaments is not currently supported.",
  },
] as const;
export const audiences = [
  [
    "Athletes",
    "Build a sporting identity, find opportunities to play, and give your achievements context.",
  ],
  [
    "Organizers",
    "Bring team entries, fixtures, staff responsibilities and results into a connected tournament workflow.",
  ],
  [
    "Teams",
    "Enter competitions together, keep rosters clear, and follow the results of your tournament entry.",
  ],
  [
    "Clubs",
    "Connect people through the tournaments you organize or enter. Dedicated club profiles are a planned next step.",
  ],
  [
    "Supporters",
    "Discover local competitions, follow public athletes and stay closer to the sporting journeys you care about.",
  ],
  [
    "Institutions",
    "Explore PlayTown for your sporting community. Enquire about your needs; a separate institutional management product is not offered here.",
  ],
] as const;
