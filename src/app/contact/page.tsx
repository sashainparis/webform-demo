"use client"

import { loadWebformByName } from "@/utils/drupal/webform";
import { WebformData } from "@/utils/drupal/webform_types";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

export default function Contact() {
    const [loading, setLoading]: any = useState(true);
    const [test, setTest]: any = useState();
    const [contact, setContact]: any = useState();
    const WebformDrupal = dynamic(
        () => import('@/thecontentsystems/webform/WebformDrupal'),
        { ssr: false }
    )

    const getWebforms = async () => {
        const itemTest: WebformData = await loadWebformByName('test');
        setTest(itemTest);
        const itemContact: WebformData = await loadWebformByName('contact');
        setContact(itemContact);
    }

    useEffect(() => {
        if (loading) {
            getWebforms();
            setLoading(false);
        }
    }, [setTest, setContact, setLoading]);

    // @ts-ignore
    const webformTest: WebformData = test;
    // @ts-ignore
    const webformContact: WebformData = contact;

    if (webformTest && webformContact) {
        return (
            <>
                <div id="webform_test">
                    <WebformDrupal webform={webformTest} webformId="test" />
                </div>
                {/* <div id="webform_contact">
                    <WebformDrupal webform={webformContact} webformId="contact" />
                </div> */}
            </>
        )
    }
}

