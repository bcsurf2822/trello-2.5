import connectToDatabase from "../../../lib/mongoose";
import User from "../../../models/User";


export async function POST(request) {
  try {
    await connectToDatabase();

    const data = await request.json();
    const newUser = await User.create(data);

    return new Response(JSON.stringify(newUser), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}