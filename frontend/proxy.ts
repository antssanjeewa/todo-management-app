import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login", "/register"];

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const token = request.cookies.get("auth_token")?.value;
	const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));
	const isRoot = pathname === "/";

	if (!token && !isPublic && !isRoot) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (token && (isPublic || isRoot)) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/", "/dashboard/:path*", "/login", "/register"],
};
