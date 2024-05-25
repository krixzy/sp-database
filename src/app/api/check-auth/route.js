import {auth, currentUser} from "@clerk/nextjs/server";

export const GET = async (req) => {
  const user = await currentUser();
   return new Response(JSON.stringify({ user_auth: user.privateMetadata.auth_level }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};