import {
  useParams,
  useSearchParams,
  Link,
  useNavigate,
} from "react-router-dom";
import { VideoPlayer } from "@renderer/components";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@renderer/components/ui";
import { t } from "i18next";
import { MediaShadowProvider } from "@renderer/context";
import { useState } from "react";

export default () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const segmentIndex = searchParams.get("segmentIndex") || "0";
  const [video, setVideo] = useState<VideoType | null>(null);
  const navigate = useNavigate();

  return (
    <div className="h-content flex flex-col relative">
      <Breadcrumb className="px-4 pt-3 pb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/practice`}>{t("sidebar.practice")}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {video?.name || t("shadowingVideo")}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex-1">
          <MediaShadowProvider onCancel={() => navigate("/practice")}>
          <VideoPlayer
            id={id}
            segmentIndex={parseInt(segmentIndex)}
            onLoad={setVideo}
          />
        </MediaShadowProvider>
      </div>
    </div>
  );
};
