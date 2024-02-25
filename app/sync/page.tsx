"use client"

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Button } from '@mui/material';
import { getToLocalStorageByForm } from "@/components/WebformDrupalField";

async function saveWebform(formId: string) {
    console.log("--- SAVE Webform ---");
    const form = `form-${formId}`;
    const values = getToLocalStorageByForm(form);
    const supabase = createClient();
    const result = await supabase.from("dashboard").insert({ form_id: formId, data: values });
    console.log(result);
}

export default function Sync() {
    const [connected, setConnected] = useState(false);
    const [connexionIsTested, setConnexionIsTested] = useState(false);
    const [accessed, setAccessed] = useState(false);
    const [accessIsTested, setAccessIsTested] = useState(false);

    const canIinitSupabaseClient = () => {
        // This function is just for the interactive tutorial.
        // Feel free to remove it once you have Supabase connected.
        try {
            createClient();
            return true;
        } catch (e) {
            return false;
        }
    };

    const canIaccessSupabaseDatabase = async () => {
        const supabase = createClient();
        const { data: dashboard } = await supabase.from("dashboard").select();

        if (dashboard) {
            setAccessed(true);
        }
        return false;
    };

    useEffect(() => {
        if (!connexionIsTested) {
            setConnected(canIinitSupabaseClient());
            setConnexionIsTested(true);
        }
        if (!accessIsTested) {
            canIaccessSupabaseDatabase();
            setAccessIsTested(true);
        }
    }, [])

    return (
        <>
            <div>
                {connected ? "Connexion réussie" : "Echec de connexion"}
            </div>
            <div>
                {accessed ? "Test accès réussie" : "Echec du test d'accès"}
            </div>
            <Button type="submit" variant="contained" onClick={() => { saveWebform("test") }}>Save TEST Form to DB</Button>
            <Button type="submit" variant="contained" onClick={() => { saveWebform("contact") }}>Save CONTACT Form to DB</Button>
        </>
    )
}
