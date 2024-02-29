"use client"

import importWebform from '@/utils/supabase/webform_import';
import { Button } from '@mui/material';

type Props = {
    name: string,
    title: string,
    items?: any | false,
}

export default function ArchList({ name, title, items }: Props) {
    console.log(name);
    console.log(items);
    let buttons;
    if (items) {
        buttons = items.map((item: any) => {
            console.log(item);
            let s = item.created_at;
            let d = new Date(s);
            d.setUTCDate(d.getUTCDate() + 1);
            const date = d.toISOString().slice(0,10);
            const hour = d.toISOString().slice(11,16);
            const created = `${date} ${hour}`
            return (
                <div className="py-4 grid grid-cols-2 gap-x-4">
                    <span className=''>{created}</span> 
                    <Button className='' type="submit" variant="outlined" onClick={() => { importWebform(name, item.id) }}>Load [{item.id}]</Button>
                </div>
            );
        })
    }
    return (
        <>
            <h3 className='text-xl font-bold'>{title}</h3>
            {buttons}
        </>
    )
}

