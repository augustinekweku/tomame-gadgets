import { authOptions } from "@/lib/authOptions";
import NextAuth from "next-auth";

//ignore ts error
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
