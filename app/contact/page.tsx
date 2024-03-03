import { loadWebformByName } from "@/utils/drupal/webform";
import dynamic from "next/dynamic";

export default function Contact() {
    const WebformDrupal = dynamic(
        () => import('@/components/WebformDrupal'),
        { ssr: false }
    )
    const test = loadWebformByName('test'); 
    const contact = loadWebformByName('contact'); 
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

