export type AssessmentEngineInput = {
  deviceType:
    | "LAPTOP"
    | "SMARTPHONE"
    | "TABLET"
    | "DESKTOP"
    | "GAMING_CONSOLE"
    | "TV"
    | "OTHER";

  condition?:
    | "WORKS_NORMALLY"
    | "WORKS_WITH_PROBLEMS"
    | "BARELY_WORKS"
    | "DOES_NOT_WORK"
    | "PHYSICALLY_DAMAGED";

  userIntent?:
    | "KEEP_USING"
    | "REPAIR"
    | "SELL_OR_DONATE"
    | "RECYCLE"
    | "NOT_SURE";
};

export type AssessmentRecommendation = {
  action:
    | "KEEP_USING"
    | "REPAIR"
    | "REUSE"
    | "SELL_OR_DONATE"
    | "DATA_ERASURE"
    | "RECYCLE"
    | "EVALUATE";

  priority: "LOW" | "MEDIUM" | "HIGH";

  reason: string;

  dataSafetyRequired: boolean;
};

export function generateRecommendation(
  input: AssessmentEngineInput,
): AssessmentRecommendation {
  /*
   * Rule 1:
   * A normally working device should generally continue
   * being used instead of being discarded.
   */
  if (
    input.condition === "WORKS_NORMALLY" &&
    (input.userIntent === "KEEP_USING" ||
      input.userIntent === "NOT_SURE")
  ) {
    return {
      action: "KEEP_USING",
      priority: "LOW",
      reason:
        "The device is working normally, so continuing to use it is currently the most sustainable option.",
      dataSafetyRequired: false,
    };
  }

  /*
   * Rule 2:
   * A device with problems may still have useful life.
   */
  if (
    input.condition === "WORKS_WITH_PROBLEMS" ||
    input.condition === "BARELY_WORKS"
  ) {
    return {
      action: "REPAIR",
      priority: "MEDIUM",
      reason:
        "The device still appears to have potential useful life. Repair should be considered before recycling or replacing it.",
      dataSafetyRequired:
        input.userIntent === "SELL_OR_DONATE" ||
        input.userIntent === "RECYCLE",
    };
  }

  /*
   * Rule 3:
   * Physical damage requires additional evaluation.
   */
  if (input.condition === "PHYSICALLY_DAMAGED") {
    return {
      action: "EVALUATE",
      priority: "HIGH",
      reason:
        "The device has visible physical damage. Its safety, repairability, and remaining useful life should be evaluated before deciding what to do with it.",
      dataSafetyRequired:
        input.userIntent === "SELL_OR_DONATE" ||
        input.userIntent === "RECYCLE",
    };
  }

  /*
   * Rule 4:
   * A non-working device should be evaluated before recycling.
   */
  if (input.condition === "DOES_NOT_WORK") {
    return {
      action: "EVALUATE",
      priority: "HIGH",
      reason:
        "The device is not functioning. Consider whether repair or parts recovery is practical before choosing responsible recycling.",
      dataSafetyRequired:
        input.userIntent === "SELL_OR_DONATE" ||
        input.userIntent === "RECYCLE",
    };
  }

  /*
   * Rule 5:
   * User explicitly wants to repair.
   */
  if (input.userIntent === "REPAIR") {
    return {
      action: "REPAIR",
      priority: "MEDIUM",
      reason:
        "You want to repair the device, and repair is a reasonable first step when the device may still have useful life.",
      dataSafetyRequired: false,
    };
  }

  /*
   * Rule 6:
   * User wants to sell or donate.
   * Data protection becomes important.
   */
  if (input.userIntent === "SELL_OR_DONATE") {
    return {
      action: "DATA_ERASURE",
      priority: "HIGH",
      reason:
        "Before selling or donating an electronic device, personal data should be securely removed.",
      dataSafetyRequired: true,
    };
  }

  /*
   * Rule 7:
   * User explicitly wants recycling.
   */
  if (input.userIntent === "RECYCLE") {
    return {
      action: "DATA_ERASURE",
      priority: "HIGH",
      reason:
        "Before recycling an electronic device that may contain personal information, protect your data first.",
      dataSafetyRequired: true,
    };
  }

  /*
   * Rule 8:
   * Fallback when there isn't enough information.
   */
  return {
    action: "EVALUATE",
    priority: "MEDIUM",
    reason:
      "There is not enough information to make a strong recommendation yet. Further evaluation is needed.",
    dataSafetyRequired: false,
  };
}