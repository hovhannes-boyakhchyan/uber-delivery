import { BarcodeTypes, DeliverableAction, Size } from '../../../constants';

export interface ICreateDeliveryInterface {
  dropoff_address: string;
  dropoff_name: string;
  dropoff_phone_number: string;
  manifest_items: IManifestItem[];
  pickup_address: string;
  pickup_name: string;
  pickup_phone_number: string;
  deliverable_action?: DeliverableAction;
  dropoff_business_name?: string;
  dropoff_latitude?: number;
  dropoff_longitude?: number;
  dropoff_notes?: string;
  dropoff_seller_notes?: string;
  dropoff_verification?: IVerification;
  manifest_reference?: string;
  manifest_total_value?: number;
  pickup_business_name?: string;
  pickup_latitude?: number;
  pickup_longitude?: number;
  pickup_notes?: string;
  pickup_verification?: IVerification;
  quote_id?: string;
  undeliverable_action?: IUndeliverableAction;
  pickup_ready_dt?: string;
  pickup_deadline_dt?: string;
  dropoff_ready_dt?: string;
  dropoff_deadline_dt?: string;
  tip?: number;
  idempotency_key?: string;
  external_store_id: string;
  return_verification?: IVerification;
}

export interface IManifestItem {
  name: string;
  quantity: number;
  size?: Size;
  dimensions?: IDimensions;
  must_be_upright?: boolean;
  weight?: number;
  perishability?: number;
  preparation_time?: number;
}

interface IDimensions {
  length: number;
  height: number;
  depth: number;
}

interface IVerification {
  signature?: boolean;
  barcodes?: IBarcode[];
  pincode?: IPincode;
  package?: IPackage;
  identification?: IIdentification;
  picture?: boolean;
}

interface IBarcode {
  value?: string;
  type?: BarcodeTypes;
}

interface IPincode {
  enabled?: boolean;
  value?: string;
}

interface IPackage {
  bag_count?: number;
  drink_count?: number;
}

interface IIdentification {
  min_age?: number;
}

interface IUndeliverableAction {
  leave_at_door?: string;
  return?: string;
}
