"use client";

import { useState } from "react";
import { CreditCard, Smartphone } from "lucide-react";

export default function PaymentGateway() {
  const [loading, setLoading] = useState(false);
  
  // Fake Google Pay / UPI SDK Trigger
  const handlePayment = async (method: "gpay" | "upi" | "card") => {
    setLoading(true);
    try {
      // Setup hypothetical Razorpay or Stripe Payment Intent
      console.log(`Initializing ${method} SDK...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const paymentData = {
        amount: 4999,
        currency: "INR",
        method,
        status: "SUCCESS",
        txnId: `TXN_${Math.random().toString(36).substring(7).toUpperCase()}`
      };
      
      alert(`Payment Successful! Transaction ID: ${paymentData.txnId}`);
    } catch (e) {
      alert(`Payment Failed. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden mt-10 border border-slate-200 dark:border-slate-700">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
        <h2 className="text-xl font-bold mb-1">Professional Certification Upgrade</h2>
        <p className="opacity-80 text-sm">Unlock the Coder Workspace & AI Copilot</p>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100 dark:border-slate-700">
          <span className="text-slate-500 dark:text-slate-400 font-medium">Annual License</span>
          <span className="text-3xl font-bold text-slate-900 dark:text-white">₹4,999</span>
        </div>

        <div className="space-y-4">
          <button 
            disabled={loading}
            onClick={() => handlePayment("upi")}
            className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors group"
          >
            <Smartphone className="text-slate-400 group-hover:text-emerald-500" />
            <div className="text-left">
              <div className="font-semibold text-slate-800 dark:text-slate-200">Pay with UPI</div>
              <div className="text-xs text-slate-500">PhonePe, Google Pay, Paytm, BHIM</div>
            </div>
          </button>

          <button 
            disabled={loading}
            onClick={() => handlePayment("card")}
            className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors group"
          >
            <CreditCard className="text-slate-400 group-hover:text-blue-500" />
            <div className="text-left">
              <div className="font-semibold text-slate-800 dark:text-slate-200">Credit / Debit Card</div>
              <div className="text-xs text-slate-500">Visa, MasterCard, RuPay</div>
            </div>
          </button>
        </div>
        
        {loading && (
          <div className="mt-6 text-center text-sm font-medium animate-pulse text-indigo-500">
            Processing Secure Payment...
          </div>
        )}
      </div>
    </div>
  );
}
