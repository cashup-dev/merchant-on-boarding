"use client";

import { z } from "zod";

import { nonEmptyString } from "./shared";

export const picAdminSchema = z.object({
  picName: nonEmptyString,
  picEmail: nonEmptyString,
  picPhone: nonEmptyString,
});
