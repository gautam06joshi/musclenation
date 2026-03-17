"use client";

import * as React from "react";
import { AnimatePresence, motion, Transition } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Tab {
  title: string;
  icon: LucideIcon;
  href: string;
}

interface Separator {
  type: "separator";
}

export type TabItem = Tab | Separator;

interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
  activeIndex?: number | null;
}

const buttonVariants = {
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.5,
};

export function ExpandableTabs({
  tabs,
  className,
  activeColor = "text-yellow-500",
  activeIndex,
}: ExpandableTabsProps) {
  const [selected, setSelected] = React.useState<number | null>(activeIndex || null);

 const outsideClickRef = React.useRef<HTMLDivElement>(null);

 useOnClickOutside(
  outsideClickRef as React.RefObject<HTMLElement>,
  () => {
    setSelected(activeIndex ?? null);
  }
);

  React.useEffect(() => {
    setSelected(activeIndex ?? null);
  }, [activeIndex]);

  const Separator = () => (
    <div className="mx-1 h-[24px] w-[1px] bg-gray-700" />
  );

  return (
    <div
  ref={outsideClickRef}
  onMouseLeave={() => setSelected(activeIndex ?? null)}
  className={cn(
    "flex items-center gap-2 rounded-2xl border border-neutral-800 bg-black/60 backdrop-blur-xl px-2 py-1 shadow-lg",
    className
  )}
>
      {tabs.map((tab, index) => {
        if ("type" in tab) return <Separator key={index} />;

        const Icon = tab.icon;

        return (
          <motion.a
            href={tab.href}
            key={tab.title}
            variants={buttonVariants}
            animate="animate"
            custom={selected === index}
            transition={transition}
            onClick={() => setSelected(index)}
onMouseEnter={() => setSelected(index)}
            className={cn(
              "group relative flex items-center rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105",
              selected === index
                ? cn("bg-yellow-500/10", activeColor)
                : "text-gray-400 hover:bg-yellow-500/10 hover:text-yellow-400"
            )}
          >
            <Icon
              size={20}
              className="transition-transform duration-300 group-hover:scale-110"
            />

            <AnimatePresence initial={false}>
              {selected === index && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="overflow-hidden"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.a>
        );
      })}
    </div>
  );
}