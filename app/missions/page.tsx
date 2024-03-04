import DashboardCard from "@/components/DashboardCard";
import TitlePage from "@/components/TitlePage";
import { loadWebformByName } from "@/utils/drupal/webform";
import dynamic from "next/dynamic";
import { Button } from '@mui/material';
import Link from "next/link";

export default function Data() {
    const WebformDrupal = dynamic(
        () => import('@/components/WebformDrupal'),
        { ssr: false }
    )
    const mission = loadWebformByName('mission');
    return (
        <>
            <div className="container mx-auto px-4 xl:px-48 grid grid-cols-1 md:grid-cols-3 md:gap-8">
                <div className="col-span-1">
                    <DashboardCard title="My Missions">
                        {/* <TitlePage title="My Missions" /> */}
                        <ul className="">
                            <li><Link href="">Mission 1</Link></li>
                            <li><Link href="">Mission 2</Link></li>
                            <li><Link href="">Mission 3</Link></li>
                        </ul>
                        <div className="py-4">
                            <Button type="submit" variant="contained" >Add new Mission</Button>
                        </div>
                    </DashboardCard>
                </div>
                <div className="col-span-2">
                    <DashboardCard title="Mission 1">
                        <WebformDrupal webform={mission} webformId="mission1" noTitle />
                    </DashboardCard>
                </div>
                {/* <div className="col-span-1">
                    <DashboardCard title="Mission 2">
                        <WebformDrupal webform={mission} webformId="mission2" noTitle />
                    </DashboardCard>
                </div>
                <div className="col-span-1">
                    <DashboardCard title="Mission 3">
                        <WebformDrupal webform={mission} webformId="mission3" noTitle />
                    </DashboardCard>
                </div> */}
            </div>
        </>
    );
}
