"use client"

import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { toast } from "sonner";
import { FormPicker } from "./form-picker";
import { ElementRef, useRef, useState } from "react";
import { useRouter } from "next/navigation";


interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export const FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}: FormPopoverProps) => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const closeRef = useRef<ElementRef<"button">>(null); 
  const router = useRouter();
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board Created");
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const images = selectedImage; 
    execute({ title, images });
    console.log({ title, images });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className="w-80 pt-3"
      >
        <div className="text-sm font-medium text-center text-neutral-700 pb-4">
          Create Board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto absolute p-2 top-2 right-2 text-neutral-700"
            variant="ghost"
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent the default form submission
            const formData = new FormData(e.currentTarget);
            onSubmit(formData);
          }}
          className="space-y-2"
        >
          <div className="space-y-2">
            <FormPicker
              id="image"
              errors={fieldErrors}
              onChange={setSelectedImage} 
            />
            <FormInput
              id="title"
              label="Board title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
