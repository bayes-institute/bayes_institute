import Image from "next/image";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100svh",
        gap: "2.5rem",
        padding: "2rem",
      }}
    >
      <Image
        src="/assets/logos/logo-primary.svg"
        alt="Bayes Institute"
        width={648}
        height={272}
        priority
        style={{ width: "min(18rem, 70vw)", height: "auto" }}
      />

      <h1
        style={{
          margin: 0,
          fontFamily: "var(--font-newsreader), Georgia, serif",
          fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
          fontWeight: 400,
          letterSpacing: "-0.03em",
          color: "var(--ink)",
          textAlign: "center",
        }}
      >
        Something new is coming.
      </h1>

      <p
        style={{
          margin: 0,
          maxWidth: "32rem",
          color: "var(--muted)",
          fontSize: "1rem",
          lineHeight: 1.6,
          textAlign: "center",
        }}
      >
        The Bayes Institute is being rebuilt from the ground up.
      </p>
    </div>
  );
}
