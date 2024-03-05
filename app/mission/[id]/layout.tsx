import { Suspense } from "react";
import MissionsList from "./@list/page";
import Loading from "@/app/loading";

export default function MissionsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="container mx-auto px-4 xl:px-48 grid grid-cols-1 md:grid-cols-3 md:gap-8" >
                <div className="col-span-1">
                    <MissionsList />
                    <div className="font-lg mt-8">Some introduction text.</div>
                </div >
                <div className="col-span-2">
                    <Suspense fallback={<Loading />} >
                        {children}
                    </Suspense>
                </div>
            </div>
        </>
    );
}
