interface CompanyInfo {
  name: string;
  phone: string;
  email: string;
  serviceArea: string;
}

interface FooterProps {
  companyInfo: CompanyInfo;
}

export function Footer({ companyInfo }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-content">
          <div className="footer-section">
            <h4>{companyInfo.name}</h4>
            <p>Flexible rental options for everyday essentials.</p>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={`tel:${companyInfo.phone}`}>{companyInfo.phone}</a>
              </li>
              <li>
                <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
              </li>
              <li>{companyInfo.serviceArea}</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#catalog">Browse Items</a>
              </li>
              <li>
                <a href="#rto">Rent-to-Own</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#service-area">Service Area</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Business Info</h4>
            <ul>
              <li>Local service for Southwest Kansas</li>
              <li>Same-day response available</li>
              <li>Flexible rental and ownership plans</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} {companyInfo.name}. All rights reserved.</p>
          <div className="footer-legal">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="https://rent4you.online" target="_blank" rel="noopener noreferrer">
              Rent4You Online
            </a>
            <a href="#faq">FAQ</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: var(--brand-dark);
          color: white;
          padding: 3rem 0 1.5rem 0;
          margin-top: 4rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-section h4 {
          margin: 0 0 1rem 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .footer-section p {
          margin: 0;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
        }

        .footer-section ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .footer-section li {
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .footer-section a {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-section a:hover {
          color: white;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }

        .footer-bottom p {
          margin: 0;
        }

        .footer-legal {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 14px;
        }

        .footer-legal a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
        }

        .footer-legal a:hover {
          color: white;
        }

        @media (max-width: 768px) {
          .footer {
            padding: 2rem 0 1rem 0;
          }

          .footer-content {
            gap: 1.5rem;
            margin-bottom: 1.5rem;
            padding-bottom: 1.5rem;
          }
        }
      `}</style>
    </footer>
  );
}
