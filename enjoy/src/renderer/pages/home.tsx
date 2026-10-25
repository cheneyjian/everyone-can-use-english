import { useContext } from "react";
import {
  AppSettingsProviderContext,
  DEV_BYPASS_AUTH_ENABLED,
} from "@renderer/context";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@renderer/components/ui";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRightIcon, BotIcon, HeadphonesIcon, Mic2Icon } from "lucide-react";

export default () => {
  // Re-render when the saved UI language finishes loading
  useTranslation();

  return (
    <div className="w-full relative">
      <AuthorizationStatusBar />
      <div className="max-w-5xl mx-auto px-4 py-10 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <div className="mb-2 text-sm font-medium text-primary">Enjoy</div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {t("homeTitle")}
          </h1>
          <p className="mt-3 text-muted-foreground">{t("homeDescription")}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <HomeAction
            icon={HeadphonesIcon}
            title={t("sidebar.practice")}
            description={t("homePracticeDescription")}
            href="/practice"
          />
          <HomeAction
            icon={BotIcon}
            title={t("sidebar.aiAssistant")}
            description={t("homeAssistantDescription")}
            href="/conversations"
          />
          <HomeAction
            icon={Mic2Icon}
            title={t("sidebar.pronunciationAssessment")}
            description={t("homeAssessmentDescription")}
            href="/pronunciation_assessments"
          />
        </div>
      </div>
    </div>
  );
};
const HomeAction = ({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: typeof HeadphonesIcon;
  title: string;
  description: string;
  href: string;
}) => (
  <Card className="h-full">
    <CardHeader>
      <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-5" />
      </div>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <Button asChild variant="outline">
        <Link to={href}>
          {t("open")}
          <ArrowRightIcon className="ml-2 size-4" />
        </Link>
      </Button>
    </CardContent>
  </Card>
);

const AuthorizationStatusBar = () => {
  const { user, logout } = useContext(AppSettingsProviderContext);
  if (!user || DEV_BYPASS_AUTH_ENABLED) return null;

  if (!user.accessToken) {
    return (
      <div className="bg-destructive text-white py-2 px-4 h-10 flex items-center sticky top-0 z-10">
        <span className="text-sm">{t("authorizationExpired")}</span>
        <Button
          variant="outline"
          size="sm"
          className="ml-2 py-1 px-2 text-xs h-auto w-auto"
          onClick={logout}
        >
          {t("reLogin")}
        </Button>
      </div>
    );
  }

  return null;
};
