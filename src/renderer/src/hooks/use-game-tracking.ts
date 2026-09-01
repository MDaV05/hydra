import { useCallback, useEffect } from "react";
import {
  setGameTrackingRecords,
  updateGameTrackingStatus,
} from "@renderer/features";
import { useAppDispatch, useAppSelector } from "./redux";
import type { GameShop, GameTrackingStatus } from "@types";

export function useGameTracking() {
  const dispatch = useAppDispatch();
  const trackingByGame = useAppSelector((state) => state.gameTracking.records);

  useEffect(() => {
    window.electron
      .getGameTracking()
      .then((records) => dispatch(setGameTrackingRecords(records)))
      .catch(() => {});
  }, [dispatch]);

  const getTrackingStatus = useCallback(
    (shop: GameShop, objectId: string): GameTrackingStatus | null =>
      trackingByGame[`${shop}:${objectId}`] ?? null,
    [trackingByGame]
  );

  const setTrackingStatus = useCallback(
    async (
      shop: GameShop,
      objectId: string,
      status: GameTrackingStatus | null
    ) => {
      dispatch(updateGameTrackingStatus({ shop, objectId, status }));

      try {
        await window.electron.setGameTrackingStatus(shop, objectId, status);
      } catch {
        // Revert the optimistic update if persisting locally failed
        dispatch(updateGameTrackingStatus({ shop, objectId, status: null }));
      }
    },
    [dispatch]
  );

  return { trackingByGame, getTrackingStatus, setTrackingStatus };
}
