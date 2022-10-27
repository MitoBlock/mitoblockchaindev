package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	cdc.RegisterConcrete(&MsgCreateDiscountToken{}, "mitoblockchaindev/CreateDiscountToken", nil)
	cdc.RegisterConcrete(&MsgCreateDiscountTokenStatus{}, "mitoblockchaindev/CreateDiscountTokenStatus", nil)
	cdc.RegisterConcrete(&MsgDeleteDiscountTokenStatus{}, "mitoblockchaindev/DeleteDiscountTokenStatus", nil)
	cdc.RegisterConcrete(&MsgCreateMembershipToken{}, "mitoblockchaindev/CreateMembershipToken", nil)
	// this line is used by starport scaffolding # 2
}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateDiscountToken{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateDiscountTokenStatus{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgDeleteDiscountTokenStatus{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateMembershipToken{},
	)
	// this line is used by starport scaffolding # 3

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	Amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)
