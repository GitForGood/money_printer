import yahooFinance from 'yahoo-finance2'
import type { PublicCompany } from '../../types/market'
import { SP500_TICKERS } from './sp500'

// Top S&P 500 Tickers
const BATCH_SIZE = 50

export const fetchRealMarketData = async (): Promise<PublicCompany[]> => {
    try {
        const allCompanies: PublicCompany[] = []

        // Chunk the tickers
        for (let i = 0; i < SP500_TICKERS.length; i += BATCH_SIZE) {
            const chunk = SP500_TICKERS.slice(i, i + BATCH_SIZE)
            // console.log(`Fetching batch ${i / BATCH_SIZE + 1}...`) // Logspam reduction if desired

            try {
                const results = await yahooFinance.quote(chunk) as any[]

                const companies = results.map((quote: any) => {
                    const price = quote.regularMarketPrice || quote.bid || 100
                    return {
                        id: `comp_real_${quote.symbol.toLowerCase()}`,
                        name: quote.shortName || quote.longName || quote.symbol,
                        ticker: quote.symbol,
                        sector: 'Unknown',
                        description: `Real-world data for ${quote.symbol}`,
                        sharePrice: price,
                        totalShares: quote.sharesOutstanding || 1000000000,
                        volatility: calculateVolatility(price, quote.fiftyTwoWeekHigh, quote.fiftyTwoWeekLow),
                        dividendYield: (quote.dividendYield || 0) / 100
                    }
                })

                allCompanies.push(...companies)
            } catch (batchError) {
                console.error(`Failed to fetch batch starting at ${i}:`, batchError)
                // Continue to next batch even if one fails
            }
        }

        return allCompanies
    } catch (error) {
        console.error('Critical failure in market data fetch:', error)
        return []
    }
}

const calculateVolatility = (current: number, high?: number, low?: number): number => {
    if (!high || !low) return 0.2
    const range = high - low
    const avg = (high + low) / 2
    return (range / avg) || 0.2
}
