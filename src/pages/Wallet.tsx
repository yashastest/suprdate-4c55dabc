
import React, { useState } from 'react';
import { AppHeader } from '@/components/AppHeader';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Wallet, CreditCard, Clock, Check, Tag } from 'lucide-react';

const WalletPage = () => {
  const { toast } = useToast();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  
  const rechargeOptions = [
    { amount: 9.99, credits: 100, bonus: 0 },
    { amount: 19.99, credits: 220, bonus: 20 },
    { amount: 49.99, credits: 600, bonus: 100 },
    { amount: 99.99, credits: 1500, bonus: 500 },
  ];
  
  const handleRecharge = () => {
    if (!selectedAmount) {
      toast({
        title: "Select an amount",
        description: "Please select a recharge amount first.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would open a payment gateway
    toast({
      title: "Processing Payment",
      description: "Your wallet will be recharged soon.",
    });
  };
  
  const transactionHistory = [
    { id: 1, type: "Purchase", amount: -50, description: "Premium Feature", date: "Apr 28, 2025" },
    { id: 2, type: "Recharge", amount: 220, description: "Credit Purchase", date: "Apr 25, 2025" },
    { id: 3, type: "Purchase", amount: -100, description: "Boost Profile", date: "Apr 20, 2025" },
    { id: 4, type: "Bonus", amount: 20, description: "Welcome Bonus", date: "Apr 15, 2025" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader title="Wallet" showBackButton={true} />
      
      <div className="flex-1 pb-20">
        {/* Wallet Card */}
        <div className="p-5">
          <div className="bg-gradient-to-r from-brand-purple to-brand-pink rounded-xl p-5 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-poppins font-extrabold text-xl">SuprWallet</h2>
              <Wallet className="h-6 w-6" />
            </div>
            
            <div className="text-center py-4">
              <p className="text-sm opacity-90 font-jetbrains">Current Balance</p>
              <h1 className="text-4xl font-poppins font-extrabold my-2">70</h1>
              <p className="text-sm opacity-90 font-jetbrains">Credits</p>
            </div>
            
            <div className="flex justify-between text-xs opacity-90 mt-2">
              <span>Valid Forever</span>
              <span>SuprDate</span>
            </div>
          </div>
        </div>
        
        {/* Recharge Options */}
        <div className="px-5 py-3">
          <h3 className="font-poppins font-bold text-lg mb-4">Recharge Credits 💰</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {rechargeOptions.map((option) => (
              <Card 
                key={option.amount}
                className={`cursor-pointer transition-all border-2 ${
                  selectedAmount === option.amount 
                    ? 'border-brand-purple' 
                    : 'border-transparent hover:border-brand-purple/30'
                }`}
                onClick={() => setSelectedAmount(option.amount)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-poppins font-bold text-lg">${option.amount}</span>
                    {selectedAmount === option.amount && (
                      <Check className="h-5 w-5 text-brand-purple" />
                    )}
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium text-foreground">{option.credits} Credits</p>
                    {option.bonus > 0 && (
                      <p className="text-green-600 font-medium">+{option.bonus} Bonus</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Button 
            onClick={handleRecharge}
            className="w-full bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 mt-4 py-6 text-lg font-poppins font-bold"
            disabled={!selectedAmount}
          >
            <CreditCard className="mr-2 h-5 w-5" />
            Recharge Now
          </Button>
          
          <div className="flex items-center gap-2 justify-center mt-3 text-xs text-muted-foreground">
            <Tag className="h-3 w-3" />
            <span>Secure payment powered by Stripe</span>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        {/* Transaction History */}
        <div className="px-5 py-3">
          <h3 className="font-poppins font-bold text-lg mb-4">Transaction History</h3>
          
          <div className="space-y-3">
            {transactionHistory.map((transaction) => (
              <div 
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className={`rounded-full p-2 ${
                    transaction.amount > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.amount > 0 ? (
                      <Wallet className="h-4 w-4" />
                    ) : (
                      <CreditCard className="h-4 w-4" />
                    )}
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">{transaction.description}</p>
                    <div className="flex items-center text-xs text-muted-foreground gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      <span>{transaction.date}</span>
                    </div>
                  </div>
                </div>
                
                <span className={`font-jetbrains font-bold ${
                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default WalletPage;
