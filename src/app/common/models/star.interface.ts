export interface IStarParameters {
  dataset: string;
  timezone: string;
  rows: number;
  sort: string[];
  format: string;
  facet: string[];
}

export interface IStarFields {
  etat: string;
  numerobus: number;
  coordonnees: number[];
  idbus: string;
}

export interface IStarGeometry {
  type: string;
  coordinates: number[];
}

export interface IStarRecord {
  datasetid: string;
  recordid: string;
  fields: IStarFields;
  geometry: IStarGeometry;
  record_timestamp: Date;
}

export interface IStarFacet {
  count: number;
  path: string;
  state: string;
  name: string;
}

export interface IStarFacetGroup {
  facets: IStarFacet[];
  name: string;
}

export interface IStarRootObject {
  nhits: number;
  parameters: IStarParameters;
  records: IStarRecord[];
  facet_groups: IStarFacetGroup[];
}
