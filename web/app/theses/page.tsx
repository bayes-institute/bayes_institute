import type { Metadata } from "next";
import { RoutePage } from "../../components/route-page";

export const metadata: Metadata = {
  title: "Theses",
  description: "Read the core theses behind the Bayes Institute.",
};

export default function ThesesPage() {
  return (
    <RoutePage
      eyebrow="Research direction"
      title="Theses"
      intro="The institute's working arguments, open questions, and intellectual commitments collected as navigable essays."
      note="The theses route will become the place for long-form positions, research notes, and the ideas that shape the fellowship."
      supportingPoints={[
        "Core beliefs",
        "Research memos",
        "Open questions",
        "Founder-facing essays",
      ]}
    />
  );
}
