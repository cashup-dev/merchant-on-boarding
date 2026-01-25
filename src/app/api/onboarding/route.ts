import { NextResponse } from "next/server";

type DraftStore = {
  businessEntity: Record<string, unknown> | null;
  meta: Record<string, unknown> | null;
  completedSteps: string[];
};

const draftStore: DraftStore = {
  businessEntity: null,
  meta: null,
  completedSteps: [],
};

const mergeObject = (
  base: Record<string, unknown> | null,
  update: Record<string, unknown>,
): Record<string, unknown> => ({
  ...(base ?? {}),
  ...update,
});

export async function GET() {
  return NextResponse.json({
    success: true,
    status: "DRAFT",
    businessEntity: draftStore.businessEntity,
    meta: draftStore.meta,
    completedSteps: draftStore.completedSteps,
  });
}

export async function PATCH(request: Request) {
  const payload = await request.json();

  const updates: Array<{ businessEntity?: Record<string, unknown>; meta?: Record<string, unknown> }> = [];

  if (payload.merchant?.businessEntity) {
    updates.push({
      businessEntity: payload.merchant.businessEntity,
      meta: payload.merchant.meta,
    });
    draftStore.completedSteps = Array.from(new Set([...draftStore.completedSteps, "merchant"]));
  }
  if (payload.owner?.businessEntity) {
    updates.push({
      businessEntity: payload.owner.businessEntity,
      meta: payload.owner.meta,
    });
    draftStore.completedSteps = Array.from(new Set([...draftStore.completedSteps, "owner"]));
  }
  if (payload.picAdmin?.businessEntity) {
    updates.push({
      businessEntity: payload.picAdmin.businessEntity,
    });
    draftStore.completedSteps = Array.from(new Set([...draftStore.completedSteps, "pic-admin"]));
  }
  if (payload.settlement?.businessEntity) {
    updates.push({
      businessEntity: payload.settlement.businessEntity,
    });
    draftStore.completedSteps = Array.from(new Set([...draftStore.completedSteps, "settlement"]));
  }

  updates.forEach((update) => {
    if (update.businessEntity) {
      draftStore.businessEntity = mergeObject(draftStore.businessEntity, update.businessEntity);
    }
    if (update.meta) {
      draftStore.meta = mergeObject(draftStore.meta, update.meta);
    }
  });

  return NextResponse.json({
    success: true,
    status: "DRAFT",
    businessEntity: draftStore.businessEntity,
    meta: draftStore.meta,
    completedSteps: draftStore.completedSteps,
  });
}
