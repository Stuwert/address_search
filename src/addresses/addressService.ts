import { StreetAddress } from "../entity/Address";

export type AddressCreationParams = Omit<StreetAddress, "id">;

export async function get(id: number): Promise<StreetAddress> {
  return StreetAddress.findOneOrFail(id);
}

export async function create(
  addressCreationParams: AddressCreationParams
): Promise<StreetAddress> {
  // Do some data validation.

  return StreetAddress.create(addressCreationParams);
}

export async function update(
  id: number,
  { city, zip, state, lineOne, lineTwo }: Partial<AddressCreationParams>
): Promise<StreetAddress> {
  const address = await StreetAddress.findOneOrFail(id);

  /**
   * This makes a presumption that we'll only be
   * making affermative updates in this route and not deleting lines.
   */

  if (city) {
    address.city = city;
  }

  if (zip) {
    address.zip = zip;
  }

  if (state) {
    address.state = state;
  }

  if (lineOne) {
    address.lineOne = lineOne;
  }

  if (lineTwo) {
    address.lineTwo = lineTwo;
  }

  await address.save();

  return address;
}

export async function remove(id: number): Promise<number> {
  const address = await StreetAddress.findOneOrFail(id);

  await address.remove();

  return id;
}

/**
 * Design Assumptions
 *
 * Potential Inputs:
 *
 * 1600
 * MD
 * 3400 N. Charles St.
 * 3400 N. Charles St., Baltimore
 * Baltimore
 *
 *
 * Depending how often this happened you could do some validation up front to
 * make sure that you were only querying for the items that you wanted.
 *
 * 3400 N. Charles St., Baltimore, MD 21218
 *
 * We will receive a string with up to three commas
 *
 * const [lineOne, city, stateZip] = parameter.split(",")
 *
 * const [state, zip] = stateZip.split(" ");
 *
 * How will we split out lineOne from lineTwo
 *
 * if only 1 variable is returned from the split, presume to search everywhere,
 * else
 *
 * We know some things about the search values in order to narrow them down
 *
 * States like look like a two character capital string
 * Zip codes will either be 5 [0-9] characters or 9 [0-9] characters, or 5 [0-9] - 4 [0-9]
 *
 * The only time we really care about making the determinat
 *
 * @param parameter
 */

export async function query(parameter: string): Promise<StreetAddress[]> {
  const addresses = await StreetAddress.createQueryBuilder().where(
    "lineOne like "
  );
}
