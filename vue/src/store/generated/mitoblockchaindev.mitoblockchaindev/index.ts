import { Client, registry, MissingWalletError } from 'mitoblockchaindev-client-ts'

import { DiscountToken } from "mitoblockchaindev-client-ts/mitoblockchaindev.mitoblockchaindev/types"
import { DiscountTokenStatus } from "mitoblockchaindev-client-ts/mitoblockchaindev.mitoblockchaindev/types"
import { Params } from "mitoblockchaindev-client-ts/mitoblockchaindev.mitoblockchaindev/types"


export { DiscountToken, DiscountTokenStatus, Params };

function initClient(vuexGetters) {
	return new Client(vuexGetters['common/env/getEnv'], vuexGetters['common/wallet/signer'])
}

function mergeResults(value, next_values) {
	for (let prop of Object.keys(next_values)) {
		if (Array.isArray(next_values[prop])) {
			value[prop]=[...value[prop], ...next_values[prop]]
		}else{
			value[prop]=next_values[prop]
		}
	}
	return value
}

type Field = {
	name: string;
	type: unknown;
}
function getStructure(template) {
	let structure: {fields: Field[]} = { fields: [] }
	for (const [key, value] of Object.entries(template)) {
		let field = { name: key, type: typeof value }
		structure.fields.push(field)
	}
	return structure
}
const getDefaultState = () => {
	return {
				Params: {},
				DiscountTokens: {},
				DiscountTokenStatus: {},
				DiscountTokenStatusAll: {},
				DiscountTokenStatusQ: {},
				
				_Structure: {
						DiscountToken: getStructure(DiscountToken.fromPartial({})),
						DiscountTokenStatus: getStructure(DiscountTokenStatus.fromPartial({})),
						Params: getStructure(Params.fromPartial({})),
						
		},
		_Registry: registry,
		_Subscriptions: new Set(),
	}
}

// initial state
const state = getDefaultState()

export default {
	namespaced: true,
	state,
	mutations: {
		RESET_STATE(state) {
			Object.assign(state, getDefaultState())
		},
		QUERY(state, { query, key, value }) {
			state[query][JSON.stringify(key)] = value
		},
		SUBSCRIBE(state, subscription) {
			state._Subscriptions.add(JSON.stringify(subscription))
		},
		UNSUBSCRIBE(state, subscription) {
			state._Subscriptions.delete(JSON.stringify(subscription))
		}
	},
	getters: {
				getParams: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.Params[JSON.stringify(params)] ?? {}
		},
				getDiscountTokens: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.DiscountTokens[JSON.stringify(params)] ?? {}
		},
				getDiscountTokenStatus: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.DiscountTokenStatus[JSON.stringify(params)] ?? {}
		},
				getDiscountTokenStatusAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.DiscountTokenStatusAll[JSON.stringify(params)] ?? {}
		},
				getDiscountTokenStatusQ: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.DiscountTokenStatusQ[JSON.stringify(params)] ?? {}
		},
				
		getTypeStructure: (state) => (type) => {
			return state._Structure[type].fields
		},
		getRegistry: (state) => {
			return state._Registry
		}
	},
	actions: {
		init({ dispatch, rootGetters }) {
			console.log('Vuex module: mitoblockchaindev.mitoblockchaindev initialized!')
			if (rootGetters['common/env/client']) {
				rootGetters['common/env/client'].on('newblock', () => {
					dispatch('StoreUpdate')
				})
			}
		},
		resetState({ commit }) {
			commit('RESET_STATE')
		},
		unsubscribe({ commit }, subscription) {
			commit('UNSUBSCRIBE', subscription)
		},
		async StoreUpdate({ state, dispatch }) {
			state._Subscriptions.forEach(async (subscription) => {
				try {
					const sub=JSON.parse(subscription)
					await dispatch(sub.action, sub.payload)
				}catch(e) {
					throw new Error('Subscriptions: ' + e.message)
				}
			})
		},
		
		
		
		 		
		
		
		async QueryParams({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.MitoblockchaindevMitoblockchaindev.query.queryParams()).data
				
					
				commit('QUERY', { query: 'Params', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryParams', payload: { options: { all }, params: {...key},query }})
				return getters['getParams']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryParams API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryDiscountTokens({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.MitoblockchaindevMitoblockchaindev.query.queryDiscountTokens(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.MitoblockchaindevMitoblockchaindev.query.queryDiscountTokens({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'DiscountTokens', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryDiscountTokens', payload: { options: { all }, params: {...key},query }})
				return getters['getDiscountTokens']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryDiscountTokens API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryDiscountTokenStatus({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.MitoblockchaindevMitoblockchaindev.query.queryDiscountTokenStatus( key.id)).data
				
					
				commit('QUERY', { query: 'DiscountTokenStatus', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryDiscountTokenStatus', payload: { options: { all }, params: {...key},query }})
				return getters['getDiscountTokenStatus']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryDiscountTokenStatus API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryDiscountTokenStatusAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.MitoblockchaindevMitoblockchaindev.query.queryDiscountTokenStatusAll(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.MitoblockchaindevMitoblockchaindev.query.queryDiscountTokenStatusAll({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'DiscountTokenStatusAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryDiscountTokenStatusAll', payload: { options: { all }, params: {...key},query }})
				return getters['getDiscountTokenStatusAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryDiscountTokenStatusAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryDiscountTokenStatusQ({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.MitoblockchaindevMitoblockchaindev.query.queryDiscountTokenStatusQ( key.id, query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.MitoblockchaindevMitoblockchaindev.query.queryDiscountTokenStatusQ( key.id, {...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'DiscountTokenStatusQ', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryDiscountTokenStatusQ', payload: { options: { all }, params: {...key},query }})
				return getters['getDiscountTokenStatusQ']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryDiscountTokenStatusQ API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		async sendMsgCreateDiscountTokenStatus({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.MitoblockchaindevMitoblockchaindev.tx.sendMsgCreateDiscountTokenStatus({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateDiscountTokenStatus:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgCreateDiscountTokenStatus:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgDeleteDiscountTokenStatus({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.MitoblockchaindevMitoblockchaindev.tx.sendMsgDeleteDiscountTokenStatus({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDeleteDiscountTokenStatus:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgDeleteDiscountTokenStatus:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgCreateDiscountToken({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.MitoblockchaindevMitoblockchaindev.tx.sendMsgCreateDiscountToken({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateDiscountToken:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgCreateDiscountToken:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		
		async MsgCreateDiscountTokenStatus({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.MitoblockchaindevMitoblockchaindev.tx.msgCreateDiscountTokenStatus({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateDiscountTokenStatus:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgCreateDiscountTokenStatus:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgDeleteDiscountTokenStatus({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.MitoblockchaindevMitoblockchaindev.tx.msgDeleteDiscountTokenStatus({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgDeleteDiscountTokenStatus:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgDeleteDiscountTokenStatus:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgCreateDiscountToken({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.MitoblockchaindevMitoblockchaindev.tx.msgCreateDiscountToken({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateDiscountToken:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgCreateDiscountToken:Create Could not create message: ' + e.message)
				}
			}
		},
		
	}
}
