import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgCreateDiscountTokenStatus } from "./types/mitoblockchaindev/tx";
import { MsgCreateDiscountToken } from "./types/mitoblockchaindev/tx";
import { MsgDeleteDiscountTokenStatus } from "./types/mitoblockchaindev/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/mitoblockchaindev.mitoblockchaindev.MsgCreateDiscountTokenStatus", MsgCreateDiscountTokenStatus],
    ["/mitoblockchaindev.mitoblockchaindev.MsgCreateDiscountToken", MsgCreateDiscountToken],
    ["/mitoblockchaindev.mitoblockchaindev.MsgDeleteDiscountTokenStatus", MsgDeleteDiscountTokenStatus],
    
];

export { msgTypes }