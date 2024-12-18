import HoldingForm from '@/forms/manage-holdings-form/ManageHolding'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import HoldingCard from '@/components/HoldingCard';

const ManagePortfolio = () => {
  return (
    <div>
      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Holdings</TabsTrigger>
          <TabsTrigger value="manage-holdings">Manage Holdings</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <HoldingCard />
        </TabsContent>
        <TabsContent value="manage-holdings">
          <HoldingForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ManagePortfolio;
