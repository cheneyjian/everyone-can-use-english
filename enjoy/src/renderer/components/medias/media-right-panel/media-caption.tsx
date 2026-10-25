import { useContext } from "react";
import { AppSettingsProviderContext } from "@renderer/context";
import { convertWordIpaToNormal } from "@/utils";
import { TimelineEntry } from "echogarden/dist/utilities/Timeline.d.js";

export const MediaCaption = (props: {
  caption: TimelineEntry;
  language?: string;
  selectedIndices?: number[];
  currentSegmentIndex: number;
  activeIndex?: number;
  displayIpa?: boolean;
  onClick?: (index: number) => void;
}) => {
  const { learningLanguage, ipaMappings } = useContext(
    AppSettingsProviderContext
  );
  const {
    caption,
    selectedIndices = [],
    currentSegmentIndex,
    activeIndex,
    displayIpa,
    onClick,
  } = props;
  const language = props.language || learningLanguage;

  let words = caption.text
    .replace(/ ([.,!?:;])/g, "$1")
    .replace(/ (['"")])/g, "$1")
    .replace(/ \.\.\./g, "...")
    .split(/([—]|\s+)/g)
    .filter((word) => word.trim() !== "" && word !== "—");

  const ipas = caption.timeline.map((w) =>
    w.timeline?.map((t) =>
      t.timeline && language.startsWith("en")
        ? convertWordIpaToNormal(
            t.timeline.map((s) => s.text),
            { mappings: ipaMappings }
          ).join("")
        : t.text
    )
  );

  if (words.length !== caption.timeline.length) {
    words = caption.timeline.map((w) => w.text);
  }

  return (
    <div className="flex flex-wrap px-4 py-2 bg-muted/50">
      {/* use the words splitted by caption text if it is matched with the timeline length, otherwise use the timeline */}
      {words.map((word, index) => (
        <div
          className=""
          key={`word-${currentSegmentIndex}-${index}`}
          id={`word-${currentSegmentIndex}-${index}`}
        >
          <div
            className={`font-serif xl:text-lg 2xl:text-xl px-1 ${
              onClick && "hover:bg-red-500/10 cursor-pointer"
            } ${index === activeIndex ? "text-red-500" : ""} ${
              selectedIndices.includes(index) ? "bg-red-500/10 selected" : ""
            }`}
            onClick={() => onClick && onClick(index)}
          >
            {word}
          </div>

          {displayIpa && (
            <div
              className={`select-text text-sm 2xl:text-base text-muted-foreground font-code px-1 ${
                index === 0 ? "before:content-['/']" : ""
              } ${
                index === caption.timeline.length - 1
                  ? "after:content-['/']"
                  : ""
              }`}
            >
              {ipas[index]}
            </div>
          )}

        </div>
      ))}
    </div>
  );
};
