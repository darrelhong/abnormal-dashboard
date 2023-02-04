import { Message } from "../types/message";

const HIGH_SEVERITY_THRESHOLD = 0.7;

export const getHighSeverityCount = (messages: Message[]) => {
  return messages.filter((m) => m.attackScore > HIGH_SEVERITY_THRESHOLD).length;
};

export const getSpamCount = (messages: Message[]) => {
  return messages.filter((m) => m.attackType === "SPAM").length;
};
