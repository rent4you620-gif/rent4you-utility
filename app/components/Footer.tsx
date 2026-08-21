type CompanyInfo = {
  name: string;
  phone: string;
  email: string;
  serviceArea: string;
};

export function Footer({ companyInfo }: { companyInfo: CompanyInfo }) {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <span className="footer-word">
            Rent4You <span>Utility</span>
          </span>
          <ul className="footer-links">
            <li>
              <a href="#catalog">Browse</a>
            </li>
            <li>
              <a href="#how">How it works</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className="footer-bottom">
          <span>
            © {year} {companyInfo.name}. All rights reserved.
          </span>
          <span>
            {companyInfo.email} · {companyInfo.phone}
          </span>
        </div>
      </div>
    </footer>
  );
}
