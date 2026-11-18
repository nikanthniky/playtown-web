import { CompanyPage } from "@/components/company-page";
import { companyMetadata } from "@/lib/company-pages";
export const generateMetadata = () => companyMetadata("platform");
export default function Page() {
  return <CompanyPage slug="platform" />;
}
