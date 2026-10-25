import { Link } from "react-router-dom";
import { t } from "i18next";
import {
  ArrowRightIcon,
  BotIcon,
  HeadphonesIcon,
  Mic2Icon,
  VideoIcon,
} from "lucide-react";
import { MediaAddButton } from "@renderer/components";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@renderer/components/ui";

const PracticeCard = ({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: typeof HeadphonesIcon;
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <Card className="h-full">
    <CardHeader>
      <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-5" />
      </div>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

export default function Practice() {
  return (
    <div className="min-h-full max-w-5xl mx-auto px-4 py-8 lg:px-8">
      <div className="mb-8 max-w-2xl">
        <div className="mb-2 text-sm font-medium text-primary">
          {t("sidebar.practice")}
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">
          {t("practiceTitle")}
        </h1>
        <p className="mt-3 text-muted-foreground">{t("practiceDescription")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <PracticeCard
          icon={HeadphonesIcon}
          title={t("practiceAudioTitle")}
          description={t("practiceAudioDescription")}
        >
          <MediaAddButton
            type="Audio"
            navigateTo={(media) => `/practice/audio/${media.id}`}
          />
        </PracticeCard>

        <PracticeCard
          icon={VideoIcon}
          title={t("practiceVideoTitle")}
          description={t("practiceVideoDescription")}
        >
          <MediaAddButton
            type="Video"
            navigateTo={(media) => `/practice/video/${media.id}`}
          />
        </PracticeCard>

        <PracticeCard
          icon={BotIcon}
          title={t("practiceAssistantTitle")}
          description={t("practiceAssistantDescription")}
        >
          <Button asChild variant="outline">
            <Link to="/conversations">
              {t("openAssistant")}
              <ArrowRightIcon className="ml-2 size-4" />
            </Link>
          </Button>
        </PracticeCard>

        <PracticeCard
          icon={Mic2Icon}
          title={t("practiceAssessmentTitle")}
          description={t("practiceAssessmentDescription")}
        >
          <Button asChild variant="outline">
            <Link to="/pronunciation_assessments/new">
              {t("startAssessment")}
              <ArrowRightIcon className="ml-2 size-4" />
            </Link>
          </Button>
        </PracticeCard>
      </div>
    </div>
  );
}
