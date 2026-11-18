import { CompanyPage } from "@/components/company-page";
import { companyMetadata } from "@/lib/company-pages";
export const metadata = companyMetadata("sports");
export default function Page() {
  return <CompanyPage slug="sports" />;
}
