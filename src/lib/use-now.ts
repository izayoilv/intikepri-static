"use client";

import { useSyncExternalStore } from "react";

let snapshot: Date | null = null;

function subscribe(onStoreChange: () => void): () => void {
  const id = setInterval(() => {
    snapshot = new Date();
    onStoreChange();
  }, 60_000);
  return () => clearInterval(id);
}

function getSnapshot(): Date | null {
  if (!snapshot) snapshot = new Date();
  return snapshot;
}

function getServerSnapshot(): Date | null {
  return null;
}

export function useNow(): Date | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
