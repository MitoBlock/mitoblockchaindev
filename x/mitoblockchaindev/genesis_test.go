package mitoblockchaindev_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	keepertest "mitoblockchaindev/testutil/keeper"
	"mitoblockchaindev/testutil/nullify"
	"mitoblockchaindev/x/mitoblockchaindev"
	"mitoblockchaindev/x/mitoblockchaindev/types"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.MitoblockchaindevKeeper(t)
	mitoblockchaindev.InitGenesis(ctx, *k, genesisState)
	got := mitoblockchaindev.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
