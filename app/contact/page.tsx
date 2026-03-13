import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with CalcNow. Questions, feedback, or suggestions — we'd love to hear from you.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
        <p className="text-muted-foreground mt-2">
          Have a question, suggestion, or found a bug? We&apos;d love to hear
          from you.
        </p>
      </div>

      <section className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          The best way to reach us is by email. We typically respond within 1-2
          business days.
        </p>

        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-foreground font-medium">Email</p>
          <a
            href="mailto:contact@calcnow.cc"
            className="text-primary underline underline-offset-4 hover:text-primary/80 text-base"
          >
            contact@calcnow.cc
          </a>
        </div>

        <p>
          Whether it&apos;s a feature request, a calculator idea, or general
          feedback, feel free to drop us a line.
        </p>
      </section>
    </div>
  );
}
