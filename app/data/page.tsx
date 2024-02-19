"use client"

import { redirect } from "next/navigation";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import DashboardCard from "@/components/DashboardCard";
import FormSettings from "@/components/FormSettings";
import TitlePage from "@/components/TitlePage";
import FormMision from "@/components/FormMission";

export default function Data() {
    return (
        <>
            <TitlePage title="My Data" />

            <div className="grid grid-cols-3 grid-flow-col gap-8">
                <div className="col-span-1">
                    <DashboardCard title="Mission 1">
                        <FormMision />
                    </DashboardCard>
                </div>
                <div className="col-span-1">
                <DashboardCard title="Mission 2">
                        <FormMision />
                    </DashboardCard>
                </div>
                <div className="col-span-1">
                <DashboardCard title="Mission 3">
                        <FormMision />
                    </DashboardCard>
                </div>
            </div>
        </>
    );
}
