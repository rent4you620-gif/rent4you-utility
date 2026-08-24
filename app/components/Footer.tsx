type CompanyInfo = {
  name: string;
  phone: string;
  email: string;
  serviceArea: string;
};

const LINKS = [
  { href: '#catalog', label: 'Browse' },
  { href: '#rto', label: 'Rent-to-Own' },
  { href: '#how', label: 'How it works' },
  { href: '#contact', label: 'Contact' },
];

export function Footer({ companyInfo }: { companyInfo: CompanyInfo }) {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div>
            <p className="footer-word">
              Rent4You <span>Utility</span>
            </p>
            <p style={{ margin: '6px 0 0', fontSize: '0.88rem' }}>
              Serving {companyInfo.serviceArea}
            </p>
          </div>
          <ul className="footer-links">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
            <li>
              <a href={`tel:${companyInfo.phone.replace(/[^\d+]/g, '')}`}>{companyInfo.phone}</a>
            </li>
            <li>
              <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
            </li>
          </ul>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {companyInfo.name}
          </span>
          <span>Rentals subject to availability and approval.</span>
        </div>
      </div>
    </footer>
  );
}
