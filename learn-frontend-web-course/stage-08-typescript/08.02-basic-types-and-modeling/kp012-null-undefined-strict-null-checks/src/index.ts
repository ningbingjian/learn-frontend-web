export interface RawProfileDto {
  id: string;
  displayName: string | null;
  nickname?: string | null;
  avatarUrl: string | null;
  lastLoginAt?: string | null;
}

export interface Profile {
  id: string;
  displayName: string;
  nickname?: string;
  avatarUrl?: string;
  lastLoginAt?: Date;
}

function presentString(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function normalizeProfile(dto: RawProfileDto): Profile {
  const nickname = presentString(dto.nickname);
  const avatarUrl = presentString(dto.avatarUrl);
  const lastLoginAt = dto.lastLoginAt == null ? undefined : new Date(dto.lastLoginAt);

  return {
    id: dto.id,
    displayName: presentString(dto.displayName) ?? `用户-${dto.id}`,
    ...(nickname === undefined ? {} : { nickname }),
    ...(avatarUrl === undefined ? {} : { avatarUrl }),
    ...(lastLoginAt === undefined ? {} : { lastLoginAt })
  };
}

export function displayLabel(profile: Profile): string {
  return profile.nickname ?? profile.displayName;
}

export function fallbackWithNullish(value: string | null | undefined): string {
  return value ?? "fallback";
}

export function fallbackWithOr(value: string | null | undefined): string {
  return value || "fallback";
}

const profile = normalizeProfile({
  id: "USER-1",
  displayName: null,
  nickname: null,
  avatarUrl: null,
  lastLoginAt: "2026-09-01T10:00:00.000Z"
});

console.log("NULLABILITY");
console.log(`profile=${profile.id}:${displayLabel(profile)}`);
console.log(`avatar=${profile.avatarUrl ?? "missing"}`);
console.log(`nullishEmpty=${fallbackWithNullish("")}`);
console.log(`orEmpty=${fallbackWithOr("")}`);
console.log(`lastLogin=${profile.lastLoginAt?.toISOString().slice(0, 10) ?? "missing"}`);
