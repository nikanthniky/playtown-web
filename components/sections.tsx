import Image from "next/image";
import { ProductOverview } from "./product-overview";
import { SportIdentityVisual } from "./sport-identity-visual";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ArrowRight } from "lucide-react";
import { Button, Eyebrow, TextLink } from "./ui";
import { RequestForm } from "./request-form";
import { contact, playtownDownloads } from "@/lib/site";
import { capabilities, audiences } from "@/lib/capabilities";

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-layout">
        <div className="hero-copy">
          <Eyebrow>COMMUNITY SPORT. CONNECTED.</Eyebrow>
          <h1>
            Your game.
            <br />
            Your people.
            <br />
            <span>Your PlayTown.</span>
          </h1>
          <p>
            The talent on your street. The team on your ground. The tournament
            that brings everyone together. One platform for the people who make
            sport happen.
          </p>
          <div className="hero-actions">
            <Button href="#platform">Explore PlayTown</Button>
            <Link className="hero-story-link" href="#why-playtown">
              This is our story <ArrowDown size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <SportIdentityVisual />
      </div>
      <div className="container hero-bottom">
        <span>ATHLETES. TEAMS. ORGANIZERS. SUPPORTERS.</span>
        <span>
          A product by <strong>NISIMIN</strong>
        </span>
      </div>
    </section>
  );
}
export function WhyPlayTown() {
  return (
    <section className="section container why-section" id="why-playtown">
      <div className="section-top">
        <Eyebrow>01 / WHY PLAYTOWN EXISTS</Eyebrow>
        <span className="section-side">FOR THE GAME BEYOND THE SPOTLIGHT</span>
      </div>
      <h2>
        Talent is everywhere.
        <br />
        <span className="muted-heading">Opportunity should be, too.</span>
      </h2>
      <div className="problem-layout">
        <p className="lead">
          A sporting journey should not depend on who happens to know your name.
        </p>
        <div className="problem-list">
          <article>
            <span>01</span>
            <div>
              <h3>Good players can go unseen.</h3>
              <p>
                Athletes need a place for their sporting identity and
                achievements to be understood beyond their immediate circle.
              </p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>The next game can be hard to find.</h3>
              <p>
                Tournament information, teams and sporting connections can sit
                across scattered messages and local networks.
              </p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>Organizing takes more than a fixture list.</h3>
              <p>
                Entries, rosters, schedules and results all need coordination.
                The people doing that work deserve tools built around the game.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
export function IntroducingPlayTown() {
  return (
    <section className="intro-section" id="about">
      <div className="container intro-layout">
        <div>
          <Eyebrow>02 / MEET PLAYTOWN</Eyebrow>
          <h2>
            The game is bigger
            <br />
            when we’re
            <br />
            <em>connected.</em>
          </h2>
        </div>
        <div className="intro-copy">
          <p className="lead">
            PlayTown is a community-driven sports technology platform developed
            by NISIMIN.
          </p>
          <p>
            It brings athlete identities, sporting records, tournament discovery
            and competition workflows into a shared experience. A way to find
            the people around your sport, organize participation and keep a
            sporting journey visible.
          </p>
          <p>
            We start with the needs of grassroots sport: the player looking for
            a chance, the team preparing for a tournament, and the organizer
            making the day possible.
          </p>
          <TextLink href="/platform/">Get to know the platform</TextLink>
        </div>
      </div>
    </section>
  );
}
function Capability({ index }: { index: number }) {
  const c = capabilities[index];
  return (
    <article className="capability" id={c.id}>
      <div className="capability-label">
        <span>{c.number}</span>
        <span>{c.name}</span>
      </div>
      <h3>{c.title}</h3>
      <p>{c.text}</p>
      <p className="capability-detail">{c.detail}</p>
    </article>
  );
}
export function Capabilities() {
  return (
    <section className="section platform-section" id="platform">
      <span id="what-we-do" aria-hidden="true" />
      <div className="container">
        <div className="section-top">
          <Eyebrow>03 / INSIDE THE PLATFORM</Eyebrow>
          <span className="section-side">
            FROM SPORTING IDENTITY TO MATCH DAY
          </span>
        </div>
        <div className="platform-heading">
          <h2>
            A place for your sport.
            <br />
            Tools for your journey.
          </h2>
          <p>
            The capabilities below are implemented in the app. Public rollout,
            supported regions and release availability are still to be
            confirmed.
          </p>
        </div>
        <div className="identity-features">
          <Capability index={0} />
          <Capability index={1} />
        </div>
        <div className="discovery-feature">
          <figure>
            <Image
              src="/images/community-basketball.jpg"
              alt="Women playing basketball together on a court"
              width={1100}
              height={850}
              sizes="(max-width: 700px) 100vw, 50vw"
              className="cover"
            />
            <figcaption>
              Every sporting journey starts with participation.
            </figcaption>
          </figure>
          <Capability index={2} />
        </div>
        <div className="matchday-feature">
          <div>
            <Eyebrow>BRING THE MATCH DAY TOGETHER</Eyebrow>
            <Capability index={3} />
            <Capability index={4} />
          </div>
          <figure className="app-showcase">
            <div className="showcase-heading">
              <div className="screenshot-label">
                <span>PLAYTOWN / ATHLETE IDENTITY</span>
                <span className="preview-tag">DESIGN PREVIEW</span>
              </div>
              <h3>
                Your game.
                <br />
                Your sporting identity.
              </h3>
              <p>Your story, achievements and recognition.</p>
            </div>
            <div className="showcase-stage">
              <div className="showcase-device">
                <ProductOverview />
              </div>
            </div>
            <div className="showcase-bottom">
              <span>IDENTITY. ACHIEVEMENTS. RECOGNITION.</span>
              <Link href="/platform/#identity">
                Explore the platform{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <figcaption>
              Illustrative PlayTown product overview. This screen is a design
              concept, not a live account.
            </figcaption>
          </figure>
        </div>
        <div className="recognition-features">
          <Capability index={5} />
          <Capability index={6} />
        </div>
        <div className="scope-note">
          <strong>Building with clear expectations.</strong>
          <p>
            Dedicated club profiles and club rankings are not available yet.
            Permanent team identities across tournaments and broader
            sport-specific scoring belong to our future direction. Photo posting
            still needs end-to-end release verification.
          </p>
        </div>
      </div>
    </section>
  );
}
export function WhoWeEmpower() {
  return (
    <section className="section audience-section" id="community">
      <div className="container">
        <div className="section-top">
          <Eyebrow>04 / ONE SPORTING COMMUNITY</Eyebrow>
          <span className="section-side">EVERY ROLE MATTERS</span>
        </div>
        <div className="audience-heading">
          <h2>
            You don’t have to
            <br />
            play the same role
            <br />
            to share the game.
          </h2>
          <p>
            Sport works because different people show up. PlayTown connects
            those contributions around athletes, tournaments and the communities
            behind them.
          </p>
        </div>
        <div className="audience-list">
          {audiences.map(([name, text], i) => (
            <article
              key={name}
              id={
                name === "Athletes"
                  ? "athletes"
                  : name === "Organizers"
                    ? "organizers"
                    : undefined
              }
            >
              <span>0{i + 1}</span>
              <h3>{name}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function CommunityImpact() {
  return (
    <section className="impact-section" id="impact">
      <figure className="impact-photo">
        <Image
          src="/images/community-cricket.jpg"
          alt="A young player practising cricket on a local ground in Pune"
          fill
          sizes="(max-width: 700px) 100vw, 50vw"
          className="cover"
        />
      </figure>
      <div className="impact-copy">
        <Eyebrow>05 / WHAT WE WANT TO MAKE POSSIBLE</Eyebrow>
        <h2>
          More visibility.
          <br />
          More participation.
          <br />
          <span>More belonging.</span>
        </h2>
        <p>
          The ambition is to give local sporting journeys a place to be seen. To
          make the next opportunity easier to find. To keep athletes, organizers
          and supporters connected.
        </p>
        <p>
          These are the outcomes we’re working towards. We’ll judge progress by
          what becomes more useful for the people taking part.
        </p>
        <span className="image-note">
          Sporting photography illustrates community participation.
        </span>
      </div>
    </section>
  );
}
export function Vision() {
  return (
    <section className="section container vision-section" id="vision">
      <span id="growth" aria-hidden="true" />
      <Eyebrow>06 / A LONGER VIEW</Eyebrow>
      <h2>
        From your local ground.
        <br />
        <span className="muted-heading">
          To a connected sporting ecosystem.
        </span>
      </h2>
      <div className="vision-bottom">
        <p className="lead">
          Start with the game.
          <br />
          Grow with the community.
        </p>
        <div>
          <p>
            Our long-term vision is a connected multi-sport ecosystem where
            participation, identity and recognition can reinforce one another,
            from grassroots competitions to wider sporting opportunities.
          </p>
          <p>
            That means earning trust through useful tools, clear records and
            respect for people’s sharing choices. Today’s scoring focus is
            volleyball. More sport-specific workflows, stronger club connections
            and wider access are a direction to build towards, not a promise of
            features already available.
          </p>
        </div>
      </div>
    </section>
  );
}
export function ContactSection() {
  return (
    <section className="availability-section section" id="contact">
      <span id="partners" aria-hidden="true" />
      <div className="container">
        <div className="section-top">
          <Eyebrow>07 / BE PART OF WHAT’S NEXT</Eyebrow>
          <span className="section-side">PLAYTOWN IS PREPARING FOR LAUNCH</span>
        </div>
        <div className="availability-layout">
          <div>
            <h2>
              Your community.
              <br />
              Our next conversation.
            </h2>
            <p className="lead">
              Play, organize, support, or simply ask a question. We’d like to
              hear what your sporting community needs.
            </p>
            <a
              className="contact-email"
              href={`mailto:${contact.email}?subject=PlayTown%20enquiry`}
            >
              {contact.email}
              <ArrowUpRight size={24} aria-hidden="true" />
            </a>
            <TextLink href="/contact/">Explore enquiry options</TextLink>
          </div>
          <div className="download-section">
            <h3>The app is on its way.</h3>
            <p>
              A public release date has not been announced. Ask about
              availability or using PlayTown for your next tournament.
            </p>
            <div className="download-options">
              {playtownDownloads.android ? (
                <a
                  className="button button-primary"
                  href={playtownDownloads.android}
                >
                  Get it on Google Play{" "}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              ) : (
                <div>
                  <strong>Android</strong>
                  <span>Availability to be announced</span>
                </div>
              )}
              {playtownDownloads.ios ? (
                <a
                  className="button button-primary"
                  href={playtownDownloads.ios}
                >
                  Download on the App Store{" "}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              ) : (
                <div>
                  <strong>iOS</strong>
                  <span>Availability to be announced</span>
                </div>
              )}
            </div>
            <a
              className="text-link"
              href={`mailto:${contact.email}?subject=PlayTown%20availability%20enquiry`}
            >
              Ask about availability <ArrowRight size={18} aria-hidden="true" />
            </a>
            <p className="small-note">
              Email opens in your mail app. Asking about availability does not
              automatically subscribe you to a mailing list.
            </p>
          </div>
        </div>
        {contact.inquiriesEnabled && (
          <div className="contact-form-wrap">
            <h3>Send an enquiry</h3>
            <RequestForm enabled />
          </div>
        )}
      </div>
    </section>
  );
}
export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-hero container">
      <Link className="back-link" href="/">
        ← PlayTown
      </Link>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      <p className="lead">{description}</p>
    </section>
  );
}
