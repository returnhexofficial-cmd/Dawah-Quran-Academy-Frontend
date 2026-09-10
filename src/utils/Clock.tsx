"use client"

import { useEffect, useRef, useState } from "react";
import { LuClock, LuX } from "react-icons/lu";


interface Timings {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface PrayerData {
  timings: Timings;
  readableDate: string;
  hijriMonth: string;
  hijriYear: string;
  dateKey: string;
}

const PRAYER_KEYS: (keyof Timings)[] = [
  "Fajr",
  "Dhuhr",
  "Asr",
  "Maghrib",
  "Isha",
];

const BANGLA_NAMES: Record<keyof Timings, string> = {
  Fajr: "ফজর",
  Dhuhr: "যোহর",
  Asr: "আসর",
  Maghrib: "মাগরিব",
  Isha: "ইশা",
};

// Dhaka. The Aladhan `timingsByCity` endpoint geocodes "Dhaka" to junk
// coordinates, so always ask by latitude/longitude instead.
const LATITUDE = 23.8103;
const LONGITUDE = 90.4125;
const TIME_ZONE = "Asia/Dhaka";
// method 1 = University of Islamic Sciences, Karachi (Fajr 18°, Isha 18°) —
// the convention Islamic Foundation Bangladesh follows.
// school 1 = Hanafi Asr (shadow ratio 2).
const METHOD = 1;
const SCHOOL = 1;

/** "16:24", "16:24 (+06)" and "16:24 (BST)" all parse. */
function parseTime(time: string) {
  const match = time.match(/(\d{1,2}):(\d{2})/);
  if (!match) return null;
  return { h: Number(match[1]) % 24, m: Number(match[2]) };
}

function toAmPm(time: string) {
  const parsed = parseTime(time);
  if (!parsed) return time;
  const ampm = parsed.h >= 12 ? "PM" : "AM";
  const h12 = parsed.h % 12 || 12;
  return `${h12}:${String(parsed.m).padStart(2, "0")} ${ampm}`;
}

function toMinutes(time: string) {
  const parsed = parseTime(time);
  return parsed ? parsed.h * 60 + parsed.m : null;
}

/**
 * Prayer times are for Dhaka, so "now" has to be Dhaka's clock too —
 * otherwise a visitor abroad sees the wrong prayer highlighted.
 */
function dhakaNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const get = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "00";

  return {
    dd: get("day"),
    mm: get("month"),
    yyyy: get("year"),
    minutes: (Number(get("hour")) % 24) * 60 + Number(get("minute")),
  };
}

function getCurrentPrayer(timings: Timings, now: number): keyof Timings | null {
  let cur: keyof Timings | null = null;
  for (const k of PRAYER_KEYS) {
    const mins = toMinutes(timings[k]);
    if (mins !== null && mins <= now) cur = k;
  }
  // Before Fajr we are still inside last night's Isha.
  return cur ?? "Isha";
}

function getNextPrayer(timings: Timings, now: number) {
  for (const k of PRAYER_KEYS) {
    const mins = toMinutes(timings[k]);
    if (mins !== null && mins > now)
      return { name: BANGLA_NAMES[k], time: toAmPm(timings[k]) };
  }
  return { name: BANGLA_NAMES["Fajr"], time: toAmPm(timings["Fajr"]) };
}

function PrayerWidget() {
  const [data, setData] = useState<PrayerData | null>(null);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false); // controls animation state
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(() => dhakaNow().minutes);
  const ref = useRef<HTMLDivElement>(null);
  const requestedKey = useRef<string | null>(null);

  const handleOpen = () => {
    setOpen(true);
    requestAnimationFrame(() => setVisible(true));
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setOpen(false), 300);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handleClose();
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTimes = async (dd: string, mm: string, yyyy: string) => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}` +
            `?latitude=${LATITUDE}&longitude=${LONGITUDE}` +
            `&method=${METHOD}&school=${SCHOOL}` +
            `&timezonestring=${encodeURIComponent(TIME_ZONE)}`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error(`Aladhan responded ${res.status}`);
        const json = await res.json();
        const t = json.data.timings;
        const d = json.data.date;
        setData({
          timings: {
            Fajr: t.Fajr,
            Dhuhr: t.Dhuhr,
            Asr: t.Asr,
            Maghrib: t.Maghrib,
            Isha: t.Isha,
          },
          readableDate: d.readable,
          hijriMonth: d.hijri.month.en,
          hijriYear: d.hijri.year,
          dateKey: `${dd}-${mm}-${yyyy}`,
        });
      } catch {
        if (controller.signal.aborted) return;
        // Let the next tick retry instead of leaving the widget stuck empty.
        requestedKey.current = null;
        setData(null);
      } finally {
        // An aborted request has been superseded; whoever replaced it owns
        // the loading flag now.
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    const tick = () => {
      const { dd, mm, yyyy, minutes } = dhakaNow();
      setNow(minutes);
      // Pull a fresh schedule on first run and whenever the Dhaka date rolls over.
      const key = `${dd}-${mm}-${yyyy}`;
      if (requestedKey.current !== key) {
        requestedKey.current = key;
        fetchTimes(dd, mm, yyyy);
      }
    };

    tick();
    const id = setInterval(tick, 30_000);
    return () => {
      clearInterval(id);
      controller.abort();
      // The in-flight request is being killed, so drop the bookkeeping that
      // says it was already asked for — otherwise a re-run of this effect
      // (React StrictMode does exactly that in dev, and refs survive it)
      // would skip the refetch and leave the widget with no data.
      requestedKey.current = null;
    };
  }, []);

  const currentPrayer = data ? getCurrentPrayer(data.timings, now) : null;
  const nextPrayer = data ? getNextPrayer(data.timings, now) : null;

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex items-center gap-2 bg-[#ffd54f] hover:bg-primary text-white duration-300 font-semibold text-sm px-5 py-3 rounded-t-xl transition-colors"
      >
        <LuClock size={16} />
        নামাজের সময়
      </button>

      {open && (
        <div
          className={`fixed inset-0 z-[999] flex items-center justify-center px-4 transition-all duration-300 ease-out ${
            visible
              ? "bg-black/50 backdrop-blur-sm opacity-100"
              : "bg-black/0 backdrop-blur-0 opacity-0"
          }`}
        >
          <div
            ref={ref}
            className={`relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ease-out ${
              visible
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-4"
            }`}
          >
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 text-gray-500 hover:text-primary transition-colors duration-200"
            >
              <LuX size={18} />
            </button>

            {loading ? (
              <div className="p-10 text-center text-sm text-gray-400">
                লোড হচ্ছে...
              </div>
            ) : data ? (
              <>
                <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-50">
                  <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-xl">
                    🕌
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary">
                      নামাজের সময়সূচি
                    </p>
                    <p className="text-xs text-gray-400">
                      {data.readableDate} • {data.hijriMonth} {data.hijriYear}{" "}
                      AH
                    </p>
                  </div>
                </div>

                <div className="px-6 py-3">
                  {PRAYER_KEYS.map((key) => {
                    const isActive = key === currentPrayer;
                    return (
                      <div
                        key={key}
                        className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0"
                      >
                        <span
                          className={`text-sm font-medium ${
                            isActive
                              ? "text-amber-500 font-bold"
                              : "text-gray-700"
                          }`}
                        >
                          {BANGLA_NAMES[key]}
                        </span>
                        <span
                          className={`text-sm font-semibold px-3 py-1 rounded-full ${
                            isActive
                              ? "bg-amber-50 text-amber-500"
                              : "bg-slate-50 text-primary"
                          }`}
                        >
                          {toAmPm(data.timings[key])}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {nextPrayer && (
                  <div className="mx-5 mb-5 bg-amber-400 rounded-xl px-4 py-3 flex justify-between items-center">
                    <span className="text-xs text-amber-900 font-semibold">
                      পরবর্তী নামাজ
                    </span>
                    <span className="text-sm text-amber-900 font-bold">
                      {nextPrayer.name} — {nextPrayer.time}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="p-10 text-center text-sm text-red-400">
                তথ্য লোড করা যায়নি।
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}


export default PrayerWidget;