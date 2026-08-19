import { Link } from "@tanstack/react-router";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { authEnabled, signOut } from "@/lib/auth/client";

export function AuthSlot() {
  const { user, isPending } = useCurrentUserState();

  if (isPending) {
    return <div className="size-9 animate-pulse rounded-full bg-ink/8" />;
  }

  if (!user) {
    return (
      <Link
        to="/login"
        className="inline-flex h-9 items-center rounded-full bg-ink px-3.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
      >
        Sign in
      </Link>
    );
  }

  const label = user.displayName ?? user.primaryEmail ?? "Account";

  return (
    <div className="flex items-center gap-2">
      {user.profileImageUrl ? (
        <img
          src={user.profileImageUrl}
          alt=""
          className="size-8 rounded-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
        />
      ) : (
        <span className="grid size-8 place-items-center rounded-full bg-ink/10 font-serif text-sm">
          {label.charAt(0).toUpperCase()}
        </span>
      )}
      <span className="hidden max-w-28 truncate text-sm font-medium sm:inline">
        {label}
      </span>
      {authEnabled && (
        <button
          type="button"
          onClick={() => void signOut()}
          className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
        >
          Sign out
        </button>
      )}
    </div>
  );
}
