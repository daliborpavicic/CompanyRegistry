
const onSuccess = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.json().then(json => Promise.resolve(json));
  }

  return response.json().then(json => Promise.reject(json));
};

const onError = error => console.log(error); // eslint-disable-line no-console

const jsonContentHeaders = {
  'Content-Type': 'application/json'
};

export function getResource(url) {
  const requestParams = {
    method: 'GET',
  };

  return sendRequest(url, requestParams);
}

export function postJson(url, json) {
  const requestParams = {
    method: 'POST',
    headers: jsonContentHeaders,
    body: JSON.stringify(json)
  };

  return sendRequest(url, requestParams);
}

export function putJson(url, json) {
  const requestParams = {
    method: 'PUT',
    headers: jsonContentHeaders,
    body: JSON.stringify(json)
  };

  return sendRequest(url, requestParams);
}

export function deleteResource(url) {
  const requestParams = {
    method: 'DELETE',
  };

  return sendRequest(url, requestParams);
}

function sendRequest(url = '', requestParams = {}) {
  const request = new Request(encodeURI(url), requestParams);

  return fetch(request).then(onSuccess, onError);
};
