"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------
   Veevart Donation, interactive recreation of the redesigned checkout.

   NOT the production app. A faithful, clickable rebuild of the shipped
   flow in the site's own stack, so the experience can be felt, not just
   looked at. The Desktop / Mobile switch renders each device's real
   design (they differ), inside a browser window or a phone. Accent is
   the product's actual burnt orange, kept on purpose: this showcases the
   real work, not the portfolio's blue chrome.
------------------------------------------------------------------- */

type Step = "amount" | "payment" | "success";
type Device = "desktop" | "mobile";
type Freq = "One Time" | "Quarterly" | "Monthly" | "Annually";

const FREQS: Freq[] = ["One Time", "Quarterly", "Monthly", "Annually"];
// One set of preset amounts, shared by desktop and mobile (single source of
// truth, so the two never drift apart).
const AMOUNTS = [100, 250, 500, 1000];

const inputCls =
  "w-full rounded-[10px] border border-[#e6e6e6] bg-white px-3.5 py-2.5 text-[14px] text-[#1a1a1a] outline-none placeholder:text-[#a2a2a2] focus:border-[#c0451b]";

export function DonationPrototype() {
  const [device, setDevice] = useState<Device>("desktop");
  const [step, setStep] = useState<Step>("amount");

  // Step 1, amount & fund
  const [fund, setFund] = useState("General Fund");
  const [freq, setFreq] = useState<Freq>("Monthly");
  const [amount, setAmount] = useState(250);
  const [custom, setCustom] = useState("");
  const [numPay, setNumPay] = useState(false);
  const [numPayCount, setNumPayCount] = useState("3");
  const [inName, setInName] = useState(false);
  const [honor, setHonor] = useState("In honor of");
  const [honoree, setHonoree] = useState("");
  const [notify, setNotify] = useState(false);
  const [nFirst, setNFirst] = useState("");
  const [nLast, setNLast] = useState("");
  const [notifyBy, setNotifyBy] = useState("Notify by phone");
  const [nPhone, setNPhone] = useState("");
  const [nMsg, setNMsg] = useState("");

  // Step 2, payment
  const [email, setEmail] = useState("");
  const [onBehalf, setOnBehalf] = useState(false);
  const [company, setCompany] = useState("");
  const [coverFees, setCoverFees] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);

  // Mobile summary sheet (opened from the cart icon in the sticky bar)
  const [summaryOpen, setSummaryOpen] = useState(false);

  const mobile = device === "mobile";
  const amt = custom ? Number(custom.replace(/[^0-9.]/g, "")) || 0 : amount;
  const fee = 0.75;
  const subtotal = amt + fee;
  const money = (n: number) => `$${n.toFixed(2)}`;
  const freqNote = numPay ? `${freq} (${numPayCount} payments)` : freq;

  const goPayment = () => {
    setStep("payment");
    setSummaryOpen(false);
  };
  const goSuccess = () => {
    setStep("success");
    setSummaryOpen(false);
  };
  const goAmount = () => {
    setStep("amount");
    setCardOpen(false);
    setSummaryOpen(false);
  };
  const restart = () => {
    setStep("amount");
    setCardOpen(false);
    setSummaryOpen(false);
  };

  /* ---- reusable form fragments ----------------------------------- */

  const freqControl = (
    <div className="flex rounded-full bg-[#f1f1f1] p-1">
      {FREQS.map((f) => (
        <button
          key={f}
          onClick={() => setFreq(f)}
          className={`flex-1 rounded-full px-1 py-2 text-[11.5px] font-medium leading-tight transition-colors ${
            freq === f
              ? "bg-white text-[#1a1a1a] shadow-sm"
              : "text-[#8a8a8a] hover:text-[#5a5a5a]"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );

  const amountGrid = (
    <div className="grid grid-cols-4 gap-2.5">
      {AMOUNTS.map((a) => {
        const on = amt === a && !custom;
        return (
          <button
            key={a}
            onClick={() => {
              setAmount(a);
              setCustom("");
            }}
            className={`rounded-[12px] border py-3 text-[14px] font-semibold transition-colors ${
              on
                ? "border-[#c0451b] text-[#1a1a1a]"
                : "border-[#e6e6e6] text-[#1a1a1a] hover:border-[#cccccc]"
            }`}
          >
            ${a}
          </button>
        );
      })}
    </div>
  );

  const customAmount = (
    <input
      value={custom}
      onChange={(e) => setCustom(e.target.value)}
      placeholder="Custom donation amount"
      className="w-full rounded-[12px] border border-[#e6e6e6] px-3.5 py-3 text-[14px] text-[#1a1a1a] outline-none placeholder:text-[#a2a2a2] focus:border-[#c0451b]"
    />
  );

  const optionsBlock = (
    <div className="space-y-3.5">
      <Check checked={numPay} onChange={setNumPay}>
        Set a specific number of payments
      </Check>
      {numPay && (
        <div className="pl-8">
          <Select value={numPayCount} onChange={setNumPayCount}>
            {["2", "3", "4", "6", "12"].map((n) => (
              <option key={n} value={n}>
                {n} payments
              </option>
            ))}
          </Select>
        </div>
      )}

      <Check checked={inName} onChange={setInName}>
        Donate in someone&apos;s name
      </Check>
      {inName && (
        <div className="grid grid-cols-[128px_1fr] gap-2.5">
          <Select value={honor} onChange={setHonor}>
            <option>In honor of</option>
            <option>In memory of</option>
          </Select>
          <input
            value={honoree}
            onChange={(e) => setHonoree(e.target.value)}
            placeholder="Person/company name"
            className={inputCls}
          />
        </div>
      )}

      <Check checked={notify} onChange={setNotify}>
        Notify someone
      </Check>
      {notify && (
        <div className="space-y-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <p className="mb-1 text-[12.5px] text-[#1a1a1a]">
                First name <span className="text-[#c0451b]">*</span>
              </p>
              <input
                value={nFirst}
                onChange={(e) => setNFirst(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <p className="mb-1 text-[12.5px] text-[#1a1a1a]">Last name</p>
              <input
                value={nLast}
                onChange={(e) => setNLast(e.target.value)}
                className={inputCls}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <Select value={notifyBy} onChange={setNotifyBy}>
              <option>Notify by phone</option>
              <option>Notify by email</option>
            </Select>
            <input
              value={nPhone}
              onChange={(e) => setNPhone(e.target.value)}
              placeholder="315 1992 32"
              className={inputCls}
            />
          </div>
          <textarea
            value={nMsg}
            onChange={(e) => setNMsg(e.target.value)}
            placeholder="Write your message here..."
            className="min-h-[70px] w-full resize-none rounded-[10px] border border-[#e6e6e6] bg-white px-3.5 py-2.5 text-[14px] text-[#1a1a1a] outline-none placeholder:text-[#a2a2a2] focus:border-[#c0451b]"
          />
        </div>
      )}
    </div>
  );

  /* ---- STEP 1: amount -------------------------------------------- */

  const fundBlock = (
    <div className="space-y-5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/work/veevart-donation/hero.jpg"
        alt="Museum gallery"
        className="h-36 w-full rounded-[14px] object-cover"
      />
      <div>
        <p className="mb-1.5 text-[13px] text-[#1a1a1a]">
          Choose Your Fund <span className="text-[#c0451b]">*</span>
        </p>
        <Select value={fund} onChange={setFund}>
          <option>General Fund</option>
          <option>Education Programs</option>
          <option>Conservation</option>
          <option>Exhibitions</option>
        </Select>
      </div>
      <div>
        <div className="flex items-center justify-between text-[13px]">
          <span className="text-[#1a1a1a]">Campaign Progress</span>
          <span className="font-semibold text-[#1a1a1a]">50%</span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[#eeeeee]">
          <div className="h-full rounded-full bg-[#c0451b]" style={{ width: "50%" }} />
        </div>
        <div className="mt-1.5 flex items-center justify-between text-[12.5px] text-[#6f6f6f]">
          <span>$85,000 raised</span>
          <span>$150,000 goal</span>
        </div>
      </div>
      <div>
        <h4 className="text-[15px] font-semibold text-[#1a1a1a]">
          How Your Donation Helps
        </h4>
        <div className="mt-2 space-y-3 text-[13px] leading-relaxed text-[#6f6f6f]">
          <p>
            Your donation helps create access to experiences that inspire
            learning, connection, and opportunity. Through your support, we can
            develop programs, tools, and spaces that allow more people to
            explore, participate, and grow.
          </p>
          <p>
            Together, we&apos;re not just funding a program, we&apos;re opening
            doors for people to discover, learn, and be part of something
            meaningful.
          </p>
        </div>
      </div>
    </div>
  );

  const amountStep = mobile ? (
    <div className="space-y-5">
      <h3 className="text-center text-[20px] font-bold text-[#1a1a1a]">
        Make a Donation
      </h3>
      {freqControl}
      <p className="text-[15px] font-semibold text-[#1a1a1a]">
        How much would you like to donate?
      </p>
      {amountGrid}
      {customAmount}
      {optionsBlock}
    </div>
  ) : (
    <div>
      <h3 className="text-[22px] font-bold text-[#1a1a1a]">Museum Donations</h3>
      <div className="mt-5 grid grid-cols-[1fr_400px] items-start gap-8">
        {fundBlock}
        <Panel>
          {freqControl}
          <div className="mt-4">{amountGrid}</div>
          <div className="mt-2.5">{customAmount}</div>
          <div className="mt-4">{optionsBlock}</div>
          <button
            onClick={goPayment}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#c0451b] py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#a63a16]"
          >
            Continue <Arrow />
          </button>
        </Panel>
      </div>
    </div>
  );

  /* ---- STEP 2: payment ------------------------------------------- */

  const backButton = (
    <button
      onClick={goAmount}
      className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#e6e6e6] px-3.5 py-2 text-[13px] font-medium text-[#1a1a1a] transition-colors hover:border-[#c0451b] hover:text-[#c0451b]"
    >
      <BackArrow /> Back
    </button>
  );

  const cardFields = (
    <div className="mt-3 space-y-3 rounded-[12px] border border-[#eeeeee] bg-[#fbfbfb] p-3.5">
      <div>
        <p className="mb-1 text-[12px] text-[#6f6f6f]">Card number</p>
        <div className="relative">
          <input placeholder="1234 1234 1234 1234" className={inputCls} />
          <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 gap-1">
            <CardMark bg="#1a1f71" label="VISA" />
            <CardMark bg="#eb001b" label="MC" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="mb-1 text-[12px] text-[#6f6f6f]">Expiration</p>
          <input placeholder="MM / YY" className={inputCls} />
        </div>
        <div>
          <p className="mb-1 text-[12px] text-[#6f6f6f]">CVC</p>
          <input placeholder="CVC" className={inputCls} />
        </div>
      </div>
      <div>
        <p className="mb-1 text-[12px] text-[#6f6f6f]">Name on card</p>
        <input placeholder="Full name" className={inputCls} />
      </div>
      <p className="flex items-center gap-1.5 text-[11.5px] text-[#8a8a8a]">
        <Shield /> Encrypted and processed securely.
      </p>
    </div>
  );

  const paymentForm = (
    <div className="space-y-4">
      <div>
        <p className="mb-1.5 text-[13px] text-[#1a1a1a]">
          Your Email <span className="text-[#c0451b]">*</span>
        </p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g myemail@website.com"
          className="w-full rounded-[10px] border border-[#e6e6e6] bg-[#f7f7f7] px-3.5 py-3 text-[14px] text-[#1a1a1a] outline-none placeholder:text-[#a2a2a2] focus:border-[#c0451b] focus:bg-white"
        />
      </div>

      <Check checked={onBehalf} onChange={setOnBehalf}>
        This contribution is on behalf of a company
      </Check>
      {onBehalf && (
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company name"
          className={inputCls}
        />
      )}

      <Check checked={coverFees} onChange={setCoverFees}>
        I want (museum) to receive 100% of my donation. I&apos;ll cover
        processing fees ($0.75)
      </Check>

      <div className="pt-1">
        <h4 className="text-[16px] font-semibold text-[#1a1a1a]">
          Choose how you&apos;d like to pay
        </h4>
        <p className="mt-0.5 text-[13px] text-[#8a8a8a]">
          We&apos;ve made it simple. Pay however works best for you.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 rounded-full border border-[#e6e6e6] py-3 text-[14px] font-medium text-[#1a1a1a] transition-colors hover:border-[#cccccc]">
            <Apple /> Apple pay
          </button>
          <button className="flex items-center justify-center gap-2 rounded-full border border-[#e6e6e6] py-3 text-[14px] font-medium text-[#1a1a1a] transition-colors hover:border-[#cccccc]">
            <GoogleG /> Google pay
          </button>
        </div>
        <div className="my-3 flex items-center gap-3 text-[12px] text-[#a2a2a2]">
          <span className="h-px flex-1 bg-[#eeeeee]" />
          OR
          <span className="h-px flex-1 bg-[#eeeeee]" />
        </div>
        <button
          onClick={() => setCardOpen((v) => !v)}
          className="flex w-full items-center justify-between border-b border-[#d9d9d9] pb-2 text-[14px] text-[#1a1a1a]"
        >
          Credit / Debit Card
          <Chevron
            className={`text-[#8a8a8a] transition-transform ${cardOpen ? "rotate-180" : ""}`}
          />
        </button>
        {cardOpen && cardFields}
      </div>
    </div>
  );

  // Dynamic summary rows, reused by the desktop card and the mobile sheet.
  // Every value derives from the current selection.
  const summaryRows = (
    <>
      <h4 className="text-[19px] font-bold text-[#1a1a1a]">Summary</h4>
      <div className="mt-1 flex items-center justify-between text-[12px] text-[#a2a2a2]">
        <span>Prices are in</span>
        <span>USD</span>
      </div>
      <div className="mt-4 flex items-start justify-between">
        <div>
          <p className="text-[15px] font-semibold text-[#1a1a1a]">Donation</p>
          <p className="mt-1 flex items-center gap-1.5 text-[12px] text-[#8a8a8a]">
            <Cal /> {freqNote}
          </p>
        </div>
        <p className="text-[15px] font-semibold text-[#1a1a1a]">{money(amt)}</p>
      </div>
      <div className="my-3 h-px bg-[#eeeeee]" />
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-[14px] text-[#1a1a1a]">
          <span className="h-4 w-4 rounded-full border border-[#d9d9d9]" />
          Service fee
        </span>
        <span className="text-[14px] text-[#1a1a1a]">{money(fee)}</span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-[16px] font-bold text-[#1a1a1a]">Subtotal</p>
        <p className="text-[15px] font-semibold text-[#1a1a1a]">
          {money(subtotal)}
        </p>
      </div>
      <div className="mt-2 flex items-center justify-between text-[14px] text-[#6f6f6f]">
        <span>Taxes</span>
        <span>{money(0)}</span>
      </div>
      <div className="my-4 h-px bg-[#eeeeee]" />
      <div className="flex items-center justify-between">
        <p className="text-[18px] font-bold text-[#1a1a1a]">Total</p>
        <p className="text-[20px] font-bold text-[#1a1a1a]">{money(subtotal)}</p>
      </div>
    </>
  );

  const summaryCard = (
    <Panel>
      {summaryRows}
      <button
        onClick={goSuccess}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#c0451b] py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#a63a16]"
      >
        Pay <Arrow />
      </button>
    </Panel>
  );

  const paymentStep = mobile ? (
    <div>
      {backButton}
      <h3 className="text-center text-[20px] font-bold text-[#1a1a1a]">
        Make a Donation
      </h3>
      <div className="mt-5">{paymentForm}</div>
    </div>
  ) : (
    <div>
      {backButton}
      <h3 className="text-[22px] font-bold text-[#1a1a1a]">Museum Donations</h3>
      <div className="mt-5 grid grid-cols-[1fr_360px] items-start gap-8">
        {paymentForm}
        {summaryCard}
      </div>
    </div>
  );

  /* ---- STEP 3: success + optional billing ------------------------ */

  const successStep = (
    <div className="mx-auto max-w-[620px] py-2 text-center">
      <HeartHands />
      <h3 className="mt-4 flex items-center justify-center gap-3 text-[24px] font-bold leading-tight text-[#1a1a1a] sm:text-[26px]">
        <Sparkle /> Thank You for Your Generosity! <Sparkle />
      </h3>
      <p className="mt-2 text-[15px] text-[#6f6f6f]">
        Your contribution matters. Let your friends know how they can help too.
      </p>
      <div className="mt-4 flex items-center justify-center gap-3">
        <Social bg="#1877f2">
          <FbIcon />
        </Social>
        <Social bg="#111111">
          <XIcon />
        </Social>
        <Social bg="#0a66c2">
          <LinkedInIcon />
        </Social>
        <Social bg="#25d366">
          <WaIcon />
        </Social>
      </div>
      <p className="mx-auto mt-6 max-w-[540px] text-[14px] leading-relaxed text-[#6f6f6f]">
        Before we send your confirmation receipt, please share a few billing
        details for our records. It only takes a minute.
      </p>
      <div className="mt-4 rounded-[16px] border border-[#ececec] bg-white p-5 text-left">
        <h4 className="text-[16px] font-semibold text-[#1a1a1a]">
          Billing Details
        </h4>
        <div
          className={`mt-3 grid gap-3 ${mobile ? "grid-cols-1" : "grid-cols-2"}`}
        >
          <LabeledInput label="Address" required placeholder="Street address" />
          <LabeledInput label="ZIP Code" required placeholder="ZIP" />
          <LabeledInput label="City" required placeholder="City" />
          <div>
            <p className="mb-1 text-[12.5px] text-[#1a1a1a]">
              Country <span className="text-[#c0451b]">*</span>
            </p>
            <Select value="United States" onChange={() => {}}>
              <option>United States</option>
              <option>Canada</option>
              <option>Mexico</option>
              <option>Colombia</option>
            </Select>
          </div>
        </div>
      </div>
      <p className="mt-2 text-left text-[12px] text-[#a2a2a2]">
        Required for tax or receipt purposes.
      </p>
      <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#eef1fb] px-3 py-1.5 text-[12px] text-[#5b6b9a]">
        <Shield /> Your information is secure and encrypted.
      </div>
      <div className="mt-5">
        <button
          onClick={restart}
          className="inline-flex items-center gap-2 rounded-full bg-[#c0451b] px-8 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#a63a16]"
        >
          Complete Details <HeartOutline />
        </button>
      </div>
      <button
        onClick={restart}
        className="mx-auto mt-4 block text-[12px] text-[#a2a2a2] transition-colors hover:text-[#1a1a1a]"
      >
        ↻ Restart the flow
      </button>
    </div>
  );

  /* ---- mobile sticky total bar ----------------------------------- */

  const mobileCta = (
    <button
      onClick={step === "amount" ? goPayment : goSuccess}
      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#c0451b] py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#a63a16]"
    >
      {step === "amount" ? (
        <>
          Continue <Arrow />
        </>
      ) : (
        <>
          Complete Donation <HeartOutline />
        </>
      )}
    </button>
  );

  const stickyBar =
    mobile && step !== "success" ? (
      <div className="shrink-0 border-t border-[#eeeeee] bg-white px-4 pb-4 pt-4 shadow-[0_-10px_30px_rgba(0,0,0,0.07)]">
        {summaryOpen ? (
          <div>
            {summaryRows}
            <button
              onClick={() => setSummaryOpen(false)}
              className="mt-1 flex w-full items-center justify-center gap-1 py-1 text-[12px] text-[#a2a2a2] transition-colors hover:text-[#1a1a1a]"
            >
              Press to collapse <Chevron className="rotate-180" />
            </button>
            <div className="mt-2 flex items-center gap-3">{mobileCta}</div>
          </div>
        ) : (
          <>
            <button
              onClick={() => setSummaryOpen(true)}
              className="flex w-full items-center justify-between"
            >
              <span className="text-[17px] font-bold text-[#1a1a1a]">Total</span>
              <span className="flex items-center gap-1.5 text-[19px] font-bold text-[#1a1a1a]">
                {money(subtotal)}
                <Chevron className="text-[#a2a2a2]" />
              </span>
            </button>
            <div className="my-3 h-px bg-[#eeeeee]" />
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSummaryOpen(true)}
                aria-label="View summary"
                className="relative flex h-11 w-11 flex-none items-center justify-center rounded-full border border-[#e6e6e6] transition-colors hover:border-[#c0451b]"
              >
                <Bag />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#c0451b] text-[9px] font-bold text-white">
                  1
                </span>
              </button>
              {mobileCta}
            </div>
          </>
        )}
      </div>
    ) : null;

  const stepContent = (
    <>
      {step === "amount" && amountStep}
      {step === "payment" && paymentStep}
      {step === "success" && successStep}
    </>
  );

  // Desktop: natural height inside the browser frame.
  const desktopApp = (
    <div className="relative">
      {topBar}
      <div className="px-6 py-7 sm:px-8">{stepContent}</div>
      <Confetti fire={step === "success"} />
    </div>
  );

  // Mobile: fixed-height flex column so the total bar is pinned to the very
  // bottom of the phone on every step (no dead space when content is short).
  const mobileApp = (
    <div className="relative flex h-[680px] flex-col">
      <div className="flex-1 overflow-y-auto">
        {topBar}
        <div className="px-4 py-5">{stepContent}</div>
      </div>
      {stickyBar}
      <Confetti fire={step === "success"} />
    </div>
  );

  /* ---- control bar + device frames ------------------------------- */

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c0451b]/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c0451b]" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            Live prototype
          </span>
        </div>
        <div className="flex rounded-full border border-line bg-paper p-1">
          {(["desktop", "mobile"] as Device[]).map((d) => (
            <button
              key={d}
              onClick={() => setDevice(d)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                device === d ? "bg-ink text-white" : "text-muted hover:text-ink"
              }`}
            >
              {d === "desktop" ? <DesktopIcon /> : <MobileIcon />}
              {d}
            </button>
          ))}
        </div>
      </div>

      {mobile ? (
        <div className="rounded-[20px] border border-line bg-paper-2 px-4 py-8">
          <div className="mx-auto w-full max-w-[380px]">
            <div className="relative rounded-[2.6rem] border-[10px] border-[#111111] bg-[#111111] shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
              <div className="overflow-hidden rounded-[2rem] bg-white">
                {/* iOS-style status bar */}
                <div className="relative flex items-center justify-between px-7 pb-1 pt-2.5 text-[12px] font-semibold text-[#1a1a1a]">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5 text-[#1a1a1a]">
                    <Signal />
                    <Wifi />
                    <Battery />
                  </div>
                </div>
                {/* notch / dynamic island */}
                <div className="pointer-events-none absolute left-1/2 top-0 z-10 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-[#111111]" />
                {/* app: scroll region + total bar pinned to the bottom */}
                {mobileApp}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[16px] border border-line bg-white shadow-[0_10px_44px_rgba(0,0,0,0.09)]">
          <div className="flex items-center gap-2 border-b border-[#efefef] bg-[#f7f7f7] px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <div className="ml-3 flex-1">
              <div className="mx-auto max-w-sm rounded-md border border-[#eeeeee] bg-white px-3 py-1 text-center text-[11px] text-[#a2a2a2]">
                give.culturemuseum.org/donate
              </div>
            </div>
          </div>
          <div className="bg-white">{desktopApp}</div>
        </div>
      )}
    </div>
  );
}

/* ================================================================ */
/* Confetti (self-contained canvas burst, no library)              */
/* ================================================================ */

function Confetti({ fire }: { fire: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!fire) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = (canvas.width = parent.clientWidth);
    const H = (canvas.height = parent.clientHeight);
    const colors = [
      "#c0451b",
      "#e8443d",
      "#f2b705",
      "#17a673",
      "#0071e3",
      "#e0479e",
    ];
    const parts = Array.from({ length: 150 }, () => ({
      x: W / 2 + (Math.random() - 0.5) * W * 0.35,
      y: H * 0.22 + Math.random() * 24,
      vx: (Math.random() - 0.5) * 9,
      vy: Math.random() * -7 - 2,
      g: 0.16 + Math.random() * 0.12,
      w: 5 + Math.random() * 6,
      h: 8 + Math.random() * 8,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.35,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let raf = 0;
    const start = performance.now();
    const loop = (t: number) => {
      const elapsed = t - start;
      ctx.clearRect(0, 0, W, H);
      const alpha = Math.max(0, 1 - elapsed / 4300);
      for (const p of parts) {
        p.vy += p.g;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (elapsed < 4600) raf = requestAnimationFrame(loop);
      else ctx.clearRect(0, 0, W, H);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [fire]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-30 h-full w-full"
    />
  );
}

/* ================================================================ */
/* Primitives                                                        */
/* ================================================================ */

const topBar = (
  <div className="flex items-center justify-between border-b border-[#efefef] px-5 py-3.5 sm:px-6 sm:py-4">
    <Logo />
    <button className="flex items-center gap-1.5 rounded-lg border border-[#e6e6e6] px-2.5 py-1.5 text-[12.5px] text-[#1a1a1a]">
      <span>🇬🇧</span> English <Chevron className="text-[#8a8a8a]" />
    </button>
  </div>
);

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[20px] border border-[#ececec] bg-white p-5 shadow-[0_2px_20px_rgba(0,0,0,0.04)] sm:p-6">
      {children}
    </div>
  );
}

function Check({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-start gap-3 text-left"
    >
      <span
        className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-[6px] border transition-colors ${
          checked
            ? "border-[#c0451b] bg-[#c0451b] text-white"
            : "border-[#cfcfcf] bg-white"
        }`}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6.2l2.2 2.2 4.8-4.8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span className="text-[14.5px] leading-snug text-[#1a1a1a]">
        {children}
      </span>
    </button>
  );
}

function Select({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-[10px] border border-[#e6e6e6] bg-white px-3.5 py-2.5 pr-9 text-[14px] text-[#1a1a1a] outline-none focus:border-[#c0451b]"
      >
        {children}
      </select>
      <Chevron className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8a8a]" />
    </div>
  );
}

function LabeledInput({
  label,
  required,
  placeholder,
}: {
  label: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <p className="mb-1 text-[12.5px] text-[#1a1a1a]">
        {label} {required && <span className="text-[#c0451b]">*</span>}
      </p>
      <input placeholder={placeholder} className={inputCls} />
    </div>
  );
}

function CardMark({ bg, label }: { bg: string; label: string }) {
  return (
    <span
      className="flex h-4 items-center rounded-[3px] px-1 text-[7px] font-bold text-white"
      style={{ background: bg }}
    >
      {label}
    </span>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
        <path
          d="M4 38V19a16 16 0 0 1 32 0v19"
          stroke="#6b4fa0"
          strokeWidth="2.4"
        />
        <path
          d="M11 38V19a9 9 0 0 1 18 0v19"
          stroke="#8f77bd"
          strokeWidth="2.2"
        />
        <path d="M18 38V20a2 2 0 0 1 4 0v18" stroke="#b7a5d8" strokeWidth="2" />
      </svg>
      <div className="leading-none">
        <p className="text-[13px] font-extrabold tracking-wide text-[#1a1a1a]">
          CULTURE
        </p>
        <p className="mt-0.5 text-[6.5px] font-semibold tracking-[0.16em] text-[#9a9a9a]">
          A DOOR TO KNOWLEDGE
        </p>
      </div>
    </div>
  );
}

function Social({ children, bg }: { children: React.ReactNode; bg: string }) {
  return (
    <span
      className="flex h-9 w-9 items-center justify-center rounded-full text-white"
      style={{ background: bg }}
    >
      {children}
    </span>
  );
}

/* ---- icons ------------------------------------------------------ */

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8h9m0 0l-3.5-3.5M12 8l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BackArrow() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path
        d="M13 8H4m0 0l3.5-3.5M4 8l3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Cal() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <rect
        x="2"
        y="3"
        width="12"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path d="M2 6h12M5 2v2M11 2v2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function Bag() {
  // Standard shopping-bag glyph (folded top + handle "smile"), unmistakable.
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1a1a1a"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function Signal() {
  return (
    <svg width="17" height="11" viewBox="0 0 18 12" fill="currentColor">
      <rect x="0" y="8" width="3" height="4" rx="1" />
      <rect x="5" y="5" width="3" height="7" rx="1" />
      <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
      <rect x="15" y="0" width="3" height="12" rx="1" />
    </svg>
  );
}

function Wifi() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
      <path d="M8 2.4c2.3 0 4.4.9 6 2.4l-1.4 1.5A6.6 6.6 0 0 0 8 4.5 6.6 6.6 0 0 0 3.4 6.3L2 4.8A8.6 8.6 0 0 1 8 2.4z" />
      <path d="M8 6.3c1.3 0 2.5.5 3.4 1.4L8 11.1 4.6 7.7A4.8 4.8 0 0 1 8 6.3z" />
    </svg>
  );
}

function Battery() {
  return (
    <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
      <rect
        x="1"
        y="1"
        width="21"
        height="11"
        rx="3"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
      />
      <rect x="2.5" y="2.5" width="15" height="8" rx="1.5" fill="currentColor" />
      <rect
        x="23.6"
        y="4.5"
        width="1.6"
        height="4"
        rx="0.8"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  );
}

function DesktopIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <rect
        x="1.5"
        y="2.5"
        width="13"
        height="9"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path d="M5.5 14h5M8 11.5V14" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function MobileIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <rect
        x="4"
        y="1.5"
        width="8"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path d="M7 12.5h2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function Apple() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
      <path d="M11 8.6c0-1.6 1.3-2.4 1.4-2.4-.8-1.1-2-1.3-2.4-1.3-1-.1-2 .6-2.5.6-.5 0-1.3-.6-2.1-.6-1.1 0-2.1.6-2.7 1.6-1.1 2-.3 4.9.8 6.5.5.8 1.2 1.7 2 1.6.8 0 1.1-.5 2.1-.5s1.2.5 2.1.5 1.4-.8 1.9-1.5c.6-.9.9-1.7.9-1.8 0 0-1.7-.6-1.5-2.7zM9.6 3.9c.4-.5.7-1.2.6-1.9-.6 0-1.4.4-1.8.9-.4.4-.7 1.1-.6 1.8.7.1 1.4-.3 1.8-.8z" />
    </svg>
  );
}

function GoogleG() {
  return (
    <svg width="14" height="14" viewBox="0 0 18 18">
      <path
        fill="#4285F4"
        d="M17.6 9.2c0-.6-.1-1.2-.2-1.7H9v3.3h4.8a4 4 0 0 1-1.8 2.7v2.2h2.9c1.7-1.6 2.7-3.9 2.7-6.5z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.4 0 4.5-.8 6-2.2l-2.9-2.2c-.8.5-1.8.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8H.8v2.3A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.9 10.7a5.4 5.4 0 0 1 0-3.4V5H.8a9 9 0 0 0 0 8l3.1-2.3z"
      />
      <path
        fill="#EA4335"
        d="M9 3.6c1.3 0 2.5.5 3.4 1.3l2.6-2.6A9 9 0 0 0 .8 5l3.1 2.3C4.6 5.1 6.6 3.6 9 3.6z"
      />
    </svg>
  );
}

function Shield() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1.5l5 2v4c0 3-2.2 5.2-5 6.5-2.8-1.3-5-3.5-5-6.5v-4l5-2z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M5.7 8l1.6 1.6L10.4 6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Sparkle() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="#f2b705">
      <path d="M8 0l1.4 4.8L14 6l-4.6 1.2L8 12l-1.4-4.8L2 6l4.6-1.2z" />
    </svg>
  );
}

function HeartOutline() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 13.5S2 10 2 5.9A2.9 2.9 0 0 1 8 4a2.9 2.9 0 0 1 6 1.9C14 10 8 13.5 8 13.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartHands() {
  return (
    <div className="mx-auto flex h-16 w-16 items-center justify-center">
      <svg width="60" height="56" viewBox="0 0 60 56" fill="none">
        <path
          d="M30 20c-2-4-8-5-11-1-2.6 3.4-1 7.5 2 10.2 2.4 2.1 6.3 4.8 9 6.3 2.7-1.5 6.6-4.2 9-6.3 3-2.7 4.6-6.8 2-10.2-3-4-9-3-11 1z"
          fill="#e8443d"
        />
        <path
          d="M8 34c3 6 9 11 22 15M52 34c-3 6-9 11-22 15"
          stroke="#1a1a1a"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M8 34l-3-3M52 34l3-3"
          stroke="#1a1a1a"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function FbIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M9.2 15v-6h2l.3-2.3H9.2V5.2c0-.7.2-1.1 1.2-1.1h1.2V2c-.2 0-1-.1-1.8-.1-1.8 0-3 1.1-3 3.1v1.7H4.5V9h2.1v6h2.6z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
      <path d="M9.5 6.8L14.4 1h-1.6L8.8 5.7 5.6 1H1.3l5.2 7.5L1.3 15h1.6l4.3-5 3.4 5h4.3L9.5 6.8zm-1.5 1.8l-.5-.7L3.4 2.2h1.7l3.2 4.6.5.7 4.2 6h-1.7L8 8.6z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
      <path d="M5.4 13V6.5H3.3V13h2.1zM4.3 5.6c.7 0 1.2-.5 1.2-1.1 0-.6-.5-1.1-1.2-1.1s-1.2.5-1.2 1.1c0 .6.5 1.1 1.2 1.1zM13 13v-3.7c0-2-1-2.9-2.4-2.9-1.1 0-1.6.6-1.9 1V6.5H6.6c0 .6 0 6.5 0 6.5h2.1V9.4c0-.2 0-.4.1-.5.2-.4.5-.8 1.1-.8.8 0 1.1.6 1.1 1.5V13H13z" />
    </svg>
  );
}

function WaIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1.5A6.4 6.4 0 0 0 2.4 11L1.5 14.5l3.6-.9A6.4 6.4 0 1 0 8 1.5zm3.7 9c-.2.5-1 .9-1.4 1-.4 0-.8.2-2.6-.6-2.2-1-3.6-3.2-3.7-3.4-.1-.2-.9-1.2-.9-2.2s.5-1.6.7-1.8c.2-.2.4-.3.6-.3h.4c.1 0 .3 0 .5.4l.6 1.5c.1.1.1.3 0 .4l-.3.4c-.1.2-.3.3-.1.5.1.3.6 1 1.3 1.6.9.8 1.6 1 1.8 1.1.2.1.4.1.5-.1l.5-.6c.2-.2.3-.2.5-.1l1.4.7c.2.1.4.2.4.3.1.1.1.6-.1 1z" />
    </svg>
  );
}
