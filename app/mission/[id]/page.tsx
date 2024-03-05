import { loadWebformByName } from "@/utils/drupal/webform";
import dynamic from "next/dynamic";

type Props = { 
    params: { 
        id: number,
    } 
}

export default async function Mission({ params }: Props) {
    const id = params?.id ?? "1";
    const WebformDrupal = dynamic(
        () => import('@/components/WebformDrupal'),
        { ssr: false }
    )

    const mission = loadWebformByName('mission');
    return (
        <WebformDrupal webform={mission} webformId="mission" multi={id} title={`Mission`} noTitle />
    )
}
