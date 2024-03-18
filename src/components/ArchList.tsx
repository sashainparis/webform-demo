"use client"

import importWebform from '@/utils/supabase/webform_import';
import { Button } from '@mui/material';
import DashboardCard from './DashboardCard';

type Props = {
    name: string,
    title: string,
    items?: any | false,
}

export default function ArchList({ name, title, items }: Props) {
    let buttons;
    if (items) {
        buttons = items.map((item: any) => {
            let s = item.created_at;
            let d = new Date(s);
            d.setUTCDate(d.getUTCDate() + 1);
            const date = d.toLocaleDateString('fr-FR');
            const hour = d.toLocaleTimeString('fr-FR', {timeStyle: "short"});
            // const created = `${date} <b>${hour}</b>`
            return (
                <div key={item.id} className="py-2 grid grid-cols-subgrid col-span-2">
                    <div className=''>{date} <b>{hour}</b></div>
                    <div>
                        <Button className='' size="small" type="submit" variant="outlined" onClick={() => { importWebform(name, item.id) }}>Load [{item.id}]</Button>
                    </div>
                </div>
            );
        })
    }
    return (
        <DashboardCard title={title}>
            <div className="grid grid-cols-6 gap-2">
                {buttons}
            </div>
        </DashboardCard>
    )
}

