import { Logo } from './Logo';

type CompanyInfo = {
  name: string;
  phone: string;
  email: string;
  serviceArea: string;
};

export function Footer({ companyInfo }: { companyInfo: CompanyInfo }) {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <div>
              <div className="footer-word">Rent4You <span>Utility</span></div>
              <span>Flexible essentials. Practical terms.</span>
            </div>
          </div>
          <ul className="footer-links">
            <li><a href="#catalog">Browse</a></li><li><a href="#rto">Rent-to-own</a></li><li><a href="#how">How it works</a></li><li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {companyInfo.name}</span>
          <span>{companyInfo.serviceArea} · {companyInfo.email}{companyInfo.phone ? ` · ${companyInfo.phone}` : ''}</span>
        </div>
      </div>
    </footer>
  );
}
