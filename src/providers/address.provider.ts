import { StructuredAddressDto } from '../modules/delivery/dto';

export class AddressProvider {
  static generateFullAddress(address: StructuredAddressDto): string {
    return `${address.streetAddress}, ${address.unit}, ${address.city}, ${address.state}, ${address.zipCode}, ${address.country}`;
  }
}
