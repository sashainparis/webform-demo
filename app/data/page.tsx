import { redirect } from "next/navigation";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import DashboardCard from "@/components/DashboardCard";
import FormSettings from "@/components/FormSettings";
import TitlePage from "@/components/TitlePage";
import FormMision from "@/components/FormMission";
import { loadWebformByName } from "@/utils/drupal/webform";
import dynamic from "next/dynamic";

export default function Data() {
    const WebformDrupal = dynamic(
        () => import('@/components/WebformDrupal'),
        { ssr: false }
    )
    const mission = loadWebformByName('mission');
    return (
        <>
            <TitlePage title="My Data" />

            <div className="grid grid-cols-3 grid-flow-col gap-8">
                <div className="col-span-1">
                    <DashboardCard title="Mission 1">
                        <WebformDrupal webform={mission} webformId="mission1" />
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
