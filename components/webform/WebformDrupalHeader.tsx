import { WebformObject } from "@/utils/drupal/webform_types"
import { useState } from "react";

type Props = {
    webform: WebformObject,
    noTitle?: boolean,
}

export default function WebformDrupalHeader ({webform, noTitle = false}: Props) {
    const [message, setMessage]: any = useState([]);

    const renderedMessage = message.map((line: string, key: number) => (<div key={key}>{line}</div>))
    return (
        <>
            <div>
                {renderedMessage}
            </div>
            {!noTitle && <h2 className="text-2xl py-8 font-bold">{webform.title}</h2>}
            <div>
                {webform.description}
            </div>
        </>
    )
}

