# Rent4You Utility

Flexible rental service landing page with day, month-to-month, and rent-to-own options for washers, dryers, and household items.

## Features

- 📱 Responsive design optimized for all devices
- 🎯 Interactive rental term selector (Day/Month/Own)
- 📝 Multi-step rent-to-own application flow
- 💳 Integrated approval routing (self-approval vs. financing partner)
- ✉️ Email notifications for inquiries and applications
- 🎨 Modern, accessible UI with comprehensive CSS
- ⚙️ Fully customizable pricing and content

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: CSS (custom properties)
- **Hosting**: Vercel
- **Email**: Nodemailer
- **Validation**: Zod

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

### POST `/api/inquiries`
Submit a general rental inquiry

**Request:**
```json
{
  "name": "John Doe",
  "phone": "(555) 123-4567",
  "email": "john@example.com",
  "item": "Washer",
  "term": "Month-to-Month",
  "message": "Optional message"
}
```

### POST `/api/applications`
Submit a rent-to-own application

**Request:**
```json
{
  "item": "Sofa (3-seat)",
  "tier": "partner",
  "name": "Jane Smith",
  "dob": "1990-01-15",
  "phone": "(555) 987-6543",
  "email": "jane@example.com",
  "address": "123 Main St, Kansas City, MO 64105"
}
```

## Deployment

### Deploy to Vercel

1. Push to GitHub
2. Connect repo to Vercel: https://vercel.com
3. Add environment variables in Vercel dashboard
4. Deploy!

Vercel will automatically build and deploy on every push to `main`.

## Customization

### Update Company Info
Edit the following files:
- `.env.local` - Contact details and settings
- `app/page.tsx` - Hero copy, catalog, pricing
- `components/layout/Footer.tsx` - Footer information

### Add More Items
1. Update catalog grid in home page
2. Add to RTO section with pricing and approval tier
3. Update form select options

### Integrate Financing Partner
Replace the placeholder steps in the RTO modal with your partner's embedded widget (Katapult, Acima, etc.)

## Support

For issues or questions, contact: rent4you620@gmail.com

## License

MIT
