import { Factory } from "fishery";
import { StreetAddress } from "../src/entity/StreetAddress";

export default Factory.define<StreetAddress>(() => {
  const streetAddress = new StreetAddress();

  return streetAddress;
});
