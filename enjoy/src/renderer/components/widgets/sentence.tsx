import { memo } from "react";
import { cn } from "@renderer/lib/utils";

export const Sentence = memo(
  ({ sentence, className }: { sentence: string; className?: string }) => {
    return <span className={cn("break-words align-middle", className)}>{sentence}</span>;
  }
);

Sentence.displayName = "Sentence";
