import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  // Query,
  Route,
  SuccessResponse,
} from "tsoa";

import { StreetAddress } from "../entity/StreetAddress";
import { AddressCreationParams, create, get } from "./addressService";

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
}
