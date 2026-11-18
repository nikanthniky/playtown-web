import { CompanyPage } from "@/components/company-page";
import { companyMetadata } from "@/lib/company-pages";
export const generateMetadata = () => companyMetadata("contact");
export default function Page() {
  return <CompanyPage slug="contact" />;
}
