import { sendEmail } from '@/app/lib/email';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, dob, phone, email, address, city, state, zipcode, item, tier, price } = body;

    // Validate required fields
    if (
      !name ||
      !dob ||
      !phone ||
      !email ||
      !address ||
      !city ||
      !state ||
      !zipcode ||
      !item ||
      !tier ||
      !price
    ) {
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
    const selfApprovalThreshold = parseInt(process.env.SELF_APPROVAL_THRESHOLD || '500');

    if (!adminEmail) {
      console.error('ADMIN_EMAIL not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Determine if auto-approved
    const isAutoApproved = price < selfApprovalThreshold;
    const approvalStatus = isAutoApproved ? 'Auto-Approved' : 'Pending Financing Partner Review';

    // Send email to admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px;">
          New Rent-to-Own Application
        </h2>
        
        <div style="margin: 20px 0; padding: 15px; background-color: ${isAutoApproved ? '#d4edda' : '#fff3cd'}; border-radius: 8px; border-left: 4px solid ${isAutoApproved ? '#28a745' : '#ffc107'};">
          <p style="margin: 0; font-weight: bold; font-size: 14px;">
            Status: ${approvalStatus}
          </p>
        </div>

        <div style="margin: 20px 0; padding: 15px; background-color: #ecf0f1; border-radius: 8px;">
          <h3 style="margin-top: 0; color: #2c3e50;">Applicant Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Date of Birth:</strong> ${dob}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
          
          <h3 style="margin-top: 20px; color: #2c3e50;">Address</h3>
          <p>${address}<br>${city}, ${state} ${zipcode}</p>
          
          <h3 style="margin-top: 20px; color: #2c3e50;">Rental Details</h3>
          <p><strong>Item:</strong> ${item}</p>
          <p><strong>Tier:</strong> ${tier}</p>
          <p><strong>Monthly Price:</strong> $${price}</p>
        </div>

        <p style="color: #7f8c8d; font-size: 12px; margin-top: 30px;">
          This is an automated application from your Rent4You website.
          ${isAutoApproved ? 'This application has been auto-approved.' : 'This application requires financing partner review.'}
        </p>
      </div>
    `;

    // Send email to customer (confirmation)
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2c3e50;">Application Received! 🎉</h2>
        
        <p>Hi ${name},</p>
        
        <p>Thank you for applying for our Rent-to-Own program! We're excited to work with you.</p>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #ecf0f1; border-radius: 8px;">
          <h3 style="margin-top: 0; color: #2c3e50;">Application Summary</h3>
          <p><strong>Item:</strong> ${item}</p>
          <p><strong>Tier:</strong> ${tier}</p>
          <p><strong>Monthly Payment:</strong> $${price}</p>
        </div>

        <div style="margin: 20px 0; padding: 15px; background-color: ${isAutoApproved ? '#d4edda' : '#fff3cd'}; border-radius: 8px; border-left: 4px solid ${isAutoApproved ? '#28a745' : '#ffc107'};">
          <p style="margin: 0; font-weight: bold;">
            Status: ${approvalStatus}
          </p>
          ${
            isAutoApproved
              ? '<p style="margin: 10px 0 0 0; font-size: 14px;">Your application has been approved! We\'ll contact you shortly to finalize delivery.</p>'
              : '<p style="margin: 10px 0 0 0; font-size: 14px;">Your application is under review. We\'ll contact you within 24-48 hours with an update.</p>'
          }
        </div>

        <p>If you have any questions, please don't hesitate to reach out!</p>
        
        <p>Best regards,<br><strong>Rent4You Team</strong></p>
      </div>
    `;

    // Send both emails
    await Promise.all([
      sendEmail({
        to: adminEmail,
        subject: `New RTO Application: ${item} - ${approvalStatus}`,
        html: adminEmailHtml,
      }),
      sendEmail({
        to: email,
        subject: 'Application Received - Rent4You Rent-to-Own',
        html: customerEmailHtml,
      }),
    ]);

    return NextResponse.json(
      {
        message: 'Application submitted successfully',
        status: approvalStatus,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Application error:', error);
    return NextResponse.json(
      { error: 'Failed to process application' },
      { status: 500 }
    );
  }
}
