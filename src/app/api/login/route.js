import { getCollection } from "@/lib/mongodb";
import {User} from "@/models/user";
import { cookies } from "next/headers";
export const POST = async (req) => {
    try {
        const data = await req.json();
        const user = new User(data.username, data.password);
        const check = await checkUser(user);
        console.log(check)
        if(check){
            return new Response(JSON.stringify({ message: "Login successful" }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            return new Response(JSON.stringify({ message: "Login failed" }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

    } catch (e) {
        return new Response(JSON.stringify({ message: "Noget gik galt" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        }); 
    }
 }


 const checkUser = async (user) => {
    const loginCollection = await getCollection("user");
    for (const element of loginCollection) {
        if (element.username === user.username && element.password === user.password) {
            cookies().set('userId', element._id, {httpOnly: true, path: '/', expires: new Date(Date.now() + 1000 * 60 * 60 * 24)});

            return true;
        }
    }
    return false
}