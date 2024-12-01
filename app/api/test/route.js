import connectToDatabase from "../../../lib/mongoose";

export async function GET() {
  try {
    await connectToDatabase();

    return new Response(
      JSON.stringify({ message: "Successfully connected to the database!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
