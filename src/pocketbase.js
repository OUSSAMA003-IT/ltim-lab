import PocketBase from "pocketbase";

export const pb = new PocketBase("https://stamp-payment-responses-calculations.trycloudflare.com");
pb.autoCancellation(false);