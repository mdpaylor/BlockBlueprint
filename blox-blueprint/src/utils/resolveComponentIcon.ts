import { Box, type LucideIcon } from "lucide-react";

const iconModules = import.meta.glob<string>(
  "../assets/roblox-component-icons/*.png",
  { eager: true, import: "default" }
);

const iconsByType: Record<string, string> = {};
for (const [path, url] of Object.entries(iconModules)) {
  const fileName = path.split("/").pop()!;
  const type = fileName.replace(/\.png$/, "");
  iconsByType[type] = url;
}

export type ComponentIconResult =
  | { kind: "image"; src: string }
  | { kind: "icon"; Icon: LucideIcon };

export function resolveComponentIcon(type: string): ComponentIconResult {
  const src = iconsByType[type];
  if (src) return { kind: "image", src };
  return { kind: "icon", Icon: Box };
}
