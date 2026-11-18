import {
  ArrowUpRight,
  Award,
  ChartNoAxesColumnIncreasing,
  Shield,
  Trophy,
  UserRound,
} from "lucide-react";

/** An illustrative product composition, with no invented athlete or ranking data. */
export function SportIdentityVisual() {
  return (
    <figure
      className="identity-hero-visual"
      aria-label="PlayTown product concept connecting an athlete’s sporting identity and Sports Passport to recognition through eligible achievements and rankings"
    >
      <div className="identity-visual-top">
        <span>PLAYTOWN / THE ATHLETE EXPERIENCE</span>
        <ArrowUpRight size={20} aria-hidden="true" />
      </div>
      <div className="identity-profile-panel">
        <div className="identity-profile-top">
          <span className="identity-avatar">
            <UserRound size={38} strokeWidth={1.3} aria-hidden="true" />
          </span>
          <span className="identity-profile-label">
            YOUR SPORT.
            <br />
            YOUR STORY.
          </span>
        </div>
        <strong className="identity-profile-title">
          More than a player.
          <br />
          <span>A sporting identity.</span>
        </strong>
        <div className="identity-profile-fields">
          <span>Sport</span>
          <span>Position</span>
          <span>Community</span>
        </div>
        <div className="identity-passport">
          <Shield size={25} aria-hidden="true" />
          <div>
            <strong>Sports Passport</strong>
            <span>Your playing history. Your achievements.</span>
          </div>
          <ArrowUpRight size={18} aria-hidden="true" />
        </div>
      </div>
      <div className="identity-ranking-panel">
        <div className="identity-ranking-heading">
          <span>
            <ChartNoAxesColumnIncreasing size={19} aria-hidden="true" />{" "}
            Recognition with context
          </span>
          <span>RANKINGS</span>
        </div>
        <div className="identity-podium" aria-hidden="true">
          <div className="podium-side">
            <Award size={24} />
            <span>Best attacker</span>
          </div>
          <div className="podium-center">
            <Trophy size={32} />
            <span>MVP</span>
          </div>
          <div className="podium-side">
            <Award size={24} />
            <span>Best blocker</span>
          </div>
        </div>
        <p>Eligible awards. Clear ranking rules.</p>
      </div>
      <figcaption>
        ILLUSTRATIVE PRODUCT CONCEPT · NO LIVE ATHLETE DATA
      </figcaption>
    </figure>
  );
}
export function CompactSportIdentity() {
  return (
    <div className="overview-sport-identity">
      <div className="compact-passport-top">
        <span>SPORTS PASSPORT</span>
        <Shield size={15} />
      </div>
      <div className="compact-athlete">
        <span>
          <UserRound size={27} strokeWidth={1.5} />
        </span>
        <div>
          <strong>Your athlete profile</strong>
          <small>Sport · Position · Background</small>
        </div>
      </div>
      <div className="compact-passport-bottom">
        <Award size={16} />
        <span>A place for your achievements.</span>
      </div>
    </div>
  );
}
export function CompactRankings() {
  return (
    <div className="overview-ranking-concept">
      <div>
        <ChartNoAxesColumnIncreasing size={18} />
        <strong>Recognition with context</strong>
      </div>
      <div className="compact-ranking-row">
        <Trophy size={15} />
        <span>Athlete rankings</span>
        <small>Eligible awards</small>
      </div>
      <div className="compact-ranking-row">
        <Shield size={15} />
        <span>Team standings</span>
        <small>Match results</small>
      </div>
    </div>
  );
}
