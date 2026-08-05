import type { Metadata } from "next";
import { RoutePage } from "../../components/route-page";

export const metadata: Metadata = {
  title: "Fellowship",
  description: "Explore the Bayes Institute fellowship.",
};

export default function FellowshipPage() {
  return (
    <RoutePage
      eyebrow="Cohort 1 Fellowship"
      title="Fellowship"
      intro="A serious program for people building from first principles, testing ideas in public, and preparing for ambitious work."
      note="The fellowship route will hold the program structure, selection process, timeline, tuition or aid details, and application flow."
      supportingPoints={[
        "Program overview",
        "Curriculum and format",
        "Admissions timeline",
        "Application requirements",
      ]}
    />
  );
}
