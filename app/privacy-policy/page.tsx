import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "CalcNow privacy policy. Learn how we handle your data — spoiler: we don't collect any.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-muted-foreground mt-2">
          Last updated: March 2026
        </p>
      </div>

      <section className="space-y-6 text-sm leading-relaxed text-muted-foreground">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">Overview</h2>
          <p>
            CalcNow (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates
            the website{" "}
            <span className="text-foreground">https://www.calcnow.cc</span>.
            Your privacy is important to us. This policy explains what
            information we collect and how we use it.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">
            No Data Collection
          </h2>
          <p>
            All calculations on CalcNow are performed entirely in your browser.
            We do not collect, store, process, or transmit any data you enter
            into our calculators. Your inputs never leave your device.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">
            No File Uploads
          </h2>
          <p>
            CalcNow does not accept or process file uploads. Everything runs
            client-side using JavaScript in your browser.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">
            Google Analytics
          </h2>
          <p>
            We use Google Analytics to understand how visitors use our site.
            Google Analytics collects anonymous usage data such as pages visited,
            time on site, and general location (country/city level). This data
            helps us improve our calculators and user experience.
          </p>
          <p>
            Google Analytics uses cookies to track interactions. You can opt out
            by installing the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">
            Google AdSense
          </h2>
          <p>
            We use Google AdSense to display advertisements. AdSense may use
            cookies and web beacons to serve ads based on your prior visits to
            our site or other websites. Google&apos;s use of advertising cookies
            enables it and its partners to serve ads based on your browsing
            history.
          </p>
          <p>
            You can opt out of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              Google Ads Settings
            </a>
            .
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">
            Third-Party Cookies
          </h2>
          <p>
            Third-party vendors, including Google, use cookies to serve ads
            based on your browsing activity. These cookies allow third-party
            vendors to serve ads to you based on your visits to CalcNow and
            other sites on the internet. You may opt out of third-party cookies
            by visiting the{" "}
            <a
              href="https://optout.networkadvertising.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              Network Advertising Initiative opt-out page
            </a>
            .
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">
            Changes to This Policy
          </h2>
          <p>
            We may update this privacy policy from time to time. Any changes
            will be posted on this page with an updated revision date.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">Contact</h2>
          <p>
            If you have any questions about this privacy policy, please contact
            us at{" "}
            <a
              href="mailto:contact@calcnow.cc"
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              contact@calcnow.cc
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
