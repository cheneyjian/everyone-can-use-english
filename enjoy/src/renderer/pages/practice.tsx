import { useState } from "react";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import {
  AudiosComponent,
  VideosComponent,
  RecordingStats,
  RecordingCalendar,
  RecordingActivities,
} from "@renderer/components";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@renderer/components/ui";
import dayjs from "@renderer/lib/dayjs";

export default function Practice() {
  // Re-render when the saved UI language finishes loading
  useTranslation();

  const [range, setRange] = useState<[string, string]>([
    dayjs().subtract(7, "day").format(),
    dayjs().format(),
  ]);

  return (
    <div className="min-h-full max-w-screen-xl mx-auto px-4 py-8 lg:px-8">
      <div className="mb-6 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          {t("practiceTitle")}
        </h1>
        <p className="mt-3 text-muted-foreground">{t("practiceDescription")}</p>
      </div>

      <div className="mb-8">
        <RecordingStats />
      </div>

      <Tabs defaultValue="library">
        <TabsList className="mb-4">
          <TabsTrigger value="library">{t("practiceLibrary")}</TabsTrigger>
          <TabsTrigger value="history">{t("practiceHistory")}</TabsTrigger>
        </TabsList>

        <TabsContent value="library">
          <Tabs defaultValue="audios">
            <TabsList className="mb-4">
              <TabsTrigger value="audios">{t("sidebar.audios")}</TabsTrigger>
              <TabsTrigger value="videos">{t("sidebar.videos")}</TabsTrigger>
            </TabsList>
            <TabsContent value="audios">
              <AudiosComponent />
            </TabsContent>
            <TabsContent value="videos">
              <VideosComponent />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="history">
          <div className="mb-8">
            <RecordingCalendar
              onSelectRange={(from, to) => setRange([from, to])}
            />
          </div>
          <RecordingActivities from={range[0]} to={range[1]} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
