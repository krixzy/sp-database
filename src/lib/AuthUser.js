import {currentUser} from "@clerk/nextjs/server";

export async function authLevel() {
    const user = await currentUser();
    if (!user) {
        return null;
    }else{
        return user.privateMetadata.auth_level;
    }
    
}