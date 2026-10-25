import { createHashRouter } from "react-router-dom";
import { Layout } from "@renderer/components";
import Conversations from "./pages/conversations";
import Conversation from "./pages/conversation";
import ErrorPage from "./pages/error-page";
import Landing from "./pages/landing";
import Audio from "./pages/audio";
import Video from "./pages/video";
import Home from "./pages/home";
import PronunciationAssessmentsIndex from "./pages/pronunciation-assessments/index";
import PronunciationAssessmentsNew from "./pages/pronunciation-assessments/new";
import Practice from "./pages/practice";
import Julebu from "./pages/julebu";
import { ProtectedPage } from "./pages/protected-page";

export default createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/landing", element: <Landing /> },
      {
        index: true,
        element: (
          <ProtectedPage>
            <Home />
          </ProtectedPage>
        ),
      },
      {
        path: "/conversations",
        element: (
          <ProtectedPage>
            <Conversations />
          </ProtectedPage>
        ),
      },
      {
        path: "/conversations/:id",
        element: (
          <ProtectedPage>
            <Conversation />
          </ProtectedPage>
        ),
      },
      {
        path: "/pronunciation_assessments",
        element: (
          <ProtectedPage>
            <PronunciationAssessmentsIndex />
          </ProtectedPage>
        ),
      },
      {
        path: "/pronunciation_assessments/new",
        element: (
          <ProtectedPage>
            <PronunciationAssessmentsNew />
          </ProtectedPage>
        ),
      },
      {
        path: "/julebu",
        element: (
          <ProtectedPage>
            <Julebu />
          </ProtectedPage>
        ),
      },
      {
        path: "/practice",
        element: (
          <ProtectedPage>
            <Practice />
          </ProtectedPage>
        ),
      },
      {
        path: "/practice/audio/:id",
        element: (
          <ProtectedPage>
            <Audio />
          </ProtectedPage>
        ),
      },
      {
        path: "/practice/video/:id",
        element: (
          <ProtectedPage>
            <Video />
          </ProtectedPage>
        ),
      },
    ],
  },
]);
