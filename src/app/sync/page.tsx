"use client"

import { useEffect, useState } from "react";
import { Button } from '@mui/material';
import { createClient } from "@/utils/supabase/client";
import exportWebform from "@/utils/supabase/webform_export";
import ArchList from "@/components/ArchList";

const limit: number = 12;

export default function Sync() {
    const [connected, setConnected] = useState(false);
    const [connexionIsTested, setConnexionIsTested] = useState(false);

    const [accessed, setAccessed] = useState(false);
    const [accessIsTested, setAccessIsTested] = useState(false);

    const [loaded, setLoaded] = useState(false);
    const [archiveTest, setArchiveTest]: any = useState();
    const [archiveContact, setArchiveContact]: any = useState();
    const [archiveMission, setArchiveMission]: any = useState();

    const canIinitSupabaseClient = () => {
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
        const fetchPosts = async () => {
            const supabase = createClient();
            const { data: testValues } = await supabase.from("dashboard")
                .select()
                .eq('form_id', 'test')
                .order('created_at', { ascending: false })
                .limit(limit)
                ;
            const { data: contactValues } = await supabase.from("dashboard")
                .select()
                .eq('form_id', 'contact')
                .order('created_at', { ascending: false })
                .limit(limit)
                ;
            const { data: missionValues } = await supabase.from("dashboard")
                .select()
                .eq('form_id', 'mission')
                .order('created_at', { ascending: false })
                .limit(limit)
                ;
            setArchiveTest(testValues);
            setArchiveContact(contactValues);
            setArchiveMission(missionValues);
            setLoaded(true);
        }

        fetchPosts()
    }, [
        setArchiveTest,
        setArchiveContact,
        setArchiveMission,
        setLoaded])

    useEffect(() => {
        if (!connexionIsTested) {
            setConnected(canIinitSupabaseClient());
            setConnexionIsTested(true);
        }
    }, [setConnected,
        setConnexionIsTested])

    useEffect(() => {
        if (!accessIsTested) {
            canIaccessSupabaseDatabase();
            setAccessIsTested(true);
        }
    }, [canIaccessSupabaseDatabase,
        setAccessIsTested])

    return (
        <>
            <div className="w-3/4">

                <div>
                    {connected ? "Connexion réussie" : "Echec de connexion"}
                </div>
                <div>
                    {accessed ? "Test accès réussie" : "Echec du test d'accès"}
                </div>
                <div className="">
                    <h2 className="text-2xl py-4">Save your data</h2>
                    <div className="py-4">
                        <Button type="submit" variant="contained" onClick={() => { exportWebform("test") }}>Save TEST Form to DB</Button>
                    </div>
                    <div className="py-4">
                        <Button type="submit" variant="contained" onClick={() => { exportWebform("contact") }}>Save CONTACT Form to DB</Button>
                    </div>
                    <div className="py-4">
                        <Button type="submit" variant="contained" onClick={() => { exportWebform("mission") }}>Save MISSION Form to DB</Button>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl py-4">Reload your data</h2>
                    {archiveTest && <ArchList key="test" name="test" title="Test" items={archiveTest} />}
                    {archiveContact && <ArchList key="contact" name="contact" title="Contact" items={archiveContact} />}
                    {archiveMission && <ArchList key="mission" name="mission" title="Mission" items={archiveMission} />}
                </div>
            </div>
        </>
    )
}

