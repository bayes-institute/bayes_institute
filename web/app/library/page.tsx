import type { Metadata } from "next";
import { RoutePage } from "../../components/route-page";

export const metadata: Metadata = {
  title: "Library",
  description: "Browse the Bayes Institute library.",
};

export default function LibraryPage() {
  return (
    <RoutePage
      eyebrow="Reading room"
      title="Library"
      intro="A curated archive of readings, tools, talks, and references for applicants, fellows, and the wider Bayes community."
      note="The library route will organize resources by theme, difficulty, and use case, with gated downloads where account access is required."
      supportingPoints={[
        "Reading lists",
        "Applicant resources",
        "Downloadable material",
        "Talks and references",
      ]}
    />
  );
}
