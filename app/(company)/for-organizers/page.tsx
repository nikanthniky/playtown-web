import { CompanyPage } from "@/components/company-page";
import { companyMetadata } from "@/lib/company-pages";
export const metadata = companyMetadata("for-organizers");
export default function Page() {
  return <CompanyPage slug="for-organizers" />;
}
