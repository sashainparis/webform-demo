import { loadWebformByName } from "@/utils/drupal/webform";
import { WebformData } from "@/utils/drupal/webform_types";
import dynamic from "next/dynamic";

export default function Contact() {
    const WebformDrupal = dynamic(
        () => import('@/components/WebformDrupal'),
        { ssr: false }
    )
    // @ts-ignore
    const test: WebformData = loadWebformByName('test'); 
    // @ts-ignore
    const contact: WebformData = loadWebformByName('contact'); 
    return (
        <>
            <div id="webform_test">
                <WebformDrupal webform={test} />
            </div>
            <div id="webform_contact">
                <WebformDrupal webform={contact} />
            </div>
        </>
    )
}

