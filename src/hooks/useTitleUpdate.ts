import { useEffect } from "react";

export default function useTitleUpdate(title: string, description: string, ...dependencies): any {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description)
  }, [...dependencies])
}
