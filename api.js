export async function onRequest(context) {
  const { request, env } = context;
  
  // Only allow POST requests
  if (request.method !== "POST") {
    return new Response("Send a POST request", { status: 405 });
  }

  // Get the question from the request
  const { prompt } = await request.json();
  
  // Call Cloudflare AI
  const response = await env.AI.run(
    "@cf/meta/llama-2-7b-chat-int8",
    { prompt }
  );

  return new Response(JSON.stringify(response), {
    headers: { "Content-Type": "application/json" }
  });
}
