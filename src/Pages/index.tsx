// react router dom v6 init
import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import LocalizationServices from "./Localization";
import PageWrapper from "@/Core/PageDesign";
import { ChatView } from "./Chat/view";
import Page from "@/Core/Page";
import { Typography } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PageWrapper>
        <Page
          sx={{ textAlign: "center", justifyContent: "center", gap: 4, p: 4 }}
        >
          <img src="/mudi.png" alt="mudi" />
          <Typography variant="h3">
            Welcome to Mudi the naughty dog's playground
          </Typography>
        </Page>
      </PageWrapper>
    ),
  },
  {
    path: "localization",
    element: (
      <PageWrapper>
        <LocalizationServices />
      </PageWrapper>
    ),
  },
  {
    path: "chat",
    element: (
      <PageWrapper>
        <ChatView />
      </PageWrapper>
    ),
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
