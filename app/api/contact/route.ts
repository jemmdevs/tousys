import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { type, data } = body;

        if (!type || !data) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const contactEmail = process.env.CONTACT_EMAIL || 'delivered@resend.dev';

        let subject: string;
        let htmlContent: string;

        if (type === 'sayhi') {
            // Say Hi form submission
            subject = `New Contact: ${data.name}`;
            htmlContent = `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h1 style="color: #121317; font-size: 24px; font-weight: 600; margin-bottom: 24px;">
                        New "Say Hey" Message
                    </h1>
                    
                    <div style="background: #f9fafb; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                        <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px;">From</p>
                        <p style="margin: 0 0 20px 0; color: #121317; font-size: 16px; font-weight: 500;">${data.name}</p>
                        
                        <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px;">Email</p>
                        <p style="margin: 0 0 20px 0; color: #121317; font-size: 16px;">
                            <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a>
                        </p>
                        
                        ${data.source ? `
                            <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px;">How they heard about us</p>
                            <p style="margin: 0 0 20px 0; color: #121317; font-size: 16px;">${data.source}</p>
                        ` : ''}
                    </div>
                    
                    <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px;">
                        <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px;">Message</p>
                        <p style="margin: 0; color: #121317; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
                    </div>
                    
                    <p style="margin-top: 24px; color: #9ca3af; font-size: 12px; text-align: center;">
                        Sent from Al-Awal Biotech Contact Form
                    </p>
                </div>
            `;
        } else if (type === 'getaccess') {
            // Get Access form submission
            subject = `Access Request: ${data.name} - ${data.organization || 'Individual'}`;
            htmlContent = `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h1 style="color: #121317; font-size: 24px; font-weight: 600; margin-bottom: 24px;">
                        New Access Request
                    </h1>
                    
                    <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
                        <p style="margin: 0; color: #065f46; font-size: 14px; font-weight: 500;">
                            🎯 Someone wants access to Al-Awal
                        </p>
                    </div>
                    
                    <div style="background: #f9fafb; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                        <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px;">Name</p>
                        <p style="margin: 0 0 20px 0; color: #121317; font-size: 16px; font-weight: 500;">${data.name}</p>
                        
                        <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px;">Email</p>
                        <p style="margin: 0 0 20px 0; color: #121317; font-size: 16px;">
                            <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a>
                        </p>
                        
                        ${data.organization ? `
                            <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px;">Organization</p>
                            <p style="margin: 0 0 20px 0; color: #121317; font-size: 16px;">${data.organization}</p>
                        ` : ''}
                    </div>
                    
                    ${data.message ? `
                        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px;">
                            <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px;">Additional Message</p>
                            <p style="margin: 0; color: #121317; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
                        </div>
                    ` : ''}
                    
                    <p style="margin-top: 24px; color: #9ca3af; font-size: 12px; text-align: center;">
                        Sent from Al-Awal Biotech Access Request Form
                    </p>
                </div>
            `;
        } else {
            return NextResponse.json(
                { error: 'Invalid form type' },
                { status: 400 }
            );
        }

        const { data: emailData, error } = await resend.emails.send({
            from: 'Al-Awal Biotech <onboarding@resend.dev>',
            to: [contactEmail],
            subject: subject,
            html: htmlContent,
            replyTo: data.email,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json(
                { error: 'Failed to send email' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, messageId: emailData?.id },
            { status: 200 }
        );

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
