"use client";

import { useState, useEffect, useCallback } from "react";
import { supabaseClient } from "@/lib/supabaseClient";
import type { User, Session } from "@supabase/supabase-js";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  session: Session | null;
  isLoading: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    session: null,
    isLoading: true,
  });

  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setState({
        isAuthenticated: !!session,
        user: session?.user ?? null,
        session,
        isLoading: false,
      });
    });

    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setState({
        isAuthenticated: !!session,
        user: session?.user ?? null,
        session,
        isLoading: false,
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const { error } = await supabaseClient.auth.signUp({ email, password });
    if (error) throw error;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
  }, []);

  return { ...state, signUp, signIn, signOut };
}
