'use client';

import { Logo } from './components/Logo';
import { DialCard } from './components/DialCard';
import { CatalogGrid } from './components/CatalogGrid';
import { RTOGrid } from './components/RTOGrid';
import { Steps } from './components/Steps';
import { ContactForm } from './components/ContactForm';
import { RTOModal } from './components/RTOModal';
import { Footer } from './components/Footer';

const COMPANY_INFO = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Rent4You Utility',
  phone: process.env.NEXT_PUBLIC_PHONE || '',
  email: process.env.NEXT_PUBLIC_EMAIL || 'hello@rent4youutility.com',
  serviceArea: process.env.NEXT_PUBLIC_SERVICE_AREA || 'Kansas City metro',
};

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <Catalog />
      <RTO />
      <HowItWorks />
      <Contact />
      <RTOModal />
      <Footer companyInfo={COMPANY_INFO} />
    </>
  );
}

function Nav() {
  return (
    <nav className="nav">
      <div className="wrap">
        <a href="#top" className="nav-logo">
          <Logo />
          <span className="word">
            Rent4You <span>Utility</span>
          </span>
        </a>
        <ul className="nav-links">
          <li><a href="#catalog">Browse</a></li>
          <li><a href="#rto">Rent-to-Own</a></li>
          <li><a href="#how">How it works</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" className="nav-cta">Request a rental</a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wrap">
        <div className="hero-copy">
          <p className="eyebrow">Day · Month-to-Month · Rent-to-Own</p>
          <h1>
            Rent what you need.<br />
            <em>Own it if you want to.</em>
          </h1>
          <p className="lead">
            Rent4You Utility connects you with everyday essentials — starting with washers & dryers — on flexible terms.
            No warehouse, no long contracts, no pressure to buy until you're ready.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">Request a rental</a>
            <a href="#catalog" className="btn btn-ghost">See what's available</a>
          </div>
        </div>
        <DialCard />
      </div>
    </header>
  );
}

function Catalog() {
  return (
    <section id="catalog">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Available now</p>
          <h2>Washers & dryers, ready to deliver</h2>
          <p>Our current live inventory — the rest of the catalog is expanding below.</p>
        </div>
        <CatalogGrid />
      </div>
    </section>
  );
}

function RTO() {
  return (
    <section className="alt" id="rto">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Rent-to-own</p>
          <h2>Pick it out. Get approved. We order it.</h2>
          <p>
            Smaller items are approved directly by us with a quick soft credit check. Bigger-ticket items route through
            a lease-to-own financing partner who fronts the cost and takes on the payment risk — either way, nothing
            ships until you're approved.
          </p>
        </div>
        <RTOGrid />
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">How it works</p>
          <h2>Four steps, no inventory in sight</h2>
          <p>
            Because we don't hold stock ourselves, every rental runs through the same simple process — approval just
            splits two ways depending on the item.
          </p>
        </div>
        <Steps />
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ background: 'var(--brand-dark)', padding: '80px 0' }}>
      <div className="wrap">
        <div className="form-grid">
          <div className="form-side">
            <p className="eyebrow">Get in touch</p>
            <h2>Ready to rent?</h2>
            <p>Fill out the form and we'll follow up with pricing and availability for your term. Prefer to talk it through first?</p>
            {COMPANY_INFO.phone && (
              <p className="contact-line">
                <b>Call/Text:</b> {COMPANY_INFO.phone}
              </p>
            )}
            <p className="contact-line">
              <b>Email:</b> {COMPANY_INFO.email}
            </p>
            <p className="contact-line">
              <b>Serving:</b> {COMPANY_INFO.serviceArea}
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
