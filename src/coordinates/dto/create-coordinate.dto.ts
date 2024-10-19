import { PickType } from "@nestjs/swagger";
import { CoordinateDto } from "./coordinate.dto";

export class CreateCoordinateDto extends PickType(CoordinateDto, ['routeId', 'latitude', 'longitude', 'order']) {
}