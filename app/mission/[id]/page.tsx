"use client"

import { loadWebformByName } from "@/utils/drupal/webform";
import { WebformData } from "@/utils/drupal/webform_types";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// type Props = {
//     params: { id: string }
// }

// async function getMission () {
//     const values = await loadWebformByName("mission");
//     return values;
// }

// export default function Mission({ params }: Props) {
export default function Mission() {
    const params = useParams<{ id: string }>()
    const id = parseInt(params?.id) ?? 0;
    const [loading, setLoading]: any = useState(true);
    const [data, setData]: any = useState();

    const getWebform = async () => {
        const item: WebformData = await loadWebformByName("mission");
        setData(item);
    }

    useEffect(() => {
        if (loading) {
            getWebform();
            setLoading(false);
        }
    }, [setData, setLoading]);

    const WebformDrupal = dynamic(
        () => import('@/components/WebformDrupal'),
        { ssr: false }
    )

    // @ts-ignore
    let webform: WebformData = data;

    if (webform) {
        return (
            <WebformDrupal
                webform={webform}
                webformId="mission"
                multi={id}
                title="Mission"
                noTitle
            />
        )
    }
}
