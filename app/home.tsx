'use client';

import { useState } from 'react';
import { Logo } from './components/Logo';
import { DialCard } from './components/DialCard';
import { CatalogGrid } from './components/CatalogGrid';
import { RTOGrid } from './components/RTOGrid';
import { Steps } from './components/Steps';
import ContactForm from './components/ContactForm';
import RTOModal from './components/RTOModal';
import { Footer } from './components/Footer';

const COMPANY_INFO = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Rent4You Utility',
  phone: process.env.NEXT_PUBLIC_PHONE || '(620) 390-9840',
  email: process.env.NEXT_PUBLIC_EMAIL || 'hello@rent4youutility.com',
  serviceArea: process.env.NEXT_PUBLIC_SERVICE_AREA || 'Dodge City',
};

export default function HomePage() {
  const [requestedItems, setRequestedItems] = useState<string[]>([]);
  const [rtoModal, setRtoModal] = useState<{
    isOpen: boolean;
    item: string;
    tier: string;
    price: number;
  }>({
    isOpen: false,
    item: '',
    tier: '',
    price: 0,
  });

  const openRtoModal = (item: string, tier: string, price: number) => {
    setRtoModal({ isOpen: true, item, tier, price });
  };

  const closeRtoModal = () => {
    setRtoModal({ isOpen: false, item: '', tier: '', price: 0 });
  };

  const addToRequest = (item: string) => {
    setRequestedItems((currentItems) =>
      currentItems.includes(item) ? currentItems : [...currentItems, item]
    );
  };

  const removeFromRequest = (item: string) => {
    setRequestedItems((currentItems) => currentItems.filter((currentItem) => currentItem !== item));
  };

  const clearRequest = () => {
    setRequestedItems([]);
  };

  return (
    <>
      <Nav />
      <Hero />
      <Catalog requestedItems={requestedItems} onAddToRequest={addToRequest} />
      <RTO onOpenModal={openRtoModal} />
      <HowItWorks />
      <WhyUs />
      <Faq />
      <ServiceArea />
      <Contact requestedItems={requestedItems} onRemoveItem={removeFromRequest} onClearRequest={clearRequest} />
      <RTOModal
        isOpen={rtoModal.isOpen}
        onClose={closeRtoModal}
        item={rtoModal.item}
        tier={rtoModal.tier}
        price={rtoModal.price}
      />
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
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#service-area">Service Area</a></li>
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

function Catalog({ requestedItems, onAddToRequest }: {
  requestedItems: string[];
  onAddToRequest: (item: string) => void;
}) {
  return (
    <section id="catalog">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Available now</p>
          <h2>Washers & dryers, ready to deliver</h2>
          <p>Our current live inventory — the rest of the catalog is expanding below.</p>
        </div>
        <CatalogGrid requestedItems={requestedItems} onAddToRequest={onAddToRequest} />
      </div>
    </section>
  );
}

function RTO({ onOpenModal }: { onOpenModal: (item: string, tier: string, price: number) => void }) {
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
        <RTOGrid onOpenModal={onOpenModal} />
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

function WhyUs() {
  const benefits = [
    {
      title: 'Flexible terms',
      text: 'Day rentals, month-to-month plans, and rent-to-own options designed around your needs and budget.',
    },
    {
      title: 'Fast approvals',
      text: 'Our team works quickly so you can get essential household items without a long wait or paperwork maze.',
    },
    {
      title: 'Local service',
      text: 'We serve Dodge City and nearby communities with friendly support from a business that knows the area.',
    },
    {
      title: 'No pressure',
      text: 'Rent first, then decide whether ownership makes sense. There is no rush to buy before you are ready.',
    },
  ];

  return (
    <section className="alt">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Why rent with us</p>
          <h2>Built for real life, not warehouse hassle</h2>
          <p>
            We keep the process simple, local, and flexible so you can get the essentials you need without tying
            up a large amount of cash.
          </p>
        </div>

        <div className="benefit-grid">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="benefit-card">
              <span className="benefit-tag">Included</span>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </div>
          ))}
        </div>

        <div className="review-strip">
          <div className="review-score">
            <strong>4.9/5</strong>
            <span>Customer satisfaction</span>
          </div>
          <div className="review-quote">
            “The process was easy, the pickup was quick, and the monthly plan fit our budget perfectly.”
          </div>
          <div className="review-quote">
            “Helpful team, straightforward terms, and no pressure to commit to ownership before we were ready.”
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const faqs = [
    {
      q: 'How quickly can I get an item?',
      a: 'Most requests are reviewed the same day, and many smaller items can be approved and delivered quickly depending on inventory and service area.',
    },
    {
      q: 'Do you offer month-to-month rentals?',
      a: 'Yes. We offer flexible day, month-to-month, and rent-to-own arrangements so you can choose the option that fits your budget and timeline.',
    },
    {
      q: 'What happens if I want to own the item later?',
      a: 'If you choose a rent-to-own option, the payment structure is designed to move you toward ownership while keeping your upfront cost manageable.',
    },
    {
      q: 'Do you deliver outside Dodge City?',
      a: 'We primarily serve Dodge City and nearby communities. Reach out with your location and item request so we can confirm availability and delivery options.',
    },
  ];

  return (
    <section id="faq">
      <div className="wrap faq-wrap">
        <div className="section-head">
          <p className="eyebrow">FAQ</p>
          <h2>Questions we hear most often</h2>
        </div>

        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.q} className="faq-item" open>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceArea() {
  const locations = ['Dodge City', 'Cimarron', 'Bucklin', 'Liberal', 'Hanston', 'Jetmore'];

  return (
    <section className="alt" id="service-area">
      <div className="wrap">
        <div className="service-area-box">
          <div>
            <p className="eyebrow">Service area</p>
            <h2>Helping households across southwest Kansas</h2>
            <p>
              We are proud to support local families and small businesses with practical rental options that help reduce
              upfront costs and keep things moving.
            </p>
          </div>
          <div className="chip-row location-row">
            {locations.map((location) => (
              <span key={location} className="chip location-chip">
                <span className="pulse" />
                {location}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ requestedItems, onRemoveItem, onClearRequest }: {
  requestedItems: string[];
  onRemoveItem: (item: string) => void;
  onClearRequest: () => void;
}) {
  return (
    <section id="contact" style={{ background: 'var(--brand-dark)', padding: '80px 0' }}>
      <div className="wrap">
        <div className="form-grid">
          <div className="form-side">
            <p className="eyebrow">Get in touch</p>
            <h2>Ready to rent?</h2>
            <p>Fill out the form and we'll follow up with pricing and availability for your term. Prefer to talk it through first?</p>
            <p className="contact-line">
              <b>Call/Text:</b> {COMPANY_INFO.phone}
            </p>
            <p className="contact-line">
              <b>Email:</b> {COMPANY_INFO.email}
            </p>
            <p className="contact-line">
              <b>Serving:</b> {COMPANY_INFO.serviceArea}
            </p>
          </div>
          <ContactForm
            requestedItems={requestedItems}
            onRemoveItem={onRemoveItem}
            onClearRequest={onClearRequest}
          />
        </div>
      </div>
    </section>
  );
}
