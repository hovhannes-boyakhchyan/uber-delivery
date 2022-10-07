export interface ICreateQuoteInterface {
  dropoff_address: string;
  pickup_address: string;
  dropoff_latitude?: number;
  dropoff_longitude?: number;
  dropoff_phone_number?: string;
  pickup_latitude?: number;
  pickup_longitude?: number;
  pickup_phone_number?: string;
  pickup_ready_dt?: string;
  pickup_deadline_dt?: string;
  dropoff_ready_dt?: string;
  dropoff_deadline_dt?: string;
  manifest_total_value?: number;
  external_store_id?: string;
}
