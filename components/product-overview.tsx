import Image from "next/image";
import { CompactSportIdentity, CompactRankings } from "./sport-identity-visual";
import {
  Bell,
  ChartNoAxesColumnIncreasing,
  Compass,
  House,
  Plus,
  Signal,
  Trophy,
  UserRound,
  Users,
  Wifi,
  BatteryFull,
} from "lucide-react";

/** Editorial product concept using verified capability groups, not customer data. */
export function ProductOverview() {
  return (
    <div
      className="product-overview"
      role="img"
      aria-label="Illustrative PlayTown screen showing an athlete identity, Sports Passport, achievements and award-based rankings. This is a design concept, not a live account."
    >
      <div className="overview-status" aria-hidden="true">
        <span>9:41</span>
        <div>
          <Signal size={11} />
          <Wifi size={11} />
          <BatteryFull size={15} />
        </div>
      </div>
      <div className="overview-brandbar" aria-hidden="true">
        <Image
          src="/brand/playtown-logo-white.png"
          alt=""
          width={1075}
          height={730}
          sizes="60px"
        />
        <div>
          <Bell size={16} />
          <span className="overview-avatar">
            <UserRound size={15} />
          </span>
        </div>
      </div>
      <div className="overview-intro">
        <span>YOUR SPORTING JOURNEY</span>
        <strong>
          Your game.
          <br />
          Your identity.
        </strong>
      </div>
      <CompactSportIdentity />
      <div className="overview-shortcuts" aria-hidden="true">
        <div>
          <Users size={19} />
          <span>Athletes</span>
        </div>
        <div>
          <Trophy size={19} />
          <span>Tournaments</span>
        </div>
        <div>
          <ChartNoAxesColumnIncreasing size={19} />
          <span>Rankings</span>
        </div>
      </div>
      <CompactRankings />
      <div className="overview-tabs" aria-hidden="true">
        <span className="selected">
          <House size={16} />
          Home
        </span>
        <span>
          <Compass size={16} />
          Discover
        </span>
        <span className="overview-create">
          <Plus size={23} />
        </span>
        <span>
          <ChartNoAxesColumnIncreasing size={16} />
          Rankings
        </span>
        <span>
          <UserRound size={16} />
          Profile
        </span>
      </div>
      <div className="overview-home-indicator" aria-hidden="true" />
    </div>
  );
}
