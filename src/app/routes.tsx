import { createHashRouter } from "react-router";
import { Landing } from "./screens/Landing";
import { Discover } from "./screens/Discover";
import { UnitDetail } from "./screens/UnitDetail";
import { Shortlist } from "./screens/Shortlist";
import { Compare } from "./screens/Compare";
import { AdvisorChat } from "./screens/AdvisorChat";
import { AffordabilityCalculator } from "./screens/AffordabilityCalculator";
import { AppointmentBooking } from "./screens/AppointmentBooking";
import { EOISubmission } from "./screens/EOISubmission";
import { MyProfile } from "./screens/MyProfile";
import { Notifications } from "./screens/Notifications";
import { SitePlan } from "./screens/SitePlan";
import { Documents } from "./screens/Documents";
import { AppLayout } from "./components/AppLayout";

export const router = createHashRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: Landing },
      { path: "discover", Component: Discover },
      { path: "unit/:id", Component: UnitDetail },
      { path: "shortlist", Component: Shortlist },
      { path: "compare", Component: Compare },
      { path: "advisor", Component: AdvisorChat },
      { path: "calculator", Component: AffordabilityCalculator },
      { path: "booking", Component: AppointmentBooking },
      { path: "eoi", Component: EOISubmission },
      { path: "profile", Component: MyProfile },
      { path: "notifications", Component: Notifications },
      { path: "siteplan", Component: SitePlan },
      { path: "documents", Component: Documents },
    ],
  },
]);
