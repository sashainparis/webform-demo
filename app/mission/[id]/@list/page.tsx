"use client"

import DashboardCard from "@/components/DashboardCard";
import Link from "next/link";
import { getWebformFromLocalStorage } from "@/utils/localstorage/webform_get";
import { useEffect, useState } from "react";
import { WebformData, WebformElements } from "@/utils/drupal/webform_types";

export default function MissionsList() {
    const [records, setRecords]: any[] = useState();

    useEffect(() => {
        setRecords(getWebformFromLocalStorage("mission", 99));
    }, [])

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
    links.push(<li key="new"><Link href={`/mission/${next}`}>New mission</Link></li>);
    const list = <ul className="" >
        {links}
    </ul>;

    return (
        <DashboardCard title="My Missions">
            {list}
        </DashboardCard >
    )
}
