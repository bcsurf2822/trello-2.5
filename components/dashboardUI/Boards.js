import { auth } from "@/auth";
import { connectMongo } from "@/lib/mongoose";
import User from "@/models/User";
import Link from "next/link";

async function getUser() {
  const session = await auth();
  await connectMongo();

  return await User.findById(session.user.id).populate("boards");
}

export default async function Boards() {
  const user = await getUser();

  console.log("User", user);

  return (
    <div>
      {user.boards.map((board) => (
        <div key={board._id} className="group">
          <Link href={`/board/${board._id}`} key={board._id}>
            <div className="bg-gray-100 hover:bg-gray-200 rounded-lg h-28 flex items-center cursor-pointer justify-between">
              <p className="ml-4">{board.name}</p>
              <div className="opacity-0 group-hover:opacity-100">Delete</div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
