export const environment = {
  production: true,
  fetchRequests: 'api/requestsRetrieval/fetchAllRequests',
  fetchLayout: 'api/seatRetrieval/fetchLayout',
  approveRequest: '/api/requestProcess/approve',
  saveSeatTemplateUrl: 'api/import/saveSeatingTemplate',
  saveRequestUrl: 'api/saveRequest/saveRequestTemplate',
  rejectRequest: '/api/requestProcess/reject',
  fetchProjects: '/api/building/fetchAllProjects',
  fetchBuildingsByProject: '/api/floor/fetchBuildingsbyProject',
  fetchBuildings: '/api/building/fetchAllBuildings',
  fetchFloorsByBuilding: '/api/floor/fetchFloorsByBuilding',
  fetchBaysByFloor: '/api/bay/fetchBaysByFloor'
};
