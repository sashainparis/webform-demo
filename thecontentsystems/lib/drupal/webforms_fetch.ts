

function getFetchOptions(): RequestInit {
    return {
        cache: "no-cache",
        headers: { "api-key": 'cb7a3c8705bee616306a337de4543b97' }
    };
}

function getServiceUrl(bundle: string) {
    return `https://account.octopusceo.com/sysapi/webform/${bundle}`;
}

export default async function fetchWebforms() {
    const url = getServiceUrl('webform');
    const res = await fetch(url, getFetchOptions());
    let data = await res.json();
    // data.data = data.data.filter((datum: any) => (datum.attributes.field_disabled === false))
    return data;
}
