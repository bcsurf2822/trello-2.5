import connectToDatabase from "../../../lib/mongoose";
import User from "../../../lib/models";

// export async function GET(request) {
//   try {
//     await connectToDatabase();

//     const users = await User.find({}); // Fetch all users
//     return new Response(JSON.stringify(users), {
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

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