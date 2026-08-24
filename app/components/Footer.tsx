interface CompanyInfo {
  name: string;
  phone: string;
  email: string;
  serviceArea: string;
}

const LINKS = [
  { href: '#catalog', label: 'Browse' },
  { href: '#rto', label: 'Rent-to-Own' },
  { href: '#how', label: 'How it works' },
  { href: '#contact', label: 'Contact' },
];

export function Footer({ companyInfo }: { companyInfo: CompanyInfo }) {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div>
            <p className="footer-word">
              Rent4You <span>Utility</span>
            </p>
            <p>Serving the {companyInfo.serviceArea}.</p>
          </div>
          <ul className="footer-links">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
            <li>
              <a href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`}>{companyInfo.phone}</a>
            </li>
            <li>
              <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
            </li>
          </ul>
        </div>
        <div className="footer-bottom">
          <span>
            © {year} {companyInfo.name}
          </span>
          <span>Rent-to-own agreements are not credit sales until the final payment is made.</span>
        </div>
      </div>
    </footer>
  );
}
