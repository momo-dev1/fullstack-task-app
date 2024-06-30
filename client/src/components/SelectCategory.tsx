"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/data";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";

const SelectCategory = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleReset = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    router.push("/dashboard");
    router.refresh();
  };
  return (
    <form className="flex items-center gap-2">
      <Select
        defaultValue={searchParams.get("category") || ""}
        onValueChange={(category) => {
          const params = new URLSearchParams(searchParams.toString());
          if (category) {
            params.set("category", category);
          } else {
            params.delete("category");
          }

          router.push("/dashboard?" + params.toString());
          router.refresh();
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter By Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category: any) => (
            <SelectItem
              className="capitalize"
              key={category || ""}
              value={category || ""}
            >
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ResetButton onClick={handleReset} />
    </form>
  );
};

export default SelectCategory;

const ResetButton = ({ onClick }: { onClick: () => void }) => (
  <Button variant="secondary" onClick={onClick}>
    Reset
  </Button>
);
