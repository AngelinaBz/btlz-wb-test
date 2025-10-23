export interface Tariff {
  warehouse: string;
  deliveryType: string;
  coefficient: number;
  raw: Record<string, unknown>;
}
