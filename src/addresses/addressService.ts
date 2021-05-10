import { BaseEntity } from "typeorm";
import { StreetAddress } from "../entity/StreetAddress";

export type AddressCreationParams = Omit<
  StreetAddress,
  keyof BaseEntity | "id"
>;

export async function get(id: number): Promise<StreetAddress> {
  return StreetAddress.findOneOrFail(id);
}

export async function create(
  addressCreationParams: AddressCreationParams
): Promise<StreetAddress> {
  // Do some data validation.

  return StreetAddress.create(addressCreationParams).save();
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

export async function remove(id: number): Promise<StreetAddress> {
  const address = await StreetAddress.findOneOrFail(id);

  await address.remove();

  return address;
}

/**
 *
 * Given the recommended time constraints I took some liberties here:
 *
 * I assumed that the structure of the commas in the sentence
 * gave us a bunch of information about the address
 * The final section (after the second comma) would always be a combo
 * of the state and zip code.
 *
 * The second section would always be the city, if it existed
 *
 * And the first section could either be the first/second lines of the address
 * or one of the following values. I.e. if we only pass MD it could search for state
 *
 * I did this as a first pass so that if other types of structures
 * became apparent it would be relatively easy to add to them down the road.
 *
 * i.e. we're assuming we won't get some line like: Baltimore, MD
 * based on the examples given.
 *
 * It also assumes that "Suite" will be the only configuration that
 * line 2 presents as. Though this should also be easy to change if necessary.
 *
 * @param parameter
 * @returns
 */

function parseParameterForComponents(
  parameters: string
): Partial<AddressCreationParams> {
  const [firstPart, city, stateZip] = parameters.split(",");

  /**
   * This capture group makes a bunch of assumptions about the formatting of the string
   * I wanted to put it in as a nod at trying to reduce the number of likes and ors
   * in the parent query.
   */
  const matchingGroup = /(?<lineOne>[\s|\S]*)(?<lineTwo>Suite\s.*)/;
  const captureGroup = firstPart.match(matchingGroup);

  let lineOne = firstPart;
  let lineTwo = firstPart;

  let lineOneAndTwo = {
    lineOne: firstPart,
    lineTwo: firstPart,
  };

  if (captureGroup && captureGroup.groups) {
    const { groups } = captureGroup;

    lineOne = groups.lineOne;
    lineTwo = groups.lineTwo;
  }

  /**
   * If the first query has component parts,
   * we know it's not an everything search
   */
  if (!city && lineOne !== lineTwo) {
    return {
      lineOne,
      lineTwo,
    };
  }

  // If there's no city we can presume there's no state/zip combo as well
  // meaning that we're doing the most permissive search possible
  if (!city) {
    return {
      lineOne,
      lineTwo,
      city: lineOne,
      state: lineOne,
      zip: lineOne,
    };
  }

  /**
   * This can be made more permissive by
   * allowing it to see if we should do a state/zip search
   * in addition to city.
   *
   * The challenge is that our assumption about state zip (a space)
   * is going to add a lot of false negatives and slow the query down.
   */
  if (!stateZip) {
    return {
      ...lineOneAndTwo,
      city,
    };
  }

  const [state, zip] = stateZip.split(" ");

  return {
    ...lineOneAndTwo,
    city,
    state,
    zip,
  };
}

/**
 * Design Assumptions
 *
 * Assumption About Inputs:
 *
 * 1600
 * MD
 * 3400 N. Charles St.
 * 3400 N. Charles St., Baltimore
 * Baltimore
 *
 * -  My design assumption here is that the front end is going to give us a string
 * and then the backend should do some work to parse it and make the correct search.
 *
 * - My second assumption is that each consecutive piece of information should be
 * additive. I.e. each comma implies something about the string we're building
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
export async function query(parameters: string): Promise<StreetAddress[]> {
  const { lineOne, lineTwo, city, state, zip } = parseParameterForComponents(
    parameters
  );

  try {
    const addressQb = StreetAddress.createQueryBuilder("sa");
    if (lineOne) {
      addressQb.orWhere("sa.lineOne like :lineOne", {
        lineOne: `%${lineOne}%`,
      });
    }

    if (lineTwo) {
      addressQb.orWhere("sa.lineTwo like :lineTwo", {
        lineTwo: `%${lineTwo}%`,
      });
    }

    if (city) {
      addressQb.orWhere("sa.city like :city", { city: `%${city}%` });
    }
    if (state) {
      addressQb.orWhere("sa.state like :state", { state: `%${state}%` });
    }

    if (zip) {
      addressQb.orWhere("sa.zip like :zip", { zip: `%${zip}%` });
    }

    const results = await addressQb.getMany();

    return results;
  } catch (error) {
    console.log(error);
    return [];
  }
}
