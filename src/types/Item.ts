import { FilterStatus } from "./FilterStatus";

export type ItemType = {
    id: string;
    name: string;
} & ({
    status: FilterStatus.PENDING;
    price?: number;
    quantity?: number;
    total?: number;
} | {
    status: FilterStatus.DONE;
    price: number;
    quantity: number;
    total: number;
});
