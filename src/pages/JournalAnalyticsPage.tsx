import AnalyticsAssetDetailsOfJournals from '@/components/AnalyticsAssetDetailsOfJournals'
import { AnalyticsChartOfJournals } from '@/components/AnalyticsChartOfJournals'
import JournalOverviewCards from '@/components/JournalOverviewCards'

const JournalAnalyticsPage = () => {
  return (
    <div>
        <JournalOverviewCards />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
            <div className="flex-1">
                <AnalyticsChartOfJournals />
            </div>
            <div className="flex-1">
                <AnalyticsAssetDetailsOfJournals />
            </div>
        </div>
    </div>
  )
}

export default JournalAnalyticsPage;
