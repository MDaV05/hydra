import type { GameTrackingRecord } from "@types";
import { registerEvent } from "../register-event";
import { gameTrackingSublevel } from "@main/level";

const getGameTracking = async (): Promise<GameTrackingRecord[]> => {
  const entries = await gameTrackingSublevel.iterator().all();

  return entries.map(([, record]) => record);
};

registerEvent("getGameTracking", getGameTracking);
