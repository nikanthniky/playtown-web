"use client";
import { useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  Users,
  Flag,
  School,
  HeartHandshake,
  PersonStanding,
  Network,
  Megaphone,
  Building2,
} from "lucide-react";
const audiences = [
  {
    name: "Athletes & teams",
    icon: PersonStanding,
    title: "A place to play. A place to belong.",
    text: "From your first training session to the team you call your own, we want to make it easier to find a community and keep growing in sport.",
    image: "community-cricket",
    alt: "A young cricket player practicing a batting shot in Pune, India",
    caption: "FOR THE NEXT CHAPTER OF YOUR GAME",
  },
  {
    name: "Organizers",
    icon: Flag,
    title: "For the people who make it happen.",
    text: "Behind every competition is someone bringing people together. We’re building with those organizers in mind, so more energy can go into the sporting experience.",
    image: "community-football",
    alt: "Young people playing football together on a dusty field in Kolkata",
    caption: "FOR THE PEOPLE BEHIND EVERY EVENT",
  },
  {
    name: "Clubs & academies",
    icon: Building2,
    title: "Stronger clubs. Lasting communities.",
    text: "Clubs and academies turn a shared interest into a lasting habit. Our ambition is to help those local networks connect, collaborate, and grow.",
    image: "community-basketball",
    alt: "Women competing in a basketball game",
    caption: "FOR COMMUNITIES THAT KEEP SHOWING UP",
  },
  {
    name: "Schools",
    icon: School,
    title: "A sporting beginning that lasts.",
    text: "School sport can be the start of a lifelong journey. We want to connect the people who give young athletes a safe, encouraging place to begin.",
    image: "community-cricket",
    alt: "A young cricket player practicing on an outdoor pitch",
    caption: "FOR THE VERY FIRST SPARK",
  },
  {
    name: "Coaches",
    icon: Users,
    title: "Support for the people who inspire.",
    text: "Coaches build confidence as much as ability. We want to help them become more connected to the communities and opportunities around their sport.",
    image: "community-football",
    alt: "A grassroots football game on an open field in Kolkata",
    caption: "FOR EVERY GUIDE, MENTOR, AND BELIEVER",
  },
  {
    name: "Associations",
    icon: Network,
    title: "Shared ambition. Stronger connections.",
    text: "Associations connect local effort to a wider sporting purpose. We’re interested in working together to build participation and meaningful pathways.",
    image: "community-basketball",
    alt: "Women basketball players competing on an indoor court",
    caption: "FOR A MORE CONNECTED SPORTING LANDSCAPE",
  },
  {
    name: "Sports enthusiasts",
    icon: Megaphone,
    title: "You don’t have to play to belong.",
    text: "The friends, families, volunteers, and supporters on the sidelines are part of the story too. There’s a place here for everyone who loves sport.",
    image: "community-running",
    alt: "A diverse group of recreational runners participating together outdoors",
    caption: "FOR EVERYONE WHO SHARES THE FEELING",
  },
  {
    name: "Community builders",
    icon: HeartHandshake,
    title: "Bring your people. Build something bigger.",
    text: "From neighborhood groups to grassroots initiatives, we welcome the people creating more ways to participate, connect, and find belonging through sport.",
    image: "community-running",
    alt: "Runners of different backgrounds taking part in a community event",
    caption: "FOR THOSE WHO BRING US TOGETHER",
  },
];
export function Audiences() {
  const [selected, setSelected] = useState(0);
  const current = audiences[selected];
  return (
    <div className="audience-layout">
      <div
        className="audience-choices"
        role="group"
        aria-label="Explore who PlayTown is being built for"
      >
        {audiences.map((a, i) => (
          <button
            key={a.name}
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
          >
            <a.icon size={18} />
            <span>{a.name}</span>
            {selected === i ? <Check size={16} /> : <ArrowUpRight size={16} />}
          </button>
        ))}
      </div>
      <div className="audience-story" aria-live="polite" aria-atomic="true">
        <div className="audience-photo">
          <Image
            key={current.image}
            src={`/images/${current.image}.jpg`}
            alt={current.alt}
            fill
            sizes="(max-width: 700px) 100vw, 55vw"
          />
          <div className="audience-photo-shade" />
          <span>{current.caption}</span>
        </div>
        <div className="audience-copy">
          <h3>{current.title}</h3>
          <p>{current.text}</p>
        </div>
      </div>
    </div>
  );
}
