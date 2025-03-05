import HoldingForm from '@/forms/manage-holdings-form/ManageHolding'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import HoldingCard from '@/components/HoldingCard';
import JournalTable from '@/components/JournalTable';
import AddJournalForm from '@/forms/manage-journals-form/ManageJournalForm';

const JournalLogs = () => {
  return (
    <div>
      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Journals</TabsTrigger>
          <TabsTrigger value="manage-journals">Manage Journals</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <JournalTable />
        </TabsContent>
        <TabsContent value="manage-journals">
          <AddJournalForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default JournalLogs;
