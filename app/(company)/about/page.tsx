import { CompanyPage } from "@/components/company-page";
import { companyMetadata } from "@/lib/company-pages";
export const generateMetadata = () => companyMetadata("about");
export default function Page() {
  return <CompanyPage slug="about" />;
}
