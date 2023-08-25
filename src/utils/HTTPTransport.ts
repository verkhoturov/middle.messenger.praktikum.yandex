enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

type Options = {
  method?: Method;
  data?: any;
};

type HTTPMethod = (url: string, options?: Options) => Promise<XMLHttpRequest>;

function queryStringify(data: Record<string, any>) {
  return Object.entries(data)
    .map(([key, value]) => key + "=" + value)
    .join("&");
}
export default class HTTPTransport {
  get: HTTPMethod = (url, options) => {
    if (options?.data) {
      url += "?" + queryStringify(options.data);
      options.data = {};
    }
    return this.request(url, { ...options, method: Method.GET });
  };

  post: HTTPMethod = (url, options) =>
    this.request(url, {
      ...options,
      method: Method.POST
    });

  put: HTTPMethod = (url, options) =>
    this.request(url, {
      ...options,
      method: Method.PUT
    });

  delete: HTTPMethod = (url, options) =>
    this.request(url, {
      ...options,
      method: Method.DELETE
    });

  request: HTTPMethod = (url, options = { method: Method.GET }) => {
    const { method = Method.GET, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.withCredentials = true;

      xhr.onload = function () {
        const { status, response } = xhr;
        if (status === 200 || status === 201) {
          return resolve(JSON.parse(response));
        }
        return reject(JSON.parse(response));
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === Method.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
