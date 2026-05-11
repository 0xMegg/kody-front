// F1 frontend-local route-mode declarations.
// Every F1 UI surface is mock-only: it renders local mock data
// and never imports apiClient, proxyToBackend, fetch, or env helpers.
// `backendDependency` records which backend slice would later bind
// each route; the binding itself remains out of scope for F1.

export type RouteMode = "mock-only" | "contract-first" | "real binding";

export interface F1RouteModeEntry {
  path: string;
  mode: RouteMode;
  backendDependency: string;
  description: string;
}

export const f1RouteModes: F1RouteModeEntry[] = [
  {
    path: "/login",
    mode: "mock-only",
    backendDependency: "S2/S3 Auth Session",
    description: "로그인 화면 — 폼 제출은 로컬 토스트만 표시합니다.",
  },
  {
    path: "/signup",
    mode: "mock-only",
    backendDependency: "S8 Invite/Signup",
    description: "초대 가입 화면 — token 쿼리는 표시 전용입니다.",
  },
  {
    path: "/forgot-password",
    mode: "mock-only",
    backendDependency: "S9 Forgot Password",
    description: "비밀번호 찾기 — 메일 발송은 mock 토스트입니다.",
  },
  {
    path: "/reset-password",
    mode: "mock-only",
    backendDependency: "S9 Reset Password",
    description: "비밀번호 재설정 — token 쿼리는 표시 전용입니다.",
  },
  {
    path: "/profile",
    mode: "mock-only",
    backendDependency: "S7 Profile API",
    description: "내 프로필 — 로컬 mock 사용자 정보를 표시합니다.",
  },
  {
    path: "/admin/users",
    mode: "mock-only",
    backendDependency: "S6 Admin Users, S8 Invite, S10 Logs",
    description: "사용자 관리 — 초대/권한 동작은 로컬 mock입니다.",
  },
  {
    path: "component:TopBarUserMenu",
    mode: "mock-only",
    backendDependency: "S2/S3 Auth Session, S7 Profile API",
    description: "TopBar 사용자 메뉴 — 로컬 mock 사용자와 mock 로그아웃만 표시합니다.",
  },
  {
    path: "component:RoleAwareNavigation",
    mode: "mock-only",
    backendDependency: "S4 RBAC, S6/S7/S10 route permissions",
    description: "역할 기반 내비게이션 — 로컬 mock 역할로 메뉴 노출만 필터링합니다.",
  },
];

export function getF1RouteMode(path: string): F1RouteModeEntry | undefined {
  return f1RouteModes.find((entry) => entry.path === path);
}
