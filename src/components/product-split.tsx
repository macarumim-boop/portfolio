import { Icon } from "@/components/icons";

export type ProductCard = { icon: string; title: string; detail: string };

/**
 * The two products at a glance, side by side, right under the summary. Frames
 * the "dual-platform" nature of MyPainPal before the reader hits the details:
 * one app for the patient, one console for the care team.
 */
export function ProductSplit({ products }: { products: ProductCard[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {products.map((p) => (
        <div
          key={p.title}
          className="flex items-start gap-4 rounded-2xl border border-line bg-white p-5"
        >
          <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-accent text-white">
            <Icon name={p.icon} className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-lg leading-tight text-ink">
              {p.title}
            </p>
            <p className="mt-1 text-sm text-muted">{p.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
