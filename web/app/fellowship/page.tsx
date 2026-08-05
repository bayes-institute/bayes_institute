import type { Metadata } from "next";
import { FellowshipDetailPage } from "../../components/fellowship-page";

export const metadata: Metadata = {
  title: "Bayes Founder Fellowship",
  description: "Explore the Bayes Founder Fellowship.",
};

export default function FellowshipPage() {
  return <FellowshipDetailPage />;
}
