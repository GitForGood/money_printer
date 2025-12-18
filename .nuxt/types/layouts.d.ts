import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "auth" | "default" | "three-column"
declare module 'nuxt/app' {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}