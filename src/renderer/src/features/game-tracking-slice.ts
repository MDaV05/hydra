import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { GameTrackingRecord, GameTrackingStatus } from "@types";

export interface GameTrackingState {
  records: Record<string, GameTrackingStatus>;
}

const initialState: GameTrackingState = {
  records: {},
};

const trackingKey = (shop: string, objectId: string) => `${shop}:${objectId}`;

export const gameTrackingSlice = createSlice({
  name: "gameTracking",
  initialState,
  reducers: {
    setGameTrackingRecords: (
      state,
      action: PayloadAction<GameTrackingRecord[]>
    ) => {
      state.records = action.payload.reduce<Record<string, GameTrackingStatus>>(
        (records, record) => {
          records[trackingKey(record.shop, record.objectId)] = record.status;
          return records;
        },
        {}
      );
    },
    updateGameTrackingStatus: (
      state,
      action: PayloadAction<{
        shop: string;
        objectId: string;
        status: GameTrackingStatus | null;
      }>
    ) => {
      const key = trackingKey(action.payload.shop, action.payload.objectId);

      if (action.payload.status === null) {
        delete state.records[key];
      } else {
        state.records[key] = action.payload.status;
      }
    },
  },
});

export const { setGameTrackingRecords, updateGameTrackingStatus } =
  gameTrackingSlice.actions;
