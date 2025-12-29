"use client";

import { useState } from "react";
import { CategoryBasicForm } from "./category-basic-form";
import { VariantBuilder } from "./variant-builder";
import { SubmitBar } from "./submit-bar";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Variant } from "../types";

export function CategoryWizard() {
  const [step, setStep] = useState(1);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleBasicFormSubmit = (id: number) => {
    setCategoryId(id);
    setStep(2);
  };

  const handlePublish = () => {
    startTransition(() => {
      toast.success("Category created successfully!");
      router.push("/admin/categories");
    });
  };

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <div className={`flex flex-col items-center ${step === 1 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              1
            </div>
            <div className="mt-2 text-sm font-medium">Basic Info</div>
          </div>
          <div className={`w-16 h-0.5 mx-2 ${step > 1 ? 'bg-primary' : 'bg-muted'}`}></div>
          <div className={`flex flex-col items-center ${step === 2 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              2
            </div>
            <div className="mt-2 text-sm font-medium">Variants</div>
          </div>
        </div>
      </div>

      {step === 1 ? (
        <CategoryBasicForm onSubmit={handleBasicFormSubmit} />
      ) : (
        categoryId !== null && (
          <>
            <VariantBuilder 
              categoryId={categoryId} 
              initialVariants={variants} 
            />
            <SubmitBar 
              isPending={isPending} 
              onSubmit={handlePublish} 
            />
          </>
        )
      )}
    </div>
  );
}