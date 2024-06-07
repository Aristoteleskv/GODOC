// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const server_config = {
  port: '5000',
  host: 'localhost'
};

export const environment = {
  production: false,
  apiUser: 'http://localhost:5000/api/kv/users',
  apiUrl: 'http://localhost:5000/api/kv/',
  apiUrlp: 'http://localhost:5000/api/kv/pastas',
  apiUrlf: 'http://localhost:5000/api/kv/files/',
  Url: 'http://localhost:5000/api/kv/files/files/',
  apiUrll: 'http://localhost:5000/api/kv/',
  categoriaUrl: 'http://localhost:5000/api/kv/categories',

  socketUrl: 'http://localhost:5000',

  defaultHost: server_config.host,
  api_url: 'http://'+server_config.host+':'+server_config.port,
  api_url_by_version: '/api/v1'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
