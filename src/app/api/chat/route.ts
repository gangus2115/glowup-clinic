import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const difyUrl = process.env.DIFY_API_URL || "https://api.dify.ai/v1/chat-messages";
    const apiKey = (process.env.DIFY_API_KEY || "").trim();

    if (!apiKey) {
      return NextResponse.json({ error: "Missing DIFY_API_KEY in environment" }, { status: 500 });
    }

    const payload: any = {
      inputs: {},
      query: body.query,
      response_mode: "streaming",
      user: "web-user"
    };
    
    if (body.conversation_id) {
      payload.conversation_id = body.conversation_id;
    }

    console.log("Sending payload to Dify:", JSON.stringify(payload));

    const response = await fetch(difyUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const status = response.status;
      const text = await response.text();
      let err;
      try {
        err = JSON.parse(text);
      } catch (e) {
        err = text;
      }
      console.error(`DIFY ERROR [${status}]:`, err);
      return NextResponse.json({ error: "Dify API Error", status, details: err }, { status: 500 });
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      }
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal Server Error", message: error.message }, { status: 500 });
  }
}
