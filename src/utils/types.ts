export interface WbWarehouse {
  boxDeliveryBase: string;
  boxDeliveryCoefExpr: string;
  boxDeliveryLiter: string;
  boxDeliveryMarketplaceBase: string;
  boxDeliveryMarketplaceCoefExpr: string;
  boxDeliveryMarketplaceLiter: string;
  boxStorageBase: string;
  boxStorageCoefExpr: string;
  boxStorageLiter: string;
  geoName: string;
  warehouseName: string;
}

export interface WbData {
  dtNextBox: string;
  dtTillMax: string;
  warehouseList: WbWarehouse[];
}

export interface WbResponse {
  response: {
    data: WbData;
  };
}

export interface Tariff {
  warehouse: string;
  deliveryType: string;
  coefficient: number;
  base: number;
  raw: WbWarehouse;
}
