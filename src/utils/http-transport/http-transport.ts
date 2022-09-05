import {API_URL, METHODS} from '../../constants/constants';
import {queryStringify} from '../helpers';

export type RequestOptions = {
  headers?: Record<string, string>;
  method?: string;
  timeout?: number;
  data?: any;
  credentials?: string;
  mode?: string;
};

export class HTTPTransport {
  private _apiURL = API_URL;
  private _defaultHeaders = {'content-type': 'application/json'};
  private _request = <T>(url: string, options: RequestOptions = {}): Promise<T> => {
    const {headers = {}, method, data} = options;

    return new Promise(function(resolve, reject) {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function() {
        try {
          resolve(JSON.parse(xhr.response));
        }
        catch {
          resolve(xhr.response)
        }
      };

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = options.timeout || 5000;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else if(options?.headers && options.headers['content-type'] === 'application/json') {
        xhr.send(JSON.stringify(data))
      } else {
        xhr.send(data);
      }
    });
  };
  
  public get = <T>(url: string, options: RequestOptions = {}): Promise<T> => {
    return this._request<T>(`${this._apiURL}${url}`, {...options, method: METHODS.GET});
  };

  public post = <T>(url: string, options: RequestOptions = {}): Promise<T> => {
    return this._request<T>(`${this._apiURL}${url}`, {
      ...options,
      headers: options.headers ? options.headers : this._defaultHeaders,
      method: METHODS.POST
    });
  };

  public put = <T>(url: string, options: RequestOptions = {}): Promise<T> => {
    return this._request<T>(`${this._apiURL}${url}`, {
      ...options,
      headers: options.headers ? options.headers : this._defaultHeaders,
      method: METHODS.PUT});
  };

  public delete = <T>(url: string, options: RequestOptions = {}): Promise<T> => {
    return this._request<T>(`${this._apiURL}${url}`, {
      ...options,
      headers: options.headers ? options.headers : this._defaultHeaders,
      method: METHODS.DELETE
    });
  };
}
