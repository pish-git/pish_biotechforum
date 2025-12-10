"use client";

import { useLayoutEffect } from 'react';

export function usePageTitle(title, description) {
    useLayoutEffect(() => {
        document.title = title;
        document.querySelector('meta[name="description"]').content = description;
    }, [title, description]);
}