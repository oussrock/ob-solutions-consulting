import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, service, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    await resend.emails.send({
      from: "OB Solutions Contact <onboarding@resend.dev>",
      to: "ouss.bousselsal@gmail.com",
      replyTo: email,
      subject: `New enquiry from ${name}${company ? ` — ${company}` : ""}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1e293b;">
          <div style="background:#1D4ED8;padding:24px 32px;border-radius:12px 12px 0 0;">
            <h1 style="color:white;margin:0;font-size:20px;">New Contact Request — OB Solutions</h1>
          </div>
          <div style="background:#f8fafc;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#64748b;font-size:13px;width:130px;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#1D4ED8;">${email}</a></td></tr>
              ${company ? `<tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Organisation</td><td style="padding:8px 0;">${company}</td></tr>` : ""}
              ${service ? `<tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Service</td><td style="padding:8px 0;">${service}</td></tr>` : ""}
            </table>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;" />
            <p style="color:#64748b;font-size:13px;margin:0 0 8px;">Message</p>
            <p style="background:white;padding:16px;border-radius:8px;border:1px solid #e2e8f0;line-height:1.7;margin:0;">${message.replace(/\n/g, "<br/>")}</p>
            <p style="margin-top:24px;font-size:12px;color:#94a3b8;">Sent from obsolutions.ca contact form</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
