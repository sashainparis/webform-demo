"use client"

// import { redirect } from "next/navigation";
import DashboardCard from "@/components/DashboardCard";
import Link from "next/link";
import { getWebformFromLocalStorage } from "@/lib/localstorage/webform_get";
import { useEffect, useState } from "react";
import { MultiWebform, WebformValues, WebformsValues } from "@/lib/drupal/webform_types";
import dayjs from "dayjs";
import "dayjs/locale/fr";


export default function MissionsList() {
    const [loading, setLoading]: any = useState(true);
    const [records, setRecords]: any = useState();

    useEffect(() => {
        setRecords(getWebformFromLocalStorage("mission", 99));
        setLoading(false);
    }, [setRecords, setLoading])

    let next: number = 1;
    let links: any[] = [];
    if (records) {
        const toBeSorted = [...records];
        const ordered: MultiWebform = toBeSorted.sort((a: MultiWebform, b: MultiWebform) => (a.id - b.id)).pop(); 
        next = ordered.id + 1;

        const now = dayjs(Date()).format("YYYYMMDD");
        const list = records.sort((a: any, b: any) => {
            const aValue = (a["End-date"]) ? dayjs(a["End-date"]).format("YYYYMMDD") : now;
            const bValue = (b["End-date"]) ? dayjs(b["End-date"]).format("YYYYMMDD") : now;

            return bValue.localeCompare(aValue);
        });
        const newList: WebformValues[] = Object.values(list);

        links = newList.map((record: any, key: number) => {
            const start = (record["Start-date"]) ? ` - ${dayjs(record["Start-date"]).format("DD/MM/YYYY")}` : "";
            const end = (record["End-date"]) ? ` => ${dayjs(record["End-date"]).format("DD/MM/YYYY")}` : "";
            const text = (record?.Title !== "") ? `${record.Title} ${start} ${end}` : `Mission ${record.id}`
            return (
                <li key={key}><Link href={`/mission/${record.id}`}>{text}</Link></li>
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

// export default async function Missions() {
//   return redirect("/mission/0");
// }
