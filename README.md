# Rent4You Utility

Flexible rental service landing page with day, month-to-month, and rent-to-own options for washers, dryers, and household items.

## Features

- 📱 Responsive design optimized for all devices
- 🎯 Interactive rental term selector (Day/Month/Own)
- 📝 Multi-step rent-to-own application flow
- 💳 Integrated approval routing (self-approval vs. financing partner)
- ✉️ Netlify Forms inquiry capture
- 🎨 Modern, accessible UI with comprehensive CSS
- ⚙️ Fully customizable pricing and content

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: CSS (custom properties)
- **Hosting**: Netlify
- **Forms**: Netlify Forms

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rent4you620-gif/rent4you-utility.git
cd rent4you-utility
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

### Environment Variables

Edit `.env.local` with your settings:

- **SMTP Settings**: Configure your email provider (Gmail, SendGrid, etc.)
- **Company Info**: Phone, email, service area
- **Approval Threshold**: Dollar amount to determine self-approval vs. partner financing
- **Financing Partner**: API keys for Katapult, Acima, or similar

### Pricing & Inventory

Update pricing in these locations:
1. Home page hero section
2. Catalog cards (Washer, Dryer, Sets)
3. Rent-to-own items in the RTO section

All prices are currently placeholders marked with `$XX`.

## API Routes

The rental inquiry form is registered as `rental-inquiry` in Netlify Forms. Submissions appear in the site dashboard under **Forms**.

## Deployment

### Deploy to Netlify

1. Push to GitHub
2. Connect the repository to a Netlify site
3. Add the public company information environment variables in Netlify
4. Deploy!

Netlify automatically detects the Next.js application and deploys updates from the production branch.

## Customization

### Update Company Info
Edit the following files:
- `.env.local` - Contact details and settings
- `app/page.tsx` - Hero copy, catalog, pricing
- `app/home.tsx` - Main page sections and company details
- `app/components/` - Interactive catalog, form, and footer components

### Add More Items
1. Update catalog grid in home page
2. Add to RTO section with pricing and approval tier
3. Update form select options

### Integrate Financing Partner
Connect the request flow to your approved financing partner only after reviewing its compliance and disclosure requirements.

## Support

For issues or questions, contact: hello@rent4youutility.com

## License

MIT
