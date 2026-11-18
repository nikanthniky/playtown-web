import { CompanyPage } from "@/components/company-page";
import { companyMetadata } from "@/lib/company-pages";
export const metadata = companyMetadata("what-we-do");
export default function Page() {
  return <CompanyPage slug="what-we-do" />;
}
