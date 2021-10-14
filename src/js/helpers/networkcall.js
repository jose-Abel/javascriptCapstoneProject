export default class NetworkCall {
  constructor(url = 'https://api.tvmaze.com/') {
    this.baseUrl = url;
  }

  postRequest = async (body, urlPath = '', returnJson = false) => {
    const response = await fetch(this.baseUrl + urlPath, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const json = returnJson ? await response.json() : await response.text();
    return json;
  };

  getRequest = async (pathUrl = '', returnJson = false) => {
    const response = await fetch(this.baseUrl + pathUrl);
    const json = returnJson ? await response.json() : await response.text();
    return json;
  };

  getRequestNoCors = async (pathUrl = '') => {
    pathUrl.split('');
    return fetch(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/f2Nvc7oVyb6NlmnKre2d/likes',
    )
      .then((response) => response.json())
      .catch((err) => err);
  };

  getRequestWithOptions(queryParams) {
  const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    return fetch(this.baseUrl + queryParams, requestOptions)
     .then(response => response.json())
     .catch(error => console.log('error', error));
  }
}
