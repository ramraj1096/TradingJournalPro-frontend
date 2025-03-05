import { AnalyticsChartOfTrade } from '@/components/AnalyticChartOfTrades'
import AnalyticsAssetDetailsOfTrades from '@/components/AnalyticsAssetDetailsofTrades'
import TradesOverviewCards from '@/components/TradesOverviewCards'

const TradesAnalyticsPage = () => {
  return (
    <div>
        <TradesOverviewCards />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
            <div className="flex-1">
                <AnalyticsChartOfTrade />
            </div>
            <div className="flex-1">
                <AnalyticsAssetDetailsOfTrades />
            </div>
        </div>
    </div>
  )
}

export default TradesAnalyticsPage
