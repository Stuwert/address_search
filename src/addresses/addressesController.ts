import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  // Query,
  Route,
  SuccessResponse,
} from "tsoa";

import { StreetAddress } from "../entity/StreetAddress";
import {
  AddressCreationParams,
  create,
  get,
  remove,
  update,
} from "./addressService";

@Route("addresses")
export class AddressesController extends Controller {
  @Get("{addressId}")
  public async getAddress(@Path() addressId: number): Promise<StreetAddress> {
    return get(addressId);
  }

  @SuccessResponse("201", "Created")
  @Post()
  public async createAddress(
    @Body() requestBody: AddressCreationParams
  ): Promise<StreetAddress> {
    this.setStatus(201);
    return create(requestBody);
  }

  @Delete("{addressId}")
  public async deleteAddress(
    @Path() addressId: number
  ): Promise<StreetAddress> {
    return remove(addressId);
  }

  @Put("{addressId}")
  public async updateAddress(
    @Path() addressId: number,
    @Body() requestBody: AddressCreationParams
  ): Promise<StreetAddress> {
    return update(addressId, requestBody);
  }
}
