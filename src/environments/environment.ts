// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  BASE_URL: "http://localhost:3001",
  firebase: {
    projectId: 'pencc-17e3d',
    appId: '1:487183051127:web:96c9339838a62060441972',
    storageBucket: 'pencc-17e3d.appspot.com',
    apiKey: 'AIzaSyDhQgi_fykb54kZsSnM_EM4bFpDsm5UhSM',
    authDomain: 'pencc-17e3d.firebaseapp.com',
    messagingSenderId: '487183051127',
  },
  toastrConfig: {
    timeOut: 1000,
    positionClass: 'toast-bottom-center',
    preventDuplicates: true,
  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
