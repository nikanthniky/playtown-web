import Link from "next/link";
import { Brand } from "./brand";
import { contact } from "@/lib/site";
export function SocialLinks() {
  return (
    <div className="social-links">
      {contact.instagram && <a href={contact.instagram}>Instagram ↗</a>}
      {contact.linkedin && <a href={contact.linkedin}>LinkedIn ↗</a>}
    </div>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <Brand />
          <p>
            Your game. Your people.
            <br />
            Your sporting community.
          </p>
        </div>
        <nav aria-label="Explore PlayTown">
          <Link href="/about/">Our story</Link>
          <Link href="/platform/">The platform</Link>
          <Link href="/for-athletes/">For athletes</Link>
          <Link href="/for-organizers/">For organizers</Link>
          <Link href="/contact/">Contact</Link>
        </nav>
        <div className="parent-company">
          <span className="eyebrow">THE PEOPLE BEHIND THE PRODUCT</span>
          <p>
            PlayTown is developed by <strong>NISIMIN</strong>, a technology
            product company.
          </p>
          <SocialLinks />
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 PlayTown. A product by NISIMIN.</span>
        <div>
          <Link href="/privacy/">Privacy notice</Link>
          <Link href="/terms/">Website terms</Link>
          <a href="#main">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
