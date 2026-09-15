'use client';

export default function TermsOfServicePage() {
  return (
    <main className="legal-page">
      <div className="wrap">
        <p className="eyebrow">Terms of Service</p>
        <h1>Terms of Service</h1>
        <p>
          By requesting a rental or rent-to-own plan through Rent4You Utility, you agree to provide accurate information
          and to communicate promptly regarding availability, delivery, and payment arrangements.
        </p>
        <p>
          Rental terms, approval outcomes, and delivery timing are subject to item availability, credit review, and
          service area eligibility. We reserve the right to decline any application or request that does not meet our
          operating requirements.
        </p>
        <p>
          Rent-to-own and rental agreements are governed by the specific terms provided during approval. Customers are
          responsible for maintaining items in good condition and for any fees associated with damage, late return, or
          noncompliance with agreed terms.
        </p>
        <p>
          We may update these terms as needed. Continued use of our services after changes are made constitutes your
          acceptance of the updated terms.
        </p>
      </div>

      <style jsx>{`
        .legal-page {
          padding: 80px 0 100px;
          background: var(--bg);
          color: var(--ink);
        }
        .legal-page h1 {
          font-family: var(--display);
          text-transform: uppercase;
          font-size: clamp(2rem, 4vw, 3rem);
          margin: 0 0 20px;
          color: var(--brand-dark);
        }
        .legal-page p {
          max-width: 760px;
          color: var(--ink-soft);
          margin-bottom: 18px;
          line-height: 1.7;
        }
        .eyebrow {
          font-family: var(--mono);
          font-size: 0.78rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--brand-gold);
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
        }
        .eyebrow::before {
          content: "";
          width: 22px;
          height: 1px;
          background: var(--brand-gold);
        }
      `}</style>
    </main>
  );
}
