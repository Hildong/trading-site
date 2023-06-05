export interface IdefaultUserValues {
    name: String
    portfolio: {
        fiat: Number,
        btc: Number,
        eth: Number
    },
    trades: [] | null
}