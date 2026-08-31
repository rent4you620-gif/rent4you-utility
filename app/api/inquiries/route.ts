import { sendEmail } from '@/app/lib/email';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, item, term, message } = body;

    // Validate required fields
    if (!name || !phone || !email || !item || !term) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      console.error('ADMIN_EMAIL not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Send email to admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px;">
          New Rental Inquiry
        </h2>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #ecf0f1; border-radius: 8px;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
          <p><strong>Item Interested:</strong> ${item}</p>
          <p><strong>Rental Term:</strong> ${term}</p>
          ${message ? `<p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>` : ''}
        </div>

        <p style="color: #7f8c8d; font-size: 12px; margin-top: 30px;">
          This is an automated inquiry from your Rent4You website.
        </p>
      </div>
    `;

    // Send email to customer (confirmation)
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2c3e50;">Thank You for Your Interest!</h2>
        
        <p>Hi ${name},</p>
        
        <p>We received your inquiry about renting a <strong>${item}</strong> on a <strong>${term}</strong> basis.</p>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #ecf0f1; border-radius: 8px;">
          <p><strong>What happens next:</strong></p>
          <ul>
            <li>Our team will review your request</li>
            <li>We'll contact you within 24 hours at ${phone}</li>
            <li>We'll discuss availability and pricing details</li>
          </ul>
        </div>

        <p>If you have any questions in the meantime, feel free to call us!</p>
        
        <p>Best regards,<br><strong>Rent4You Team</strong></p>
      </div>
    `;

    // Send both emails
    await Promise.all([
      sendEmail({
        to: adminEmail,
        subject: `New Inquiry: ${item} (${term})`,
        html: adminEmailHtml,
      }),
      sendEmail({
        to: email,
        subject: 'We Received Your Inquiry - Rent4You',
        html: customerEmailHtml,
      }),
    ]);

    return NextResponse.json(
      { message: 'Inquiry received successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Inquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    );
  }
}
