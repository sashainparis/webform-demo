"use client"

import DashboardCard from "@/components/DashboardCard";
import Link from "next/link";
import { getWebformFromLocalStorage } from "@/lib/localstorage/webform_get";
import { useEffect, useState } from "react";

export default function MissionsList() {
    const [loading, setLoading]: any = useState(true);
    const [records, setRecords]: any[] = useState();

    useEffect(() => {
        setRecords(getWebformFromLocalStorage("mission", 99));
        setLoading(false);
    }, [setRecords, setLoading])

    let next: number = 1;
    let links: any[] = [];
    if (records) {
        next = records?.length;
        links = records.map((record: any, id: number) => {
            return (
                <li key={id}><Link href={`/mission/${id}`}>{(record?.Title !== "") ? record.Title : `Mission ${id}`}</Link></li>
            )
        })
    }
    const newMission = <li key="new"><Link href={`/mission/${next}`}>New mission</Link></li>;
    links.push(newMission);
    const list = <ul className="" >
        {links}
    </ul>;

    return (
        <DashboardCard title="My Missions">
            {list}
        </DashboardCard >
    )
}
