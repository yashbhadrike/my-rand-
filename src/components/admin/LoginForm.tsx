"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions";
import { buttonClass } from "../ui";
import { inputClass } from "./fields";

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="mt-6 space-y-4">
      <input type="hidden" name="next" value={next} />
      <label className="block">
        <span className="text-[13px] font-medium">Password</span>
        <input name="password" type="password" required autoFocus autoComplete="current-password" className={inputClass} />
      </label>
      {state?.error && <p className="text-sm text-rouge" role="alert">{state.error}</p>}
      <button disabled={pending} className={buttonClass({}, "w-full")}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
