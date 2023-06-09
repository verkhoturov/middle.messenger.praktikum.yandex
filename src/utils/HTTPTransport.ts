enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

type Options = {
  method: Method;
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

  post: HTTPMethod = (url, options) => this.request(url, options);

  put: HTTPMethod = (url, options) => this.request(url, options);

  delete: HTTPMethod = (url, options) => this.request(url, options);

  request: HTTPMethod = (url, options = { method: Method.GET }) => {
    const { method, data } = options;

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
      } else {
        xhr.send(data);
      }
    });
  };
}
