"use client"

import importWebform from '@/utils/supabase/webform_import';
import { Button } from '@mui/material';

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
                <div key={item.id} className="py-2 grid grid-cols-subgrid col-span-2 gap-4">
                    <div className=''>{date} <b>{hour}</b></div>
                    <div>
                        <Button className='' type="submit" variant="outlined" onClick={() => { importWebform(name, item.id) }}>Load [{item.id}]</Button>
                    </div>
                </div>
            );
        })
    }
    return (
        <>
            <h3 className='pt-8 text-xl font-bold'>{title}</h3>
            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                {buttons}
            </div>
        </>
    )
}

