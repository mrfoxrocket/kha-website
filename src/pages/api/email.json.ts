export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ params, request }) => {
    const body = await request.json();
    const { to, subject, html } = body;
    console.log(body);

    if (!subject || !html) {
        console.error("Server-side error: Missing preset email content (subject/html).");

        return new Response(null, {
            status: 500,
            statusText: "Internal Server Error",
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const send = await resend.emails.send({
        from: `Kiwi Home Assist <${import.meta.env.SENDER_ADDRESS}>`,
        to,
        subject,
        html,
    });

    if (send.error) {
        return new Response(
            JSON.stringify({
                error: send.error.message,
            }),
            {
                status: 500,
                statusText: "There was an error sending the email",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
    return new Response(JSON.stringify({ message: send.data }), { status: 200, statusText: "OK" });
};
