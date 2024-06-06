import { cookies } from "next/headers";
import { getCollection } from "@/lib/mongodb";



export const authorized = () => {
    const userId = cookies().get('userId');
    if(userId == undefined){
        return false
    } else {
        return true
    }

}


export const login = (data) => {
    const loginCollection = getCollection("user")
    console.log(data)
    // console.log(loginCollection)
}