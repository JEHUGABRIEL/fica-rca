"use client";

import { useSyncExternalStore } from "react";

const sAbonner = () => () => {};

/* L'année est lue uniquement dans le navigateur : avec Cache Components,
   `new Date()` est interdit pendant le prérendu, même côté client. */
export function AnneeCourante() {
  const annee = useSyncExternalStore(
    sAbonner,
    () => new Date().getFullYear(),
    () => null,
  );
  return annee === null ? null : <>{annee} </>;
}
