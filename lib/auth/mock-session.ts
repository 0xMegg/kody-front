// F1 mock current-user session helpers.
// This module is intentionally local and demo-only:
// it does NOT read cookies, localStorage, env, or call any backend.
// Real session wiring will arrive in a later explicit slice that
// binds to S2/S3 auth and S7 profile.

export type Role =
  | "ADMIN"
  | "FINANCE"
  | "SALES"
  | "LOGISTICS"
  | "INVENTORY";

export type AccountStatus = "ACTIVE" | "INVITED" | "DISABLED";

export interface MockUser {
  id: string;
  email: string;
  displayName: string;
  employeeName: string;
  department: string;
  phone: string;
  roles: Role[];
  status: AccountStatus;
}

export const mockCurrentUser: MockUser = {
  id: "u_mock_001",
  email: "demo.admin@kody.local",
  displayName: "데모 관리자",
  employeeName: "정민수",
  department: "경영관리",
  phone: "010-1234-5678",
  roles: ["ADMIN", "FINANCE"],
  status: "ACTIVE",
};

export function hasAnyRole(user: MockUser, roles: Role[]): boolean {
  if (roles.length === 0) return true;
  return user.roles.some((r) => roles.includes(r));
}

export function canSeeAdminUsers(user: MockUser): boolean {
  return hasAnyRole(user, ["ADMIN", "FINANCE"]);
}

export function getInitials(user: MockUser): string {
  const source = user.displayName || user.employeeName || user.email;
  if (!source) return "U";
  const trimmed = source.trim();
  if (!trimmed) return "U";
  // For Korean names take the first 2 characters; otherwise use
  // initials from up to two words.
  const koreanMatch = trimmed.match(/[가-힣]/);
  if (koreanMatch) {
    return trimmed.replace(/\s+/g, "").slice(0, 2);
  }
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export const roleLabels: Record<Role, string> = {
  ADMIN: "관리자",
  FINANCE: "경영관리",
  SALES: "영업",
  LOGISTICS: "물류",
  INVENTORY: "재고",
};

export const accountStatusLabels: Record<AccountStatus, string> = {
  ACTIVE: "활성",
  INVITED: "초대 대기",
  DISABLED: "비활성",
};
