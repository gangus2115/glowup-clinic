import { type ComponentPropsWithoutRef, type ReactNode } from "react"
import { ArrowRightIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string
  className: string
  background: ReactNode
  Icon: React.ElementType
  description: string
  href: string
  cta: string
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden",
      className
    )}
    style={{
      background: "rgba(10, 10, 15, 0.55)",
      backdropFilter: "blur(18px) saturate(160%)",
      WebkitBackdropFilter: "blur(18px) saturate(160%)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "20px",
      boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.25), 0 8px 32px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.06)"
    }}
    {...props}
  >
    <div>{background}</div>
    <div style={{ padding: "28px 24px", position: "relative", zIndex: 10 }}>
      <div className="pointer-events-none flex transform-gpu flex-col transition-all duration-300 lg:group-hover:-translate-y-10" style={{ gap: "14px" }}>
        <Icon className="h-12 w-12 origin-left transform-gpu transition-all duration-300 ease-in-out group-hover:scale-75" style={{ color: "rgba(255, 255, 255, 0.92)" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.01em", color: "rgba(255, 255, 255, 0.92)", marginBottom: "10px" }}>
            {name}
          </h3>
          <p style={{ fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.65, color: "rgba(255, 255, 255, 0.55)", margin: 0 }}>
            {description}
          </p>
        </div>
      </div>

      <div
        className={cn(
          "pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden"
        )}
      >
        <Button variant="link" size="sm" className="pointer-events-auto p-0" render={<a href={href} />} nativeButton={false}>{cta}<ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" /></Button>
      </div>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
      )}
      style={{ padding: "0 24px 28px" }}
    >
      <Button variant="link" size="sm" className="pointer-events-auto p-0" render={<a href={href} />} nativeButton={false}>{cta}<ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" /></Button>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/3 group-hover:dark:bg-neutral-800/10" />
  </div>
)

export { BentoCard, BentoGrid }
