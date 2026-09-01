import { useTranslation } from "react-i18next";
import { LibrarySelect } from "./library-select";
import type { GameTrackingStatus } from "@types";
import "./tracking-filter.scss";

export type TrackingFilterValue = GameTrackingStatus | "all";

interface TrackingFilterProps {
  value: TrackingFilterValue;
  onStatusChange: (status: TrackingFilterValue) => void;
}

export function TrackingFilter({
  value,
  onStatusChange,
}: Readonly<TrackingFilterProps>) {
  const { t } = useTranslation("library");

  const options = [
    { value: "all", label: t("tracking_all") },
    { value: "playing", label: t("tracking_playing") },
    { value: "finished", label: t("tracking_finished") },
    { value: "dropped", label: t("tracking_dropped") },
    { value: "wishlist", label: t("tracking_wishlist") },
  ];

  return (
    <div className="library-tracking-filter__container">
      <LibrarySelect
        value={value}
        ariaLabel={t("tracking")}
        onChange={(status) => onStatusChange(status as TrackingFilterValue)}
        options={options}
      />
    </div>
  );
}
