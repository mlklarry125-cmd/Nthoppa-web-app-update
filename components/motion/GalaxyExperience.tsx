"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";

const realms = [
  { id: "offerings", label: "Money Realm" },
  { id: "partners", label: "Alliance Realm" },
  { id: "banking", label: "Marketplace Realm" },
  { id: "credit", label: "Credit Realm" },
  { id: "sme-pipeline", label: "Growth Realm" },
  { id: "incubator", label: "Founder Realm" },
];

type PortalState = {
  active: boolean;
  label: string;
};

function createClickBurst(x: number, y: number) {
  const layer = document.getElementById("galaxy-click-layer");
  if (!layer) return;

  const burst = document.createElement("span");
  burst.className = "galaxy-click-burst";
  burst.style.left = `${x}px`;
  burst.style.top = `${y}px`;

  for (let index = 0; index < 8; index += 1) {
    const spark = document.createElement("i");
    spark.style.setProperty("--spark-angle", `${index * 45}deg`);
    spark.style.setProperty("--spark-distance", `${30 + (index % 3) * 10}px`);
    burst.appendChild(spark);
  }

  layer.appendChild(burst);
  window.setTimeout(() => burst.remove(), 850);
}

export function GalaxyExperience() {
  const pathname = usePathname();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [portal, setPortal] = useState<PortalState>({ active: false, label: "Nthoppa Galaxy" });
  const travelTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const isHome = pathname === "/";

  const stars = useMemo(
    () =>
      Array.from({ length: 42 }, (_, index) => ({
        left: `${(index * 37) % 100}%`,
        top: `${(index * 61) % 100}%`,
        delay: `${(index % 9) * 0.37}s`,
        duration: `${3.2 + (index % 7) * 0.55}s`,
        size: `${1 + (index % 3)}px`,
      })),
    [],
  );

  const clearTimers = useCallback(() => {
    if (travelTimer.current) window.clearTimeout(travelTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  }, []);

  const enterPortal = useCallback(
    (label: string, action: () => void) => {
      clearTimers();

      if (reduceMotion) {
        action();
        return;
      }

      setPortal({ active: true, label });
      travelTimer.current = window.setTimeout(action, 460);
      closeTimer.current = window.setTimeout(
        () => setPortal((current) => ({ ...current, active: false })),
        980,
      );
    },
    [clearTimers, reduceMotion],
  );

  const travelToRealm = useCallback(
    (realmId: string, label: string) => {
      const destination = document.getElementById(realmId);
      if (!destination) return;

      enterPortal(label, () => {
        destination.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        window.history.replaceState(null, "", `#${realmId}`);
      });
    },
    [enterPortal, reduceMotion],
  );

  useEffect(() => {
    document.body.classList.add("nthoppa-galaxy");
    document.body.classList.toggle("nthoppa-galaxy-home", isHome);

    return () => {
      document.body.classList.remove("nthoppa-galaxy", "nthoppa-galaxy-home");
    };
  }, [isHome]);

  useEffect(() => {
    const updatePointer = (event: PointerEvent) => {
      const x = event.clientX / Math.max(window.innerWidth, 1);
      const y = event.clientY / Math.max(window.innerHeight, 1);
      document.documentElement.style.setProperty("--galaxy-x", x.toFixed(4));
      document.documentElement.style.setProperty("--galaxy-y", y.toFixed(4));
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    const handleClick = (event: MouseEvent) => {
      createClickBurst(event.clientX, event.clientY);

      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref || rawHref.startsWith("mailto:") || rawHref.startsWith("tel:") || rawHref.startsWith("javascript:")) {
        return;
      }

      const label = anchor.dataset.realmName || anchor.textContent?.trim() || "New Realm";

      if (rawHref.startsWith("#")) {
        const id = rawHref.slice(1);
        const destination = document.getElementById(id);
        if (!destination) return;

        event.preventDefault();
        travelToRealm(id, label);
        return;
      }

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;

      event.preventDefault();
      enterPortal(label, () => router.push(`${destination.pathname}${destination.search}${destination.hash}`));
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    document.addEventListener("click", handleClick, true);

    return () => {
      window.removeEventListener("pointermove", updatePointer);
      document.removeEventListener("click", handleClick, true);
    };
  }, [enterPortal, router, travelToRealm]);

  useEffect(() => {
    const reveal = () => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>("main section, main article, footer"));
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("galaxy-visible");
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );

      nodes.forEach((node, index) => {
        node.classList.add("galaxy-reveal");
        node.style.setProperty("--realm-index", String(index));
        observer.observe(node);
      });

      return observer;
    };

    const observer = reveal();
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  return (
    <>
      <div id="galaxy-click-layer" className="galaxy-click-layer" aria-hidden="true" />
      <div className="galaxy-cursor-aura" aria-hidden="true" />

      {isHome && (
        <>
          <div className="galaxy-starfield" aria-hidden="true">
            {stars.map((star, index) => (
              <span
                key={index}
                style={{
                  left: star.left,
                  top: star.top,
                  width: star.size,
                  height: star.size,
                  animationDelay: star.delay,
                  animationDuration: star.duration,
                }}
              />
            ))}
          </div>

          <div className="galaxy-home-coin" aria-hidden="true">
            <div className="galaxy-home-coin__edge" />
            <div className="galaxy-home-coin__face">
              <span>N</span>
            </div>
          </div>

          <aside className="galaxy-realm-dock" aria-label="Explore Nthoppa realms">
            <span className="galaxy-realm-dock__title">REALMS</span>
            {realms.map((realm, index) => (
              <button
                key={realm.id}
                type="button"
                onClick={() => travelToRealm(realm.id, realm.label)}
                aria-label={`Enter ${realm.label}`}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{realm.label}</strong>
              </button>
            ))}
          </aside>
        </>
      )}

      <div className={`galaxy-gate ${portal.active ? "galaxy-gate--active" : ""}`} aria-hidden={!portal.active}>
        <div className="galaxy-gate__stars" />
        <div className="galaxy-gate__ring galaxy-gate__ring--one" />
        <div className="galaxy-gate__ring galaxy-gate__ring--two" />
        <div className="galaxy-gate__ring galaxy-gate__ring--three" />
        <div className="galaxy-gate__core">
          <span>ENTERING</span>
          <strong>{portal.label}</strong>
        </div>
      </div>
    </>
  );
}
