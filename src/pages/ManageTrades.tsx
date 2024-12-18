
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TradeForm from '@/forms/manage-trades-form.tsx/ManageTradesForm';
import TradeCard from "@/components/TradeCard";

const ManageTrades = () => {
  return (
    <div>
      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Trades</TabsTrigger>
          <TabsTrigger value="manage-trades">Manage Trades</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <TradeCard />
        </TabsContent>
        <TabsContent value="manage-trades">
          <TradeForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ManageTrades;
