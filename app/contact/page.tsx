import WebformDrupal from "@/components/WebformDrupal";
import { loadWebformByName } from "@/utils/drupal/webform";
import dynamic from "next/dynamic";

export default function Contact() {
    const name = 'test';
    const webform = loadWebformByName(name); 
    const WebformDrupal = dynamic(
        () => import('@/components/WebformDrupal'),
        { ssr: false }
    )
    return (
        <>
            <div id="webform">
                <WebformDrupal webform={webform} />
            </div>
        </>
    )
}

