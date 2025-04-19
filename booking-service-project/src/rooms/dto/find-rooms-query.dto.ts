import { IsOptional, IsBooleanString } from 'class-validator';

export class FindRoomsQueryDto {
    @IsOptional()
    @IsBooleanString()
    active?: string;
}
