import React from "react";
import clsx from "clsx";
import { CreditCard, ShoppingCart, Truck } from "lucide-react";

const steps = [
  { id: 1, title: "سبد خرید", icon: <ShoppingCart size={24} /> },
  { id: 2, title: "جزئیات پرداخت", icon: <Truck size={24} /> },
  { id: 3, title: "تکمیل سفارش", icon: <CreditCard size={24} /> },
];

const Stepper = ({ currentStep }) => {
  const progressPercent = Math.max(
    ((currentStep - 1) / (steps.length - 1)) * 100,
    20
  );

  return (
    <div className="relative flex flex-row-reverse items-center justify-between w-full max-w-2xl mx-auto mb-12">
      <div className="absolute top-1/2 right-0 left-0 h-1 bg-gray-300 z-0"></div>

      <div
        className="absolute top-1/2 right-0 h-1 bg-[#00A693] z-10 transition-all duration-300"
        style={{ width: `${progressPercent}%` }}
      ></div>

      {steps.map((step) => (
        <div key={step.id} className="relative flex-1 flex justify-center z-20">
          <div
            className={clsx(
              "flex flex-col items-center justify-center text-center transition-all",
              "w-25 h-25 rounded-full border-4 p-4 bg-white",
              currentStep >= step.id
                ? "border-[#44e4d1] text-black"
                : "border-gray-300 text-gray-400"
            )}
          >
            <div className="text-2xl mb-1">{step.icon}</div>
            <span className="text-sm font-semibold">{step.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
