"use client"

import { useEffect, useState } from "react";
import ConnectSupabaseSteps from "@/components/ConnectSupabaseSteps"
import SignUpUserSteps from "@/components/SignUpUserSteps"
import { createClient } from "@/utils/supabase/client";

export default function MainBody() {
    const [connected, setConnected] = useState(false);

    const canInitSupabaseClient = () => {
        // This function is just for the interactive tutorial.
        // Feel free to remove it once you have Supabase connected.
        try {
            createClient();
            return true;
        } catch (e) {
            return false;
        }
    };

    useEffect(() => {
        setConnected(canInitSupabaseClient());
    }, [])

    return (
        <>
            {connected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
        </>
    )

}