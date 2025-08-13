"use client";

import { Provider } from "react-redux";
import { store } from "./store"; // Note: lowercase `store` if it's an instance
import { ReactNode } from "react";

interface ProvidersProps {
    children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return <Provider store={store}>{children}</Provider>;
} 