import { CompanyPage } from "@/components/company-page";
import { companyMetadata } from "@/lib/company-pages";
export const metadata = companyMetadata("our-vision");
export default function Page() {
  return <CompanyPage slug="our-vision" />;
}
