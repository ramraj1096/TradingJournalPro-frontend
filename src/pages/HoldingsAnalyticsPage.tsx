import AnalyticsAssetDetails from '@/components/AnalyticsAssetDetails'
import { AnalyticsChart } from '@/components/AnalyticsChart'
import HoldingOverviewCards from '@/components/HoldingOverviewCards'

const HoldingsAnalyticsPage = () => {
  return (
    <div>
        <HoldingOverviewCards />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
            <div className="flex-1">
                <AnalyticsChart />
            </div>
            <div className="flex-1">
                <AnalyticsAssetDetails />
            </div>
        </div>
    </div>
  )
}

export default HoldingsAnalyticsPage
