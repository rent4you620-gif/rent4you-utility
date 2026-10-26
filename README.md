# Rent4You Utility

Flexible rental service landing page for washers, dryers, and equipment.

## Features

- 📱 Responsive design optimized for all devices
- 🧺 Rental catalog with item-specific pricing
- ✉️ Email notifications for rental inquiries
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

### Pricing & Inventory

Update pricing in the catalog cards in `app/components/CatalogGrid.tsx`.

Update the featured monthly price in `app/components/DialCard.tsx`.

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
2. Update the item options in the rental inquiry form.

## Support

For issues or questions, contact: rent4you620@gmail.com

## License

MIT
