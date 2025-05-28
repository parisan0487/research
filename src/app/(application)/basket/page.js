import BasketComp from "@/component/layout/basket/Basket";
import Stepper from "@/component/ui/Stepper";

export default function BasketPage() {
  return (
    <div className="p-10">
      <Stepper currentStep={1} />
      <BasketComp />
    </div>
  );
}
