// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  fetchRequests: 'resources/fetchRequest.json',
  fetchLayout: 'resources/fetchLayout.json',
  approveRequest: '',
  saveSeatTemplateUrl: 'resources/fetchLayout.json',
  saveRequestUrl: 'resources/fetchRequest.json',
  rejectRequest: '',
  fetchProjects: 'resources/projects.json',
  fetchBuildings: 'resources/buildings.json',
  fetchBuildingsByProject: 'resources/buildings.json',
  fetchFloorsByBuilding: 'resources/floorsByBuilding.json',
  fetchBaysByFloor: 'resources/baysByFloor.json'
};
