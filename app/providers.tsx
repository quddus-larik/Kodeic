"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "./providers/theme-provider";
import {
  TooltipProvider
} from "@/components/ui/tooltip";
import { CoreUI } from "@/layouts/core-ui";
import { Toaster } from "@/components/ui/toaster";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <CoreUI>
          {children}
          <Toaster />
        </CoreUI>
      </TooltipProvider>
    </ThemeProvider>
  );
}
