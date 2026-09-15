'use client';

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page">
      <div className="wrap">
        <p className="eyebrow">Privacy Policy</p>
        <h1>Privacy Policy</h1>
        <p>
          Rent4You Utility values your privacy. We collect information you provide through our rental inquiry or
          application forms so we can respond to your request, confirm availability, and process rental or rent-to-own
          approvals.
        </p>
        <p>
          We may collect your name, phone number, email address, rental interest, and address details as needed to
          provide service. This information is used only for business communication, eligibility review, and customer
          support.
        </p>
        <p>
          We do not sell personal information. We may share information with trusted service providers involved in
          payment processing, financing review, or email delivery, only as necessary to fulfill your request.
        </p>
        <p>
          You may contact us at any time to request a correction or discuss how your information is being used.
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
