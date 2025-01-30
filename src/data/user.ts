import { verifySession } from "@/lib/session";
import UserModal from "@/server/modals/UserModal";
import { cache } from "react";

export const getUser = cache(async () => {
    const { sessionId } = await verifySession();

    const user = await UserModal.findOne({ _id: sessionId }).select(['username','email','image','about','status','lastActive']).lean();

    return user;
})