import { registerEvent } from "../register-event";
import { gameTrackingSublevel, levelKeys } from "@main/level";
import type { GameShop, GameTrackingStatus } from "@types";

const setGameTrackingStatus = async (
  _event: Electron.IpcMainInvokeEvent,
  shop: GameShop,
  objectId: string,
  status: GameTrackingStatus | null
) => {
  const trackingKey = levelKeys.gameTrackingItem(shop, objectId);

  try {
    if (status === null) {
      await gameTrackingSublevel.del(trackingKey);
    } else {
      await gameTrackingSublevel.put(trackingKey, {
        shop,
        objectId,
        status,
        updatedAt: Date.now(),
      });
    }
  } catch (error) {
    throw new Error(`Failed to set game tracking status: ${error}`);
  }
};

registerEvent("setGameTrackingStatus", setGameTrackingStatus);
