import type { Game, GameTrackingRecord } from "@types";

import { db } from "../level";
import { levelKeys } from "./keys";

export const gamesSublevel = db.sublevel<string, Game>(levelKeys.games, {
  valueEncoding: "json",
});

export const gameTrackingSublevel = db.sublevel<string, GameTrackingRecord>(
  levelKeys.gameTracking,
  {
    valueEncoding: "json",
  }
);
