import { TargetAndTransition } from "framer-motion";
import { VariantLabels } from "motion-dom";

export type PartialMotionVariants = {
  initial?: TargetAndTransition | VariantLabels | boolean;
  animate?: TargetAndTransition | VariantLabels;
  exit?: TargetAndTransition | VariantLabels;
};
