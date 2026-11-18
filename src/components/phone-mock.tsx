"use client";

import { useEffect, useState } from "react";
import { Briefcase, Flame, Printer, Radio } from "lucide-react";

const notifications = [
  { app: "Tidal ESS", Icon: Briefcase, tone: "n-ink", when: "now", title: "Live on App Store & Google Play", body: "HCM & ERP — 30+ modules moved to Clean Architecture + BLoC." },
  { app: "Queue Display", Icon: Radio, tone: "n-accent", when: "4m ago", title: "Hub reconnected", body: "SignalR link restored on its own. Screen kept awake." },
  { app: "StreakUp", Icon: Flame, tone: "n-olive", when: "1h ago", title: "Keep the streak going", body: "3 of 5 habits done today." },
  { app: "Café POS", Icon: Printer, tone: "n-sand", when: "3h ago", title: "Ticket sent to kitchen", body: "ESC/POS over raw TCP — no cloud round-trip." },
];

const timeFmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Africa/Cairo" });
const dateFmt = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "Africa/Cairo" });

export function PhoneMock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(t);
  }, []);

  return (
    <figure className="phone-stage" aria-label="Illustrated phone lock screen with notifications from apps I have built">
      <div className="phone">
        <span className="phone-btn phone-btn-a" aria-hidden="true" />
        <span className="phone-btn phone-btn-b" aria-hidden="true" />
        <span className="phone-btn phone-btn-c" aria-hidden="true" />
        <div className="phone-screen">
          <div className="phone-status" aria-hidden="true">
            <span>{now ? timeFmt.format(now) : "09:41"}</span>
            <span className="phone-island" />
            <span className="phone-glyphs"><i /><i /><i /><b /></span>
          </div>
          <div className="lock-head">
            <p className="lock-date">{now ? dateFmt.format(now) : " "}</p>
            <p className="lock-time" suppressHydrationWarning>{now ? timeFmt.format(now) : "09:41"}</p>
            <p className="lock-place">Cairo</p>
          </div>
          <ul className="notifs">
            {notifications.map(({ app, Icon, tone, when, title, body }, i) => (
              <li key={app} className="notif" style={{ animationDelay: `${0.5 + i * 0.35}s` }}>
                <span className={`notif-icon ${tone}`}><Icon size={15} strokeWidth={2} aria-hidden="true" /></span>
                <div className="notif-text">
                  <p className="notif-top"><span>{app}</span><span>{when}</span></p>
                  <p className="notif-title">{title}</p>
                  <p className="notif-body">{body}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="lock-foot" aria-hidden="true"><span /><span /></div>
          <span className="home-bar" aria-hidden="true" />
        </div>
      </div>
      <figcaption>Live Cairo time · notifications from things I&rsquo;ve shipped</figcaption>
    </figure>
  );
}
