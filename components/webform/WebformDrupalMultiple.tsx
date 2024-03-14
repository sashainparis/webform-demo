"use client"

import Link from "next/link";
import { Button } from '@mui/material';
import DashboardCard from "@/components/DashboardCard";
import dynamic from "next/dynamic";

type Props = {
    webform: any,
}

export default function WebformDrupalMultiple({ webform }: Props) {
    const WebformDrupal = dynamic(
        () => import('@/components/webform/WebformDrupal'),
        { ssr: false }
    )

    return (
        <>
            <DashboardCard title="Mission 1">
                <WebformDrupal webform={webform} webformId="mission1" noTitle />
            </DashboardCard>
        </>
    )
}