import { PickType } from "@nestjs/swagger";
import { CoordinateDto } from "./coordinate.dto";

export class CreateCoordinateDto extends PickType(CoordinateDto, ['route_id', 'latitude', 'longitude', 'order']) {
}