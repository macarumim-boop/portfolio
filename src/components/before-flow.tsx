/**
 * "Before" exhibit for the Veevart Donation case, the legacy payment step,
 * captured from the old production flow and framed full width in a browser
 * window so it reads clearly, with the friction that drove the 75% drop-off
 * called out beneath it.
 */
export function BeforeFlow() {
  const friction = [
    "Nine personal-info fields, name, phone, full mailing address, and country.",
    "All of it demanded before the card fields even appear.",
    "Then card details, then an hCaptcha, one last wall before Donate.",
    "A dated, generic layout with no sense of the cause behind the gift.",
  ];

  return (
    <div>
      {/* Legacy screen in a full-width browser frame */}
      <figure className="overflow-hidden rounded-[16px] border border-line shadow-[0_12px_48px_rgba(0,0,0,0.10)]">
        <div className="flex items-center gap-2 border-b border-line bg-paper-2 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <div className="ml-3 flex-1">
            <div className="mx-auto max-w-md truncate rounded-md border border-line bg-white px-3 py-1.5 text-center text-xs text-muted">
              veevartdevstage.donation.veevartapp.com
            </div>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/work/veevart-donation/before-payment.png"
          alt="The legacy Veevart donation payment step: a long personal-information form, card fields, and a captcha, all before a gift could be made."
          className="w-full"
        />
      </figure>

      {/* Friction, beneath the exhibit */}
      <div className="mt-8 grid gap-6 sm:grid-cols-12 sm:gap-8">
        <div className="sm:col-span-4">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">
            The legacy payment step
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">
            Captured from the old production flow. This is the exact step Pendo
            measured at{" "}
            <span className="font-semibold text-ink">75% abandonment</span>.
          </p>
        </div>
        <ul className="grid gap-x-8 gap-y-3.5 sm:col-span-8 sm:grid-cols-2">
          {friction.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/70"
            >
              <span className="mt-0.5 flex-none font-mono text-[#dc2626]">✕</span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
