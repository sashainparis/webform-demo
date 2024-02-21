
function getFetchOptions(): RequestInit {
    return {
        cache: "no-cache",
        headers: { "api-key": 'cb7a3c8705bee616306a337de4543b97' }
    };
}

function getServiceUrl(bundle: string) {
    return `https://account.octopusceo.com/sysapi/webform/${bundle}`;
}

function normalizeWebform (id: string, uuid: string, webform: any) {
    return {
        id: id,
        uuid: uuid,
        title: webform.title,
        description: webform.description,
        status: webform.status,
        confirmation: {
          type: webform.settings.confirmation_type,
          url: webform.settings.confirmation_url,
          message: webform.settings.confirmation_message,
        },
        elements: webform.elements,
      };
    
}

export async function loadWebform(id: string) {
    const data = await fetchWebforms();
    data.data = data.data.filter((datum: any) => (datum.id === id)).pop();
    return normalizeWebform(data.data.attributes.drupal_internal__id, id, data.data.attributes);
}

export async function loadWebformByName(name: string) {
    const data = await fetchWebforms();
    data.data = data.data.filter((datum: any) => (datum.attributes.drupal_internal__id === name)).pop();
    return normalizeWebform(name, data.data.id, data.data.attributes);
}

export async function fetchWebforms() {
    const url = getServiceUrl('webform');
    const res = await fetch(url, getFetchOptions());
    let data = await res.json();
    // data.data = data.data.filter((datum: any) => (datum.attributes.field_disabled === false))
    return data;
}
