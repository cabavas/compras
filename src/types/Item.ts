import { FilterStatus } from "./FilterStatus";

export type ItemType = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
    status: FilterStatus;
};