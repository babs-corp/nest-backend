import { PickType } from "@nestjs/swagger";
import { RouteDto } from "./route.dto";

export class CreateRouteDto extends PickType(RouteDto, ['title', 'description', 'user_id', 'status', 'publicity']) {
  title: string;
  description: string;
  user_id: string;
}