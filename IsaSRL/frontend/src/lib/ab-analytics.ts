"use client";

import { useEffect } from "react";
import type { LeadVariant } from "@/lib/lead-copy";

type AbEventType = "impression" | "click";

type TrackEventInput = {
  variant: LeadVariant;
  eventType: AbEventType;
  ctaId: string;
  pagePath?: string;
};

type TrackImpressionInput = {
  variant: LeadVariant;
  ctaId: string;
  pagePath?: string;
};

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
}

function normalizePath(pagePath?: string) {
  if (pagePath && pagePath.trim()) {
    return pagePath.trim();
  }

  if (typeof window !== "undefined") {
    return window.location.pathname || "/";
  }

  return "/";
}

function sendAbEvent(input: TrackEventInput) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = {
    variant: input.variant,
    eventType: input.eventType,
    ctaId: input.ctaId,
    pagePath: normalizePath(input.pagePath),
  };

  const endpoint = `${getApiBaseUrl()}/api/analytics/ab/event`;
  const body = JSON.stringify(payload);

  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    const blob = new Blob([body], { type: "application/json" });
    const sent = navigator.sendBeacon(endpoint, blob);

    if (sent) {
      return;
    }
  }

  void fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
    keepalive: true,
  }).catch(() => {
    // Analytics should never block UI interactions.
  });
}

function getImpressionSessionKey(input: TrackImpressionInput) {
  return `isa-ab-impression:${input.variant}:${input.ctaId}:${normalizePath(input.pagePath)}`;
}

export function trackAbClick(input: Omit<TrackEventInput, "eventType">) {
  sendAbEvent({
    ...input,
    eventType: "click",
  });
}

export function useTrackAbImpression(input: TrackImpressionInput) {
  const { variant, ctaId, pagePath } = input;

  useEffect(() => {
    const sessionKey = getImpressionSessionKey({ variant, ctaId, pagePath });

    if (sessionStorage.getItem(sessionKey) === "1") {
      return;
    }

    sessionStorage.setItem(sessionKey, "1");

    sendAbEvent({
      variant,
      eventType: "impression",
      ctaId,
      pagePath,
    });
  }, [variant, ctaId, pagePath]);
}
